import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await res.json();

  return NextResponse.json({ data: data.message });
}
