import sql from '@/lib/db';
import type { Phase, Step } from '@/lib/curriculum';
import CurriculumClient from '@/components/CurriculumClient';
import Link from 'next/link';

export const revalidate = 0;

export default async function CurriculumPage() {
  const phaseRows = await sql`SELECT * FROM phases ORDER BY order_num`;
  const stepRows = await sql`SELECT * FROM steps ORDER BY phase_id, order_num`;
  const progressRows = await sql`SELECT step_id FROM progress`;

  const completedIds = progressRows.map((r) => r.step_id as number);

  const phases: Phase[] = phaseRows.map((p) => ({
    id: p.id as number,
    title: p.title as string,
    orderNum: p.order_num as number,
    steps: stepRows
      .filter((s) => s.phase_id === p.id)
      .map((s) => ({
        id: s.id as number,
        phaseId: s.phase_id as number,
        title: s.title as string,
        goal: s.goal as string,
        keywords: (s.keywords as string).split(', '),
        example: s.example as string | null,
        orderNum: s.order_num as number,
        completed: completedIds.includes(s.id as number),
        completedAt: null,
      } satisfies Step)),
  }));

  const totalSteps = phases.reduce((acc, p) => acc + p.steps.length, 0);
  const totalDone = completedIds.length;
  const totalPct = totalSteps > 0 ? Math.round((totalDone / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">전체 커리큘럼</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {totalDone}/{totalSteps} 완료 · {totalPct}%
          </p>
        </div>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← 대시보드
        </Link>
      </div>

      <CurriculumClient phases={phases} initialCompleted={completedIds} />
    </div>
  );
}
