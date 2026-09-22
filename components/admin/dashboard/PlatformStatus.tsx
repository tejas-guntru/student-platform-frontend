import type { ReactNode } from "react";

interface StatusPillProps {
  children: ReactNode;
}

function StatusPill({
  children,
}: StatusPillProps) {
  return (
    <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-3 py-1 font-medium text-emerald-400">
      ✓ {children}
    </span>
  );
}

export default function PlatformStatus() {
  return (
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Platform Status
          </p>

          <p className="mt-1 font-semibold">
            Admin tools are connected to the backend.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <StatusPill>
            Opportunities
          </StatusPill>

          <StatusPill>
            Applications
          </StatusPill>

          <StatusPill>
            Coding Verification
          </StatusPill>
        </div>
      </div>
    </section>
  );
}