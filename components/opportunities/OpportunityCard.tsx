"use client";

import type { ReactNode } from "react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
} from "lucide-react";

import type { Opportunity } from "@/types/opportunity";
import type { ApplicationResponse } from "@/types/application";

import {
  formatGraduationYears,
  formatOpportunityDate,
  formatStatus,
} from "@/utils/opportunityUtils";

interface OpportunityCardProps {
  opportunity: Opportunity;
  application: ApplicationResponse | null;
  studentGraduationYear: number | null;
  onSelect: (opportunity: Opportunity) => void;
}

export default function OpportunityCard({
  opportunity,
  application,
  studentGraduationYear,
  onSelect,
}: OpportunityCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(opportunity)}
      className="
        group
        relative
        flex
        min-h-[290px]
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-[0_14px_35px_rgba(15,23,42,0.07)]

        focus:outline-none
        focus:ring-4
        focus:ring-[#1256AF]/10

        sm:p-6
      "
    >
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge>
            <BriefcaseBusiness
              size={11}
              className="text-[#1256AF]"
            />

            {opportunity.opportunityType}
          </Badge>

          <Badge>{opportunity.workMode}</Badge>
        </div>

        {application ? (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              bg-emerald-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-emerald-700
            "
          >
            <CheckCircle2 size={11} />

            Applied
          </span>
        ) : (
          <span
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              bg-blue-50
              px-2.5
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#1256AF]
            "
          >
            {opportunity.status}
          </span>
        )}
      </div>

      {/* COMPANY / ROLE */}

      <div className="mt-6">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#1256AF]/[0.07]
            text-[#1256AF]
          "
        >
          <BriefcaseBusiness size={19} />
        </div>

        <h3
          className="
            mt-4
            line-clamp-2
            text-xl
            font-bold
            tracking-[-0.03em]
            text-slate-950
          "
        >
          {opportunity.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <Building2
            size={14}
            className="shrink-0 text-slate-400"
          />

          <p
            className="
              truncate
              text-sm
              font-semibold
              text-slate-600
            "
          >
            {opportunity.companyName}
          </p>
        </div>
      </div>

      {/* QUICK DETAILS */}

      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-x-4
          gap-y-3
          border-t
          border-slate-100
          pt-5
        "
      >
        {opportunity.location && (
          <QuickDetail
            icon={<MapPin size={13} />}
            label="Location"
            value={opportunity.location}
          />
        )}

        <QuickDetail
          icon={<GraduationCap size={13} />}
          label="Eligible batch"
          value={formatGraduationYears(opportunity)}
        />

        <QuickDetail
          icon={<CalendarDays size={13} />}
          label="Deadline"
          value={formatOpportunityDate(
            opportunity.applicationDeadline
          )}
        />

        {studentGraduationYear && (
          <QuickDetail
            icon={<GraduationCap size={13} />}
            label="Your batch"
            value={String(studentGraduationYear)}
          />
        )}
      </div>

      {/* APPLICATION STATE */}

      {application && (
        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            bg-emerald-50/70
            px-3.5
            py-3
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.11em]
                text-emerald-600
              "
            >
              Application
            </p>

            <p
              className="
                mt-0.5
                truncate
                text-xs
                font-bold
                text-emerald-800
              "
            >
              {formatStatus(application.status)}
            </p>
          </div>

          <CheckCircle2
            size={16}
            className="shrink-0 text-emerald-600"
          />
        </div>
      )}

      {/* BOTTOM */}

      <div
        className="
          mt-auto
          flex
          items-center
          justify-between
          pt-6
        "
      >
        <span
          className="
            text-xs
            font-semibold
            text-slate-400
            transition-colors
            group-hover:text-[#1256AF]
          "
        >
          {application
            ? "View application details"
            : "View opportunity"}
        </span>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-500
            transition-all
            duration-200

            group-hover:border-[#1256AF]
            group-hover:bg-[#1256AF]
            group-hover:text-white
          "
        >
          <ArrowUpRight size={15} />
        </div>
      </div>
    </button>
  );
}

function Badge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-slate-200
        bg-slate-50
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.06em]
        text-slate-600
      "
    >
      {children}
    </span>
  );
}

function QuickDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2">
      <div
        className="
          mt-0.5
          shrink-0
          text-[#1256AF]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-xs
            font-semibold
            text-slate-600
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}