import type {
  Opportunity,
} from "@/types/opportunity";

import OpportunitySummaryCard from "./OpportunitySummaryCard";

interface OpportunitySummaryProps {
  opportunities: Opportunity[];
}

export default function OpportunitySummary({
  opportunities,
}: OpportunitySummaryProps) {
  const active =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "ACTIVE"
    ).length;

  const closed =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "CLOSED"
    ).length;

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <OpportunitySummaryCard
        label="Total"
        value={
          opportunities.length
        }
      />

      <OpportunitySummaryCard
        label="Active"
        value={active}
      />

      <OpportunitySummaryCard
        label="Closed"
        value={closed}
      />
    </section>
  );
}