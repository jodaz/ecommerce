import { NextResponse } from 'next/server';
import { getBusinessBySlug } from '@/lib/api/business';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const business = await getBusinessBySlug(slug);

  if (!business) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(business);
}
