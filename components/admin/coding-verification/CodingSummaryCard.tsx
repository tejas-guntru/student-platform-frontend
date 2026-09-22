interface CodingSummaryCardProps {
  label: string;
  value: number;
}

export default function CodingSummaryCard({
  label,
  value,
}: CodingSummaryCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}