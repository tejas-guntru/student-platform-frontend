interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
          ADMIN PANEL
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Manage opportunities, candidates, coding verification
          and application progress.
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
      >
        Logout
      </button>
    </header>
  );
}