import Link from "next/link";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Sparkles,
} from "lucide-react";

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

  const isComplete =
    completion.missingItems.length === 0;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_14px_42px_rgba(8,119,232,0.055)]

        sm:p-7
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#38BDF8]/10
          blur-[90px]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          flex
          flex-col
          gap-6

          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div>
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
            <Sparkles
              size={13}
              className="text-[#0877E8]"
            />

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#0877E8]
              "
            >
              Profile Completion
            </p>
          </div>

          <h2
            className="
              mt-4
              text-2xl
              font-bold
              tracking-[-0.04em]
              text-[#173B63]

              sm:text-[28px]
            "
          >
            Build a complete candidate profile
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
            Complete the important sections below so
            your profile is ready when you apply for
            opportunities.
          </p>
        </div>

        {/* PERCENTAGE */}

        <div
          className="
            shrink-0
            rounded-[20px]
            border
            border-[#DCEAF5]
            bg-[#F8FCFF]
            px-5
            py-4

            sm:text-right
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
            {completion.percentage}%
          </p>

          <p
            className="
              mt-1
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#8BA0B1]
            "
          >
            Complete
          </p>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="relative mt-7">
        <div
          className="
            h-3
            overflow-hidden
            rounded-full
            bg-[#EAF2F8]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[#0877E8]
              via-[#1294F2]
              to-[#38BDF8]
              transition-all
              duration-500
            "
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  completion.percentage
                )
              )}%`,
            }}
          />
        </div>

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            text-[9px]
            font-semibold
            text-[#91A5B5]
          "
        >
          <span>0%</span>

          <span>Profile readiness</span>

          <span>100%</span>
        </div>
      </div>

      {/* =====================================================
          CHECKLIST
      ===================================================== */}

      <div
        className="
          relative
          mt-7
          grid
          gap-3

          sm:grid-cols-2
        "
      >
        <CompletionItem
          label="Full name"
          complete={
            completion.fullNameComplete
          }
          href="#basic-profile"
        />

        <CompletionItem
          label="Contact details"
          complete={
            completion.contactComplete
          }
          href="#basic-profile"
        />

        <CompletionItem
          label="Academic details"
          complete={
            completion.academicsComplete
          }
          href="#basic-profile"
        />

        <CompletionItem
          label="College"
          complete={
            completion.collegeComplete
          }
          href="#basic-profile"
        />

        <CompletionItem
          label="Career details"
          complete={
            completion.careerComplete
          }
          href="#basic-profile"
        />

        <CompletionItem
          label="Skills"
          complete={
            completion.skillsComplete
          }
          href="/profile/skills"
        />

        <CompletionItem
          label="Projects"
          complete={
            completion.projectsComplete
          }
          href="/profile/projects"
        />

        <CompletionItem
          label="Coding profile"
          complete={
            completion.codingProfilesComplete
          }
          href="/coding-profiles"
        />
      </div>

      {/* =====================================================
          MISSING / COMPLETE STATE
      ===================================================== */}

      {!isComplete ? (
        <div
          className="
            relative
            mt-7
            rounded-[20px]
            border
            border-amber-200
            bg-amber-50/70
            p-5
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                text-amber-700
              "
            >
              <CircleAlert size={16} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  font-bold
                  text-amber-800
                "
              >
                {completion.missingItems.length}{" "}
                {completion.missingItems.length === 1
                  ? "thing left to complete"
                  : "things left to complete"}
              </p>

              <div
                className="
                  mt-3
                  space-y-2
                "
              >
                {completion.missingItems.map(
                  (item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="
                        flex
                        items-start
                        gap-2
                        text-sm
                        leading-6
                        text-[#6F6A55]
                      "
                    >
                      <span
                        className="
                          mt-[10px]
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-amber-500
                        "
                      />

                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="
            relative
            mt-7
            rounded-[20px]
            border
            border-emerald-200
            bg-emerald-50/70
            p-5
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p
                className="
                  font-bold
                  text-emerald-700
                "
              >
                Your student profile is complete
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-emerald-700/75
                "
              >
                Your profile contains all required
                candidate information and is ready for
                opportunities.
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
      className={`
        group
        flex
        items-center
        justify-between
        gap-3
        rounded-[16px]
        border
        px-4
        py-3.5
        transition-all
        duration-200

        ${
          complete
            ? `
              border-emerald-200
              bg-emerald-50/60

              hover:border-emerald-300
              hover:bg-emerald-50
            `
            : `
              border-[#DCEAF5]
              bg-[#F8FCFF]

              hover:border-[#B9DDF3]
              hover:bg-white
              hover:shadow-[0_8px_20px_rgba(8,119,232,0.05)]
            `
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-colors

            ${
              complete
                ? `
                  bg-emerald-100
                  text-emerald-600
                `
                : `
                  bg-[#EAF6FF]
                  text-[#0877E8]
                `
            }
          `}
        >
          {complete ? (
            <Check
              size={14}
              strokeWidth={3}
            />
          ) : (
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#38BDF8]
              "
            />
          )}
        </span>

        <span
          className={`
            text-sm
            font-semibold

            ${
              complete
                ? "text-emerald-700"
                : "text-[#456982]"
            }
          `}
        >
          {label}
        </span>
      </div>

      {!complete && (
        <span
          className="
            inline-flex
            items-center
            gap-1
            text-[10px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-[#0877E8]
          "
        >
          Complete

          <ArrowRight
            size={12}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </span>
      )}
    </Link>
  );
}