import BgGradient from '@/components/common/bg-gradient';
import DashboardClient from '@/components/dashboard/dashboard-client';
import { extractSummary } from '@/actions/summary-action';

export default async function DashboardPage() {
  const summaries = await extractSummary(); // now runs on server

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <DashboardClient summaries={summaries} />
    </main>
  );
}