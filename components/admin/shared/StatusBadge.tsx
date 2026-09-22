import type { AdminApplication } from "@/types/admin";

interface StatusBadgeProps {
  status: AdminApplication["status"];
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let style =
    "border-zinc-700 bg-zinc-950 text-zinc-300";

  if (status === "SELECTED") {
    style =
      "border-emerald-900 bg-emerald-950/40 text-emerald-400";
  } else if (status === "REJECTED") {
    style =
      "border-red-900 bg-red-950/40 text-red-400";
  } else if (status === "RESUME_REQUESTED") {
    style =
      "border-amber-900 bg-amber-950/40 text-amber-400";
  } else if (status === "RESUME_SUBMITTED") {
    style =
      "border-blue-900 bg-blue-950/40 text-blue-400";
  } else if (status === "FORWARDED_TO_EMPLOYER") {
    style =
      "border-purple-900 bg-purple-950/40 text-purple-400";
  } else if (status === "SHORTLISTED") {
    style =
      "border-cyan-900 bg-cyan-950/40 text-cyan-400";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${style}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map(
      (word) =>
        word.charAt(0) +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}