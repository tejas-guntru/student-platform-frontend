interface PipelineCardProps {
  label: string;
  value: number;
}

export default function PipelineCard({
  label,
  value,
}: PipelineCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}