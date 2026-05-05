import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  const rows = await sql`SELECT step_id FROM progress`;
  const completedIds = rows.map((r) => r.step_id as number);
  return NextResponse.json({ completedIds });
}

export async function POST(req: NextRequest) {
  const { stepId } = await req.json();
  if (!stepId) return NextResponse.json({ error: 'stepId required' }, { status: 400 });

  const existing = await sql`SELECT id FROM progress WHERE step_id = ${stepId}`;

  if (existing.length > 0) {
    await sql`DELETE FROM progress WHERE step_id = ${stepId}`;
    return NextResponse.json({ completed: false });
  } else {
    await sql`INSERT INTO progress (step_id) VALUES (${stepId})`;
    return NextResponse.json({ completed: true });
  }
}
