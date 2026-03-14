import { cache } from 'react';
import { createClient } from './supabase/server';

// These utilities are now in currency-shared.ts to be used in Client Components
export { formatUsd, formatVes } from './currency-shared';

export const getExchangeRates = cache(async () => {
  const supabase = await createClient();

  // Try fetching from the global_exchange_rates table first
  const { data, error } = await supabase
    .from('global_exchange_rates')
    .select('currency, rate')
    .in('currency', ['USD', 'EUR']);

  if (!error && data && data.length > 0) {
    const rates: Record<string, number> = {};
    data.forEach((row) => {
      rates[row.currency] = row.rate;
    });

    if (rates['USD']) {
      return rates;
    }
  }

  // Fallback to directly calling Akomo API Server-Side if database is empty 
  // (Not ideal to do repeatedly, but works as a robust fallback)
  try {
    const res = await fetch('https://api.akomo.xyz/api/exchange-rates', { cache: 'no-store' });
    if (res.ok) {
      const bcvData = await res.json();
      const usdRateStr = bcvData?.rates?.find((r: any) => r.label === 'USD')?.value;
      const eurRateStr = bcvData?.rates?.find((r: any) => r.label === 'EUR')?.value;
      
      return {
        USD: usdRateStr ? parseFloat(usdRateStr.replace(',', '.')) : 1,
        EUR: eurRateStr ? parseFloat(eurRateStr.replace(',', '.')) : 1
      };
    }
  } catch (apiError) {
    // Failed fallback Akomo API fetch
  }

  // Absolute fallback to 1:1 if all else fails locally
  return { USD: 1, EUR: 1 };
});
