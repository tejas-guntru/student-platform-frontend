import StatCard from "./StatCard";

interface DashboardStatsProps {
  totalOpportunities: number;
  activeOpportunities: number;
  totalApplications: number;
  shortlisted: number;
  selected: number;
  rejected: number;
}

export default function DashboardStats({
  totalOpportunities,
  activeOpportunities,
  totalApplications,
  shortlisted,
  selected,
  rejected,
}: DashboardStatsProps) {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard
        label="Opportunities"
        value={totalOpportunities}
      />

      <StatCard
        label="Active"
        value={activeOpportunities}
      />

      <StatCard
        label="Applications"
        value={totalApplications}
      />

      <StatCard
        label="Shortlisted"
        value={shortlisted}
      />

      <StatCard
        label="Selected"
        value={selected}
      />

      <StatCard
        label="Rejected"
        value={rejected}
      />
    </section>
  );
}