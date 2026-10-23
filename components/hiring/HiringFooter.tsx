
"use client";

interface HiringFooterProps {
  onNavigate: (section: "apply" | "jobs") => void;
}

export default function HiringFooter({
  onNavigate,
}: HiringFooterProps) {
  return (
    <footer className="mt-20 border-t border-gray-200 py-20 text-center">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Ready to Start Your Career Journey?
        </h3>

        <div className="mx-auto mb-8 h-1 w-20 rounded-full bg-[#093697]" />

        <p className="mb-10 text-lg leading-relaxed text-gray-600 md:text-xl">
          Join thousands of professionals who have found their dream jobs
          through our platform. Start by creating your profile and
          browsing available opportunities.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigate("apply")}
            className="rounded-lg bg-[#093697] px-10 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-[#072a7a]"
          >
            Create Your Profile
          </button>

          <button
            type="button"
            onClick={() => onNavigate("jobs")}
            className="rounded-lg border-2 border-gray-300 px-10 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    </footer>
  );
}
