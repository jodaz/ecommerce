import { NextResponse } from 'next/server';
import { updateBusinessSettings } from '@/lib/api/business';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    console.log('API: Updating business settings with data:', data);
    const { businessId, ...updateData } = data;

    if (!businessId) {
      console.error('API Error: Missing businessId in request body');
      return NextResponse.json({ error: 'Missing businessId' }, { status: 400 });
    }

    const result = await updateBusinessSettings(businessId, updateData);

    if (!result.success) {
      return NextResponse.json({ error: result.error?.message || 'Unknown error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating business settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
