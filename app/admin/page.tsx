'use client';

import { useState } from 'react';
import Link from 'next/link';

type ProgressRow = { step_id: number; completed_at: string };
type StepRow = { id: number; phase_id: number; title: string; order_num: number };
type PhaseRow = { id: number; title: string; order_num: number };

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<{
    phases: PhaseRow[];
    steps: StepRow[];
    progress: ProgressRow[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError('비밀번호가 틀렸습니다');
        return;
      }
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <span className="text-5xl mb-6">🔐</span>
        <h1 className="text-xl font-bold mb-6">관리자 로그인</h1>
        <form onSubmit={login} className="w-full max-w-xs space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    );
  }

  const completedIds = new Set(data.progress.map((p) => p.step_id));
  const totalDone = completedIds.size;
  const totalSteps = data.steps.length;
  const totalPct = totalSteps > 0 ? Math.round((totalDone / totalSteps) * 100) : 0;

  const PHASE_TEXT = [
    'text-zinc-400', 'text-blue-400', 'text-orange-400', 'text-green-400',
    'text-purple-400', 'text-red-400', 'text-amber-400',
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">관리자 뷰</h1>
          <p className="text-sm text-zinc-500 mt-1">
            최진빈 · {totalDone}/{totalSteps} 완료 · {totalPct}%
          </p>
        </div>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">← 대시보드</Link>
      </div>

      <div className="rounded-2xl border border-white/10 p-5">
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-400 transition-all"
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <p className="text-sm text-zinc-500 mt-2">{totalPct}% 달성</p>
      </div>

      <div className="space-y-6">
        {data.phases.map((phase, idx) => {
          const phaseSteps = data.steps.filter((s) => s.phase_id === phase.id);
          const done = phaseSteps.filter((s) => completedIds.has(s.id)).length;
          const textColor = PHASE_TEXT[idx] ?? PHASE_TEXT[0];

          return (
            <div key={phase.id} className="rounded-xl border border-white/10 overflow-hidden">
              <div className="px-5 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <span className={`font-medium text-sm ${textColor}`}>{phase.title}</span>
                <span className="text-xs text-zinc-500">{done}/{phaseSteps.length}</span>
              </div>
              <div className="divide-y divide-white/5">
                {phaseSteps.map((step) => {
                  const isDone = completedIds.has(step.id);
                  const completedAt = data.progress.find((p) => p.step_id === step.id)?.completed_at;
                  return (
                    <div key={step.id} className="px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-400' : 'bg-white/20'}`} />
                        <span className={`text-sm ${isDone ? 'text-zinc-400' : 'text-white'}`}>{step.title}</span>
                      </div>
                      {isDone && completedAt && (
                        <span className="text-xs text-zinc-600">
                          {new Date(completedAt).toLocaleDateString('ko-KR')}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
