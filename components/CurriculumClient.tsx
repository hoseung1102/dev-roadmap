'use client';

import { useState, useTransition } from 'react';
import type { PhaseData as Phase } from '@/lib/curriculum';

const PHASE_COLORS = [
  'border-zinc-500 bg-zinc-500',
  'border-blue-500 bg-blue-500',
  'border-orange-500 bg-orange-500',
  'border-green-500 bg-green-500',
  'border-purple-500 bg-purple-500',
  'border-red-500 bg-red-500',
  'border-amber-500 bg-amber-500',
];

const PHASE_TEXT_COLORS = [
  'text-zinc-400',
  'text-blue-400',
  'text-orange-400',
  'text-green-400',
  'text-purple-400',
  'text-red-400',
  'text-amber-400',
];

const PHASE_BG_LIGHT = [
  'bg-zinc-500/10',
  'bg-blue-500/10',
  'bg-orange-500/10',
  'bg-green-500/10',
  'bg-purple-500/10',
  'bg-red-500/10',
  'bg-amber-500/10',
];

type Props = {
  phases: Phase[];
  initialCompleted: number[];
};

export default function CurriculumClient({ phases, initialCompleted }: Props) {
  const [completed, setCompleted] = useState<Set<number>>(new Set(initialCompleted));
  const [, startTransition] = useTransition();

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

  return (
    <div className="space-y-8">
      {phases.map((phase, phaseIdx) => {
        const doneCount = phase.steps.filter((s) => completed.has(s.id)).length;
        const total = phase.steps.length;
        const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
        const colorBorder = PHASE_COLORS[phaseIdx] ?? PHASE_COLORS[0];
        const colorText = PHASE_TEXT_COLORS[phaseIdx] ?? PHASE_TEXT_COLORS[0];
        const colorBg = PHASE_BG_LIGHT[phaseIdx] ?? PHASE_BG_LIGHT[0];

        return (
          <div key={phase.id} className={`rounded-2xl border border-white/10 overflow-hidden`}>
            <div className={`px-6 py-4 ${colorBg} border-b border-white/10`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${colorText}`}>{phase.title}</h2>
                <span className="text-sm text-zinc-400">
                  {doneCount}/{total} 완료
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colorBorder.split(' ')[1]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {phase.steps.map((step, stepIdx) => {
                const done = completed.has(step.id);
                return (
                  <div
                    key={step.id}
                    className={`px-6 py-5 transition-colors ${done ? 'bg-white/[0.02]' : 'bg-transparent'}`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggle(step.id)}
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          done
                            ? `${colorBorder} text-white`
                            : 'border-white/20 hover:border-white/40'
                        }`}
                        aria-label={done ? '완료 취소' : '완료 체크'}
                      >
                        {done && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono ${colorText}`}>
                            {phaseIdx}-{stepIdx + 1}
                          </span>
                          <h3 className={`font-medium ${done ? 'text-zinc-500 line-through' : 'text-white'}`}>
                            {step.title}
                          </h3>
                        </div>

                        <p className={`mt-1 text-sm ${done ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          {step.goal}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {step.keywords.map((kw) => (
                            <span
                              key={kw}
                              className={`px-2 py-0.5 rounded text-xs font-mono ${
                                done
                                  ? 'bg-white/5 text-zinc-600'
                                  : `${colorBg} ${colorText}`
                              }`}
                            >
                              {kw}
                            </span>
                          ))}
                        </div>

                        {step.example && (
                          <div className={`mt-3 px-3 py-2 rounded-lg text-xs font-mono ${done ? 'bg-white/5 text-zinc-600' : 'bg-black/40 text-zinc-400'} border border-white/5`}>
                            <span className="text-zinc-600 mr-2">예제</span>
                            {step.example}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
