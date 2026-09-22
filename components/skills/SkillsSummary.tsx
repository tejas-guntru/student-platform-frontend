import {
  Code2,
  Sparkles,
} from "lucide-react";

interface SkillsSummaryProps {
  count: number;
}

export default function SkillsSummary({
  count,
}: SkillsSummaryProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]

        sm:p-6
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#38BDF8]/10
          blur-[70px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <Code2 size={19} />
          </div>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#0877E8]
                "
              >
                Profile Skills
              </p>

              <Sparkles
                size={12}
                className="text-[#38A9EE]"
              />
            </div>

            <h2
              className="
                mt-2
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              Your Technical Skillset
            </h2>

            <p
              className="
                mt-1
                max-w-lg
                text-sm
                leading-6
                text-[#71899D]
              "
            >
              Keep adding relevant technologies as
              your experience and technical strengths
              grow.
            </p>
          </div>
        </div>

        {/* COUNT */}

        <div
          className="
            flex
            min-w-[150px]
            items-center
            gap-4
            rounded-[18px]
            border
            border-[#DCEAF5]
            bg-[#F8FCFF]
            px-5
            py-4

            sm:justify-end
          "
        >
          <p
            className="
              text-4xl
              font-bold
              tracking-[-0.05em]
              text-[#0877E8]
            "
          >
            {count}
          </p>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#8A9FAF]
              "
            >
              Total
            </p>

            <p
              className="
                mt-0.5
                text-xs
                font-semibold
                text-[#58748B]
              "
            >
              {count === 1
                ? "Skill added"
                : "Skills added"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}