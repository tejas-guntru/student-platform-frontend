import Link from "next/link";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

interface ProfileCompletionSectionProps {
  completion: ProfileCompletion | null;
}

export default function ProfileCompletionSection({
  completion,
}: ProfileCompletionSectionProps) {
  if (!completion) {
    return null;
  }

  return (
    <section className="mt-8 rounded-[24px] border border-[#D8D5CC] bg-white p-6 shadow-[0_16px_45px_rgba(20,33,61,0.06)] sm:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              Profile Completion
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#14213D]">
            Build a complete candidate profile
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
            Complete the sections below before applying to
            opportunities.
          </p>
        </div>

        {/* PERCENTAGE */}
        <div className="shrink-0 text-left sm:text-right">
          <p className="text-4xl font-bold tracking-[-0.04em] text-[#14213D]">
            {completion.percentage}%
          </p>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#858994]">
            Complete
          </p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="mt-7 h-3 overflow-hidden rounded-full bg-[#EEECE6]">
        <div
          className="h-full rounded-full bg-[#C9A227] transition-all duration-500"
          style={{
            width: `${completion.percentage}%`,
          }}
        />
      </div>

      {/* CHECKLIST */}
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <CompletionItem
          label="Full name"
          complete={completion.fullNameComplete}
          href="#basic-profile"
        />

        <CompletionItem
          label="Contact details"
          complete={completion.contactComplete}
          href="#basic-profile"
        />

        <CompletionItem
          label="Academic details"
          complete={completion.academicsComplete}
          href="#basic-profile"
        />

        <CompletionItem
          label="College"
          complete={completion.collegeComplete}
          href="#basic-profile"
        />

        <CompletionItem
          label="Career details"
          complete={completion.careerComplete}
          href="#basic-profile"
        />

        <CompletionItem
          label="Skills"
          complete={completion.skillsComplete}
          href="/profile/skills"
        />

        <CompletionItem
          label="Projects"
          complete={completion.projectsComplete}
          href="/profile/projects"
        />

        <CompletionItem
          label="Coding profile"
          complete={completion.codingProfilesComplete}
          href="/coding-profiles"
        />
      </div>

      {/* MISSING / COMPLETE STATE */}
      {completion.missingItems.length > 0 ? (
        <div className="mt-7 rounded-xl border border-[#E8DCA9] bg-[#FBF7E8] p-5">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#C9A227]" />

            <div>
              <p className="font-semibold text-[#806E30]">
                {completion.missingItems.length}
                {completion.missingItems.length === 1
                  ? " thing left to complete"
                  : " things left to complete"}
              </p>

              <div className="mt-3 space-y-2">
                {completion.missingItems.map(
                  (item, index) => (
                    <p
                      key={`${item}-${index}`}
                      className="text-sm leading-6 text-[#6B707B]"
                    >
                      • {item}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 rounded-xl border border-[#BFD7C3] bg-[#F1F8F2] p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#DDEEDF] text-sm font-bold text-[#347A3A]">
              ✓
            </span>

            <div>
              <p className="font-semibold text-[#347A3A]">
                Your student profile is complete
              </p>

              <p className="mt-2 text-sm leading-6 text-[#6B707B]">
                Your profile contains all required candidate
                information.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CompletionItem({
  label,
  complete,
  href,
}: {
  label: string;
  complete: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={
        complete
          ? "group flex items-center justify-between rounded-xl border border-[#BFD7C3] bg-[#F1F8F2] px-4 py-3.5 transition-all hover:border-[#9FC6A6] hover:bg-[#EAF5EC]"
          : "group flex items-center justify-between rounded-xl border border-[#D8D5CC] bg-[#F8F7F3] px-4 py-3.5 transition-all hover:border-[#C9A227] hover:bg-white"
      }
    >
      <div className="flex items-center gap-3">
        <span
          className={
            complete
              ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#DDEEDF] text-sm font-bold text-[#347A3A]"
              : "flex h-8 w-8 items-center justify-center rounded-full bg-[#EEECE6] text-sm font-bold text-[#858994] transition-colors group-hover:bg-[#F8F0CF] group-hover:text-[#A98616]"
          }
        >
          {complete ? "✓" : "!"}
        </span>

        <span
          className={
            complete
              ? "text-sm font-semibold text-[#347A3A]"
              : "text-sm font-semibold text-[#14213D]"
          }
        >
          {label}
        </span>
      </div>

      {!complete && (
        <span className="text-xs font-bold text-[#858994] transition-colors group-hover:text-[#C9A227]">
          Complete →
        </span>
      )}
    </Link>
  );
}