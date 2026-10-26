
"use client";

interface HiringFooterProps {
  onNavigate: (section: "apply" | "jobs") => void;
}

const primaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1256af] px-5 py-2.5 !text-sm !font-semibold text-white transition-colors hover:bg-[#0f4b99]";

const secondaryBtn =
  "inline-flex min-h-11 items-center justify-center rounded-lg !border !border-solid !border-[#e1e6ee] bg-white px-5 py-2.5 !text-sm !font-semibold !text-[#3e4d63] transition-colors hover:bg-[#f7f9fc]";

export default function HiringFooter({
  onNavigate,
}: HiringFooterProps) {
  return (
    <footer className="mt-16 border-t border-[#e4e9f0] py-16 text-center sm:mt-20 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h3 className="text-3xl font-extrabold tracking-tight text-[#122a46] sm:text-4xl lg:leading-[1.1]">
          Ready to Start Your Career Journey?
        </h3>

        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-[2px] w-7 rounded-full bg-[#c4a265]"
        />

        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#5c6b80] sm:text-base">
          Join thousands of professionals who have found their dream jobs
          through our platform. Start by creating your profile and
          browsing available opportunities.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onNavigate("apply")}
            className={primaryBtn}
          >
            Create Your Profile
          </button>

          <button
            type="button"
            onClick={() => onNavigate("jobs")}
            className={secondaryBtn}
          >
            Browse Jobs
          </button>
        </div>
      </div>
    </footer>
  );
}
