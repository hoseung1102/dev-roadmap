import sql from '@/lib/db';
import DashboardClient from '@/components/DashboardClient';

export const revalidate = 0;

export default async function Dashboard() {
  const phaseRows = await sql`SELECT * FROM phases ORDER BY order_num`;
  const stepRows = await sql`SELECT * FROM steps ORDER BY phase_id, order_num`;
  const progressRows = await sql`SELECT step_id FROM progress`;

  const completedIds = progressRows.map((r) => r.step_id as number);

  const phases = phaseRows.map((p) => ({
    id: p.id as number,
    title: p.title as string,
    steps: stepRows
      .filter((s) => s.phase_id === p.id)
      .map((s) => ({
        id: s.id as number,
        title: s.title as string,
        goal: s.goal as string,
        keywords: (s.keywords as string).split(', '),
        example: s.example as string | null,
      })),
  }));

  const currentPhase = phases.find((p) => p.steps.some((s) => !completedIds.includes(s.id)));

  return (
    <DashboardClient
      phases={phases}
      initialCompleted={completedIds}
      currentPhaseId={currentPhase?.id ?? null}
    />
  );
}
