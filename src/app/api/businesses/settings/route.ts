import { NextResponse } from 'next/server';
import { updateBusinessSettings } from '@/lib/api/business';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { businessId, ...updateData } = data;

    if (!businessId) {
      return NextResponse.json({ error: 'Missing businessId' }, { status: 400 });
    }

    const result = await updateBusinessSettings(businessId, updateData);

    if (!result.success) {
      return NextResponse.json({ error: result.error?.message || 'Unknown error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
