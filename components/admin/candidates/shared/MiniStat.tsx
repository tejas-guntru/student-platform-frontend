interface MiniStatProps {
  label: string;
  value:
    | string
    | number
    | null
    | undefined;
}

export default function MiniStat({
  label,
  value,
}: MiniStatProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
      <p className="text-[10px] text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value ?? "-"}
      </p>
    </div>
  );
}