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
    <div className="space-y-3">
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
    <div className="flex items-start gap-3">
      <span
        className={
          passed
            ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DDEEDF] text-xs font-bold text-[#347A3A]"
            : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F6DEDE] text-xs font-bold text-[#A43F3F]"
        }
      >
        {passed
          ? "✓"
          : "✕"}
      </span>

      <p
        className={
          passed
            ? "pt-0.5 text-sm text-[#347A3A]"
            : "pt-0.5 text-sm text-[#A43F3F]"
        }
      >
        {label}
      </p>
    </div>
  );
}