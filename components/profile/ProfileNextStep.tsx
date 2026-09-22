import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";

interface ProfileNextStepProps {
  percentage: number | undefined;
}

export default function ProfileNextStep({
  percentage,
}: ProfileNextStepProps) {
  const isComplete = percentage === 100;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-60
          w-60
          rounded-full
          bg-[#38BDF8]/10
          blur-[90px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-6
          p-5

          sm:p-7

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}

        <div className="max-w-2xl">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#CBE5F8]
              bg-[#EFF8FF]
              px-3
              py-1.5
            "
          >
            {isComplete ? (
              <CheckCircle2
                size={13}
                className="text-emerald-600"
              />
            ) : (
              <Sparkles
                size={13}
                className="text-[#0877E8]"
              />
            )}

            <p
              className={`
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]

                ${
                  isComplete
                    ? "text-emerald-700"
                    : "text-[#0877E8]"
                }
              `}
            >
              Ready for Opportunities?
            </p>
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              tracking-[-0.04em]
              text-[#173B63]
            "
          >
            {isComplete
              ? "Your profile is ready."
              : "Continue building your profile"}
          </h2>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            {isComplete
              ? "Your required student profile sections are complete. You can now explore matching opportunities."
              : "Complete the remaining profile sections so your information is ready when you apply."}
          </p>
        </div>

        {/* ACTIONS */}

        <div
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:flex-wrap

            lg:justify-end
          "
        >
          <Link
            href="/opportunities"
            className="
              group
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#0877E8]
              to-[#1294F2]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_10px_24px_rgba(8,119,232,0.22)]
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]
            "
          >
            View Opportunities

            <ArrowRight
              size={15}
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            />
          </Link>

          <Link
            href="/coding-profiles"
            className="
              group
              inline-flex
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D5E7F3]
              bg-[#F8FCFF]
              px-5
              py-3
              text-sm
              font-bold
              text-[#527087]
              transition-all
              duration-200

              hover:border-[#B9DCF2]
              hover:bg-white
              hover:text-[#0877E8]
            "
          >
            <Code2 size={15} />

            Coding Profiles
          </Link>
        </div>
      </div>

      {/* BOTTOM STATUS STRIP */}

      <div
        className={`
          h-[3px]
          w-full
          bg-gradient-to-r

          ${
            isComplete
              ? "from-emerald-500 via-emerald-400 to-cyan-400"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
      />
    </section>
  );
}