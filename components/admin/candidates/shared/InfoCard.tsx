interface InfoCardProps {
  label: string;
  value:
    | string
    | number
    | null
    | undefined;
}

export default function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-2 break-words font-semibold">
        {value ?? "-"}
      </p>
    </div>
  );
}