import Link from "next/link";

import type {
  ReactNode,
} from "react";

import {
  ArrowRight,
  CalendarX2,
  CircleAlert,
  LockKeyhole,
  UserRound,
} from "lucide-react";

interface BlockedActionProps {
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
}

export default function BlockedAction({
  membershipEligible,
  profileEligible,
  graduationEligible,
  deadlineOpen,
  opportunityActive,
}: BlockedActionProps) {
  if (!membershipEligible) {
    return (
      <ActionLink
        href="/membership"
        icon={
          <LockKeyhole
            size={15}
          />
        }
      >
        Get Membership
      </ActionLink>
    );
  }

  if (!profileEligible) {
    return (
      <ActionLink
        href="/profile"
        icon={
          <UserRound
            size={15}
          />
        }
      >
        Complete Profile
      </ActionLink>
    );
  }

  if (!graduationEligible) {
    return (
      <WarningLink
        href="/profile"
        icon={
          <CircleAlert
            size={15}
          />
        }
      >
        Check Graduation Year
      </WarningLink>
    );
  }

  if (!deadlineOpen) {
    return (
      <DisabledAction
        icon={
          <CalendarX2
            size={15}
          />
        }
      >
        Applications Closed
      </DisabledAction>
    );
  }

  if (!opportunityActive) {
    return (
      <DisabledAction
        icon={
          <LockKeyhole
            size={15}
          />
        }
      >
        Opportunity Closed
      </DisabledAction>
    );
  }

  return null;
}

function ActionLink({
  href,
  icon,
  children,
}: {
  href:
    string;

  icon:
    ReactNode;

  children:
    ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        min-h-[44px]
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-[#1256AF]
        px-4
        text-sm
        font-bold
        text-white
        transition

        hover:bg-[#0E4C9D]
      "
    >
      {icon}

      {children}

      <ArrowRight
        size={14}
        className="
          transition-transform
          group-hover:translate-x-0.5
        "
      />
    </Link>
  );
}

function WarningLink({
  href,
  icon,
  children,
}: {
  href:
    string;

  icon:
    ReactNode;

  children:
    ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        min-h-[44px]
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-amber-200
        bg-amber-50
        px-4
        text-sm
        font-bold
        text-amber-700
        transition

        hover:border-amber-300
        hover:bg-amber-100
      "
    >
      {icon}

      {children}

      <ArrowRight
        size={14}
        className="
          transition-transform
          group-hover:translate-x-0.5
        "
      />
    </Link>
  );
}

function DisabledAction({
  icon,
  children,
}: {
  icon:
    ReactNode;

  children:
    ReactNode;
}) {
  return (
    <div
      aria-disabled="true"
      className="
        flex
        min-h-[44px]
        w-full
        cursor-not-allowed
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-slate-200
        bg-slate-100
        px-4
        text-sm
        font-semibold
        text-slate-400
      "
    >
      {icon}

      {children}
    </div>
  );
}