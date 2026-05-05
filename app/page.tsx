import sql from '@/lib/db';
import { PHASES } from '@/lib/curriculum';
import DashboardClient from '@/components/DashboardClient';

export const revalidate = 0;

export default async function Dashboard() {
  const progressRows = await sql`SELECT step_id FROM progress`;
  const completedIds = progressRows.map((r) => r.step_id as number);
  const currentPhase = PHASES.find((p) => p.steps.some((s) => !completedIds.includes(s.id)));

  return (
    <DashboardClient
      phases={PHASES}
      initialCompleted={completedIds}
      currentPhaseId={currentPhase?.id ?? null}
    />
  );
}
