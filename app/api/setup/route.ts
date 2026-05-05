import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { CURRICULUM_DATA } from '@/lib/curriculum';

export async function POST() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS phases (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        order_num INTEGER NOT NULL UNIQUE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS steps (
        id SERIAL PRIMARY KEY,
        phase_id INTEGER REFERENCES phases(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        goal TEXT NOT NULL,
        keywords TEXT NOT NULL,
        example TEXT,
        order_num INTEGER NOT NULL,
        UNIQUE(phase_id, order_num)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        step_id INTEGER REFERENCES steps(id) ON DELETE CASCADE UNIQUE,
        completed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    const existingPhases = await sql`SELECT COUNT(*) as count FROM phases`;
    if (Number(existingPhases[0].count) > 0) {
      return NextResponse.json({ message: 'Already seeded' });
    }

    for (let i = 0; i < CURRICULUM_DATA.length; i++) {
      const phaseData = CURRICULUM_DATA[i];
      const [phase] = await sql`
        INSERT INTO phases (title, order_num)
        VALUES (${phaseData.title}, ${i})
        RETURNING id
      `;

      for (let j = 0; j < phaseData.steps.length; j++) {
        const step = phaseData.steps[j];
        await sql`
          INSERT INTO steps (phase_id, title, goal, keywords, example, order_num)
          VALUES (
            ${phase.id},
            ${step.title},
            ${step.goal},
            ${step.keywords.join(', ')},
            ${step.example ?? null},
            ${j}
          )
        `;
      }
    }

    return NextResponse.json({ message: 'Setup complete' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}
