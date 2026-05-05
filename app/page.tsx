import sql from '@/lib/db';
import Link from 'next/link';

const PHASE_COLORS = [
  'bg-zinc-500', 'bg-blue-500', 'bg-orange-500', 'bg-green-500',
  'bg-purple-500', 'bg-red-500', 'bg-amber-500',
];

const PHASE_TEXT = [
  'text-zinc-400', 'text-blue-400', 'text-orange-400', 'text-green-400',
  'text-purple-400', 'text-red-400', 'text-amber-400',
];

export const revalidate = 0;

export default async function Dashboard() {
  let phases: { id: number; title: string; order_num: number }[] = [];
  let steps: { id: number; phase_id: number }[] = [];
  let completedIds: number[] = [];
  let isSetup = false;

  try {
    phases = (await sql`SELECT * FROM phases ORDER BY order_num`) as typeof phases;
    steps = (await sql`SELECT id, phase_id FROM steps`) as typeof steps;
    const progress = await sql`SELECT step_id FROM progress`;
    completedIds = progress.map((r) => r.step_id as number);
    isSetup = true;
  } catch {
    isSetup = false;
  }

  if (!isSetup || phases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <span className="text-6xl mb-6">🦞</span>
        <h1 className="text-2xl font-bold mb-2">DB 초기화가 필요합니다</h1>
        <p className="text-zinc-500 mb-6 text-sm">
          <code className="bg-white/10 px-2 py-1 rounded">/api/setup</code> 에 POST 요청을 보내거나,
          아래 링크를 통해 세팅하세요.
        </p>
        <a
          href="/api/setup"
          className="px-6 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors"
        >
          DB 세팅하기
        </a>
      </div>
    );
  }

  const totalSteps = steps.length;
  const totalDone = completedIds.length;
  const totalPct = totalSteps > 0 ? Math.round((totalDone / totalSteps) * 100) : 0;

  const stepsByPhase = new Map<number, number[]>();
  for (const s of steps) {
    if (!stepsByPhase.has(s.phase_id)) stepsByPhase.set(s.phase_id, []);
    stepsByPhase.get(s.phase_id)!.push(s.id);
  }

  const currentPhase = phases.find((p) => {
    const ids = stepsByPhase.get(p.id) ?? [];
    return ids.some((id) => !completedIds.includes(id));
  });

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">최진빈의 개발 로드맵</h1>
        <p className="mt-1 text-zinc-500">Phase 0부터 OpenClaw까지 🦞</p>
      </div>

      <div className="rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-zinc-500">전체 진행률</p>
            <p className="text-4xl font-bold text-white mt-1">{totalPct}%</p>
          </div>
          <p className="text-zinc-500 text-sm">{totalDone} / {totalSteps} 완료</p>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-700"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        {currentPhase && (
          <p className="text-sm text-zinc-400">
            현재 진행 중:{' '}
            <span className="text-amber-400 font-medium">{currentPhase.title}</span>
          </p>
        )}
        {totalPct === 100 && (
          <p className="text-sm text-amber-400 font-medium">🎉 OpenClaw 완성! 모든 Phase 완료.</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Phase 현황</h2>
          <Link href="/curriculum" className="text-sm text-zinc-400 hover:text-white transition-colors">
            전체 보기 →
          </Link>
        </div>
        <div className="grid gap-3">
          {phases.map((phase, idx) => {
            const ids = stepsByPhase.get(phase.id) ?? [];
            const done = ids.filter((id) => completedIds.includes(id)).length;
            const total = ids.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const isCurrent = currentPhase?.id === phase.id;
            const color = PHASE_COLORS[idx] ?? PHASE_COLORS[0];
            const textColor = PHASE_TEXT[idx] ?? PHASE_TEXT[0];

            return (
              <div
                key={phase.id}
                className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition-colors ${
                  isCurrent ? 'border-white/20 bg-white/5' : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
                <span className={`text-sm font-medium flex-1 ${textColor}`}>{phase.title}</span>
                <span className="text-xs text-zinc-500">{done}/{total}</span>
                <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                {isCurrent && <span className="text-xs text-amber-400 font-medium">진행 중</span>}
                {done === total && total > 0 && <span className="text-xs text-green-400">완료</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
