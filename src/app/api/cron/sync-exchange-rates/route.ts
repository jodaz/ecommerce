import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define the expected structure from the AKomo API
interface AkomoRate {
  id: string;
  label: string;
  value: string;
  currency: string;
}

interface AkomoResponse {
  rates: AkomoRate[];
  lastUpdate: string;
}

export async function GET(request: Request) {
  try {
    // 1. Authorization Check
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CRON_SECRET;

    if (!expectedSecret) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    if (authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch data from AKomo API
    const response = await fetch('https://api.akomo.xyz/api/exchange-rates', {
      headers: {
        'Accept': 'application/json',
      },
      // Ensure we always get fresh data
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from AKomo API: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as AkomoResponse;

    if (!data.rates || !Array.isArray(data.rates)) {
      throw new Error('Invalid response format from AKomo API');
    }

    // 3. Parse and prepare the data
    const ratesToUpsert = data.rates
      .filter((r) => r.currency === 'USD' || r.currency === 'EUR' || r.label.includes('BCV'))
      .map((rate) => {
        // The value comes as a comma-separated string like "36,25"
        const numericValue = parseFloat(rate.value.replace(',', '.'));
        
        return {
          // We map 'VES' to 'USD' or 'EUR' based on the label since the API returns 'VES' as the currency
          // Assuming label "Dólar BCV" for USD and "Euro BCV" for EUR based on standard BCV reporting
          currency: rate.label.toLowerCase().includes('euro') ? 'EUR' : 'USD', 
          rate: numericValue,
          last_synced_at: new Date().toISOString(),
        };
      });

    if (ratesToUpsert.length === 0) {
      return NextResponse.json({ message: 'No BCV rates found to sync' }, { status: 200 });
    }

    // 4. Initialize Supabase Service Role Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase URL or Service Key is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 5. Upsert into global_exchange_rates
    const { error: upsertError } = await supabase
      .from('global_exchange_rates')
      .upsert(ratesToUpsert, { onConflict: 'currency' });

    if (upsertError) {
      throw new Error(`Supabase Upsert Error: ${upsertError.message}`);
    }

    return NextResponse.json(
      { 
        message: 'Exchange rates synced successfully', 
        synced: ratesToUpsert,
        lastUpdate: data.lastUpdate
      }, 
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' }, 
      { status: 500 }
    );
  }
}
