import sql from '@/lib/db';
import { PHASES } from '@/lib/curriculum';
import CurriculumClient from '@/components/CurriculumClient';
import Link from 'next/link';

export const revalidate = 0;

export default async function CurriculumPage() {
  const progressRows = await sql`SELECT step_id FROM progress`;
  const completedIds = progressRows.map((r) => r.step_id as number);

  const totalSteps = PHASES.reduce((acc, p) => acc + p.steps.length, 0);
  const totalPct = totalSteps > 0 ? Math.round((completedIds.length / totalSteps) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">전체 커리큘럼</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {completedIds.length}/{totalSteps} 완료 · {totalPct}%
          </p>
        </div>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
          ← 대시보드
        </Link>
      </div>
      <CurriculumClient phases={PHASES} initialCompleted={completedIds} />
    </div>
  );
}
