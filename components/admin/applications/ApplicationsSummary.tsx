import SummaryCard from "./SummaryCard";

interface ApplicationsSummaryProps {
  total: number;
  applied: number;
  underReview: number;
  shortlisted: number;
  resumeRequested: number;
  resumeSubmitted: number;
  forwarded: number;
  selected: number;
}

export default function ApplicationsSummary({
  total,
  applied,
  underReview,
  shortlisted,
  resumeRequested,
  resumeSubmitted,
  forwarded,
  selected,
}: ApplicationsSummaryProps) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
      <SummaryCard
        label="Total"
        value={total}
      />

      <SummaryCard
        label="Applied"
        value={applied}
      />

      <SummaryCard
        label="Review"
        value={underReview}
      />

      <SummaryCard
        label="Shortlisted"
        value={shortlisted}
      />

      <SummaryCard
        label="Resume Req."
        value={resumeRequested}
      />

      <SummaryCard
        label="Resume In"
        value={resumeSubmitted}
      />

      <SummaryCard
        label="Forwarded"
        value={forwarded}
      />

      <SummaryCard
        label="Selected"
        value={selected}
      />
    </section>
  );
}