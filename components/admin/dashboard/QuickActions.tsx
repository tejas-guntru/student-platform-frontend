import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FileSearch,
  Plus,
  ShieldCheck,
} from "lucide-react";

interface QuickActionProps {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  actionLabel: string;
}

function QuickAction({
  href,
  title,
  description,
  icon: Icon,
  actionLabel,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="
        group
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_8px_28px_rgba(8,119,232,0.04)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B7DCF4]
        hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]
      "
    >
      {/* hover glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-12
          -top-12
          h-32
          w-32
          rounded-full
          bg-[#38BDF8]/0
          blur-2xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/10
        "
      />

      <div className="relative">
        {/* top */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
              transition-all
              duration-300

              group-hover:bg-[#0877E8]
              group-hover:text-white
            "
          >
            <Icon size={20} />
          </div>

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-xl
              border
              border-[#DCEAF5]
              bg-[#F8FCFF]
              text-[#8EBFDB]
              transition-all
              duration-300

              group-hover:border-[#B7DCF4]
              group-hover:text-[#0877E8]
            "
          >
            <ArrowRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* content */}

        <h3
          className="
            mt-5
            text-lg
            font-bold
            tracking-[-0.025em]
            text-[#173B63]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            min-h-[48px]
            text-sm
            leading-6
            text-[#71879A]
          "
        >
          {description}
        </p>

        {/* action */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            border-t
            border-[#E8F1F7]
            pt-4
          "
        >
          <span
            className="
              text-sm
              font-semibold
              text-[#0877E8]
            "
          >
            {actionLabel}
          </span>

          <ArrowRight
            size={15}
            className="
              text-[#8FC8EA]
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:text-[#0877E8]
            "
          />
        </div>
      </div>
    </Link>
  );
}

export default function QuickActions() {
  return (
    <section>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-2

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
            "
          >
            <ShieldCheck
              size={14}
              className="text-[#0877E8]"
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#0877E8]
              "
            >
              Quick Actions
            </p>
          </div>

          <h2
            className="
              mt-1.5
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-[#173B63]
            "
          >
            Administration
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#738A9D]
            "
          >
            Jump directly into the most common admin workflows.
          </p>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div
        className="
          mt-5
          grid
          gap-4

          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <QuickAction
          href="/admin/opportunities"
          title="Create Opportunity"
          description="Add a new internship or job listing to the Trailbliz platform."
          icon={BriefcaseBusiness}
          actionLabel="Create listing"
        />

        <QuickAction
          href="/admin/applications"
          title="Review Applications"
          description="Process student applications, resumes and candidate decisions."
          icon={FileSearch}
          actionLabel="Review candidates"
        />

        <QuickAction
          href="/admin/coding-verification"
          title="Verify Coding Profiles"
          description="Approve coding accounts and rebuild student ranking data."
          icon={Code2}
          actionLabel="Verify profiles"
        />
      </div>

      {/* =====================================================
          SMALL ADMIN NOTE
      ===================================================== */}

      <div
        className="
          mt-4
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-[#DCEAF5]
          bg-[#F8FCFF]
          px-4
          py-3.5
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <Plus size={15} />
        </div>

        <div>
          <p
            className="
              text-xs
              font-semibold
              text-[#4B6C86]
            "
          >
            Admin shortcut
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[#8297AA]
            "
          >
            These actions take you directly to the relevant
            management area without changing any admin workflow.
          </p>
        </div>
      </div>
    </section>
  );
}