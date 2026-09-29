import {
  Check,
  X,
} from "lucide-react";

import type {
  Opportunity,
} from "@/types/opportunity";

import type {
  ApplicationResponse,
} from "@/types/application";

import {
  formatStatus,
  getGraduationEligibilityLabel,
} from "@/utils/opportunityUtils";

interface OpportunityEligibilityProps {
  opportunity:
    Opportunity;

  application:
    ApplicationResponse | null;

  membershipEligible:
    boolean;

  profileEligible:
    boolean;

  graduationEligible:
    boolean;

  deadlineOpen:
    boolean;

  opportunityActive:
    boolean;

  profilePercentage:
    number;

  studentGraduationYear:
    number | null;
}

export default function OpportunityEligibility({
  opportunity,
  application,

  membershipEligible,
  profileEligible,
  graduationEligible,
  deadlineOpen,
  opportunityActive,

  profilePercentage,
  studentGraduationYear,
}: OpportunityEligibilityProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
      "
    >
      <EligibilityCheck
        passed={membershipEligible}
        label={
          membershipEligible
            ? "Active membership"
            : "Membership required"
        }
      />

      <EligibilityCheck
        passed={profileEligible}
        label={
          profileEligible
            ? "Profile 100% complete"
            : `Profile ${profilePercentage}% complete`
        }
      />

      <EligibilityCheck
        passed={graduationEligible}
        label={
          getGraduationEligibilityLabel(
            opportunity,
            studentGraduationYear
          )
        }
      />

      <EligibilityCheck
        passed={deadlineOpen}
        label={
          deadlineOpen
            ? "Application deadline open"
            : "Application deadline passed"
        }
      />

      <EligibilityCheck
        passed={opportunityActive}
        label={
          opportunityActive
            ? "Accepting applications"
            : "Not accepting applications"
        }
      />

      {application && (
        <EligibilityCheck
          passed
          label={`Already applied · ${formatStatus(
            application.status
          )}`}
          last
        />
      )}
    </div>
  );
}

function EligibilityCheck({
  passed,
  label,
  last = false,
}: {
  passed:
    boolean;

  label:
    string;

  last?:
    boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-2.5
        px-3
        py-2.5

        ${
          !last
            ? "border-b border-slate-100"
            : ""
        }
      `}
    >
      <div
        className={`
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full

          ${
            passed
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }
        `}
      >
        {passed ? (
          <Check
            size={12}
            strokeWidth={2.8}
          />
        ) : (
          <X
            size={12}
            strokeWidth={2.8}
          />
        )}
      </div>

      <p
        className={`
          text-xs
          font-semibold
          leading-5

          ${
            passed
              ? "text-slate-600"
              : "text-red-600"
          }
        `}
      >
        {label}
      </p>
    </div>
  );
}