import {
  CheckCircle2,
  XCircle,
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
    <div className="space-y-2.5">
      {/* MEMBERSHIP */}

      <EligibilityCheck
        passed={
          membershipEligible
        }
        label={
          membershipEligible
            ? "Active membership"
            : "Membership required"
        }
      />

      {/* PROFILE */}

      <EligibilityCheck
        passed={
          profileEligible
        }
        label={
          profileEligible
            ? "Profile 100% complete"
            : `Profile ${profilePercentage}% complete`
        }
      />

      {/* GRADUATION YEAR */}

      <EligibilityCheck
        passed={
          graduationEligible
        }
        label={
          getGraduationEligibilityLabel(
            opportunity,
            studentGraduationYear
          )
        }
      />

      {/* DEADLINE */}

      <EligibilityCheck
        passed={
          deadlineOpen
        }
        label={
          deadlineOpen
            ? "Application deadline open"
            : "Application deadline passed"
        }
      />

      {/* OPPORTUNITY STATUS */}

      <EligibilityCheck
        passed={
          opportunityActive
        }
        label={
          opportunityActive
            ? "Opportunity accepting applications"
            : "Opportunity not accepting applications"
        }
      />

      {/* EXISTING APPLICATION */}

      {application && (
        <EligibilityCheck
          passed
          label={`Already applied • ${formatStatus(
            application.status
          )}`}
        />
      )}
    </div>
  );
}

function EligibilityCheck({
  passed,
  label,
}: {
  passed: boolean;
  label: string;
}) {
  return (
    <div
      className={`
        flex
        items-start
        gap-3
        rounded-xl
        border
        px-3
        py-2.5

        ${
          passed
            ? `
              border-emerald-100
              bg-emerald-50/70
            `
            : `
              border-red-100
              bg-red-50/70
            `
        }
      `}
    >
      {/* ICON */}

      <div
        className={`
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full

          ${
            passed
              ? `
                bg-emerald-100
                text-emerald-600
              `
              : `
                bg-red-100
                text-red-600
              `
          }
        `}
      >
        {passed ? (
          <CheckCircle2
            size={14}
            strokeWidth={2.4}
          />
        ) : (
          <XCircle
            size={14}
            strokeWidth={2.4}
          />
        )}
      </div>

      {/* LABEL */}

      <p
        className={`
          pt-0.5
          text-xs
          font-semibold
          leading-5

          ${
            passed
              ? "text-emerald-700"
              : "text-red-600"
          }
        `}
      >
        {label}
      </p>
    </div>
  );
}