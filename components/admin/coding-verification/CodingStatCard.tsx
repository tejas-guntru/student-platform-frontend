interface CodingStatCardProps {
  label: string;

  value:
    | string
    | number
    | null
    | undefined;
}

export default function CodingStatCard({
  label,
  value,
}: CodingStatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 font-semibold">
        {value ?? "-"}
      </p>
    </div>
  );
}