import Link from "next/link";

interface QuickActionProps {
  href: string;
  title: string;
  description: string;
}

function QuickAction({
  href,
  title,
  description,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
    >
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <p className="mt-4 text-sm font-medium text-zinc-300 transition group-hover:text-white">
        Open →
      </p>
    </Link>
  );
}

export default function QuickActions() {
  return (
    <section className="mt-8">
      <div>
        <p className="text-sm text-zinc-500">
          Quick Actions
        </p>

        <h2 className="mt-1 text-xl font-semibold">
          Administration
        </h2>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickAction
          href="/admin/opportunities"
          title="Create Opportunity"
          description="Add a new internship or job listing."
        />

        <QuickAction
          href="/admin/applications"
          title="Review Applications"
          description="Process student applications and resumes."
        />

        <QuickAction
          href="/admin/coding-verification"
          title="Verify Coding Profiles"
          description="Approve coding accounts and rebuild rankings."
        />
      </div>
    </section>
  );
}