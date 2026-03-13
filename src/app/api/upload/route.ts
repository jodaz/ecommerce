import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const bucket = formData.get('bucket') as string | null || 'products';
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const directory = formData.get('folder') as string | null || 'product-images';
  const fileExt = file.name.split('.').pop() || 'png';
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${directory}/${fileName}`;

  const supabase = await createClient();
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return NextResponse.json({ url: publicUrl });
}
