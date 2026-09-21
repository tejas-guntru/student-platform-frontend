import Link from "next/link";

interface ProfileNextStepProps {
  percentage: number | undefined;
}

export default function ProfileNextStep({
  percentage,
}: ProfileNextStepProps) {
  const isComplete = percentage === 100;

  return (
    <section className="mt-8 overflow-hidden rounded-[24px] border border-[#D8D5CC] bg-white shadow-[0_16px_45px_rgba(20,33,61,0.06)]">
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C9A227]" />

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C9A227]">
              Ready for Opportunities?
            </p>
          </div>

          <h2 className="mt-3 text-xl font-bold tracking-[-0.03em] text-[#14213D]">
            {isComplete
              ? "Your profile is ready."
              : "Continue building your profile"}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B707B]">
            {isComplete
              ? "Your required student profile sections are complete. You can now explore matching opportunities."
              : "Complete your required profile sections before applying to opportunities."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/opportunities"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#C9A227]
              px-5
              py-3
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              duration-200
              hover:bg-[#E0C766]
              hover:shadow-md
            "
          >
            View Opportunities
          </Link>

          <Link
            href="/coding-profiles"
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-[#D8D5CC]
              bg-[#F8F7F3]
              px-5
              py-3
              text-sm
              font-bold
              text-[#14213D]
              transition-all
              duration-200
              hover:border-[#C9A227]
              hover:bg-white
              hover:text-[#A98616]
            "
          >
            Coding Profiles
          </Link>
        </div>
      </div>

      <div
        className={`h-1.5 w-full ${
          isComplete
            ? "bg-[#4B8A55]"
            : "bg-[#C9A227]"
        }`}
      />
    </section>
  );
}