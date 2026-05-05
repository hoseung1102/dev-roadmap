'use client';

import { useState, useTransition } from 'react';

type StepData = {
  id: number;
  title: string;
  goal: string;
  keywords: string[];
  example: string | null;
};

type PhaseData = {
  id: number;
  title: string;
  steps: StepData[];
};

const PHASE_COLORS = [
  { dot: 'bg-zinc-500', bar: 'bg-zinc-500', text: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/30', check: 'border-zinc-500 bg-zinc-500' },
  { dot: 'bg-blue-500', bar: 'bg-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', check: 'border-blue-500 bg-blue-500' },
  { dot: 'bg-orange-500', bar: 'bg-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', check: 'border-orange-500 bg-orange-500' },
  { dot: 'bg-green-500', bar: 'bg-green-500', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', check: 'border-green-500 bg-green-500' },
  { dot: 'bg-purple-500', bar: 'bg-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', check: 'border-purple-500 bg-purple-500' },
  { dot: 'bg-red-500', bar: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', check: 'border-red-500 bg-red-500' },
  { dot: 'bg-amber-500', bar: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', check: 'border-amber-500 bg-amber-500' },
];

type Props = {
  phases: PhaseData[];
  initialCompleted: number[];
  currentPhaseId: number | null;
};

export default function DashboardClient({ phases, initialCompleted, currentPhaseId }: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set(initialCompleted));
  const [openPhaseId, setOpenPhaseId] = useState<number | null>(currentPhaseId);
  const [, startTransition] = useTransition();

  const totalSteps = phases.reduce((acc, p) => acc + p.steps.length, 0);
  const totalDone = completed.size;
  const totalPct = totalSteps > 0 ? Math.round((totalDone / totalSteps) * 100) : 0;

  const toggle = (stepId: number) => {
    startTransition(async () => {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId }),
      });
      const data = await res.json();
      setCompleted((prev) => {
        const next = new Set(prev);
        data.completed ? next.add(stepId) : next.delete(stepId);
        return next;
      });
    });
  };

  const currentPhase = phases.find((p) => p.steps.some((s) => !completed.has(s.id)));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">최진빈의 개발 로드맵</h1>
        <p className="mt-1 text-zinc-500">Phase 0부터 OpenClaw까지 🦞</p>
      </div>

      {/* 전체 진행률 */}
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
            현재 진행 중: <span className="text-amber-400 font-medium">{currentPhase.title}</span>
          </p>
        )}
        {totalPct === 100 && (
          <p className="text-sm text-amber-400 font-medium">🎉 OpenClaw 완성! 모든 Phase 완료.</p>
        )}
      </div>

      {/* Phase 아코디언 */}
      <div className="space-y-3">
        {phases.map((phase, idx) => {
          const c = PHASE_COLORS[idx] ?? PHASE_COLORS[0];
          const done = phase.steps.filter((s) => completed.has(s.id)).length;
          const total = phase.steps.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const isOpen = openPhaseId === phase.id;
          const isCurrent = currentPhase?.id === phase.id;
          const isAllDone = done === total && total > 0;

          return (
            <div
              key={phase.id}
              className={`rounded-2xl border overflow-hidden transition-colors ${
                isOpen ? `${c.border}` : 'border-white/10'
              }`}
            >
              {/* Phase 헤더 — 클릭으로 토글 */}
              <button
                onClick={() => setOpenPhaseId(isOpen ? null : phase.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left ${
                  isOpen ? c.bg : 'bg-white/[0.02] hover:bg-white/5'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.dot}`} />
                <span className={`font-medium flex-1 ${c.text}`}>{phase.title}</span>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500">{done}/{total}</span>
                  <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${c.bar} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                  {isAllDone && <span className="text-xs text-green-400">완료</span>}
                  {isCurrent && !isAllDone && <span className="text-xs text-amber-400">진행 중</span>}
                </div>

                <svg
                  className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Step 목록 — 펼쳐지는 영역 */}
              {isOpen && (
                <div className="divide-y divide-white/5 border-t border-white/10">
                  {phase.steps.map((step, stepIdx) => {
                    const isDone = completed.has(step.id);
                    return (
                      <div key={step.id} className={`px-5 py-4 ${isDone ? 'bg-white/[0.015]' : ''}`}>
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggle(step.id)}
                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isDone ? c.check : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            {isDone && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-mono ${c.text}`}>{idx}-{stepIdx + 1}</span>
                              <h3 className={`font-medium text-sm ${isDone ? 'text-zinc-500 line-through' : 'text-white'}`}>
                                {step.title}
                              </h3>
                            </div>
                            <p className={`mt-1 text-xs leading-relaxed ${isDone ? 'text-zinc-600' : 'text-zinc-400'}`}>
                              {step.goal}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {step.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                    isDone ? 'bg-white/5 text-zinc-600' : `${c.bg} ${c.text}`
                                  }`}
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                            {step.example && (
                              <div className={`mt-2 px-3 py-2 rounded-lg text-xs font-mono border border-white/5 ${
                                isDone ? 'bg-white/5 text-zinc-600' : 'bg-black/40 text-zinc-400'
                              }`}>
                                <span className="text-zinc-600 mr-2">예제</span>{step.example}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
