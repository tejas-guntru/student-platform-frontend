interface LeaderboardContextProps {
  collegeName:
    string | null;

  graduationYear:
    number | null;
}

export default function LeaderboardContext({
  collegeName,
  graduationYear,
}: LeaderboardContextProps) {
  return (
    <section className="mt-5 grid gap-4 sm:grid-cols-2">
      <ContextCard
        label="My College"
        value={
          collegeName ||
          "College not selected"
        }
      />

      <ContextCard
        label="My Graduation Batch"
        value={
          graduationYear
            ? String(
                graduationYear
              )
            : "Not added"
        }
      />
    </section>
  );
}

function ContextCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#D8D5CC] bg-white p-5 shadow-[0_10px_30px_rgba(20,33,61,0.04)]">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#C9A227]">
        {label}
      </p>

      <p className="mt-2 font-bold text-[#14213D]">
        {value}
      </p>
    </div>
  );
}