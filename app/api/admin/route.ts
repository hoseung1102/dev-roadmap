import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const phases = await sql`SELECT * FROM phases ORDER BY order_num`;
  const steps = await sql`SELECT * FROM steps ORDER BY phase_id, order_num`;
  const progress = await sql`SELECT step_id, completed_at FROM progress ORDER BY completed_at DESC`;

  return NextResponse.json({ phases, steps, progress });
}
