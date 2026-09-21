interface SkillsSummaryProps {
  count: number;
}

export default function SkillsSummary({
  count,
}: SkillsSummaryProps) {
  return (
    <section className="mt-8 rounded-[20px] border border-[#D8D5CC] bg-white p-6 shadow-[0_12px_35px_rgba(20,33,61,0.04)]">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
          Profile Skills
        </p>
      </div>

      <p className="mt-4 text-4xl font-bold tracking-[-0.04em] text-[#14213D]">
        {count}
      </p>

      <p className="mt-1 text-sm text-[#6B707B]">
        {count === 1
          ? "skill added"
          : "skills added"}
      </p>
    </section>
  );
}