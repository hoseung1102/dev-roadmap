import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        step_id INTEGER NOT NULL UNIQUE,
        completed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    return NextResponse.json({ message: 'Setup complete' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}
