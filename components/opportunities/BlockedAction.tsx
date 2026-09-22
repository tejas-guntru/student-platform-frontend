import Link from "next/link";

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
  if (
    !membershipEligible
  ) {
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

  if (
    !profileEligible
  ) {
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

  if (
    !graduationEligible
  ) {
    return (
      <Link
        href="/profile"
        className="
          group
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-5
          py-3
          text-sm
          font-bold
          text-red-600
          transition-all
          duration-200

          hover:border-red-300
          hover:bg-red-100
        "
      >
        <CircleAlert
          size={15}
        />

        Check Graduation Year

        <ArrowRight
          size={14}
          className="
            transition-transform
            duration-200
            group-hover:translate-x-0.5
          "
        />
      </Link>
    );
  }

  if (
    !deadlineOpen
  ) {
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

  if (
    !opportunityActive
  ) {
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
  href: string;
  icon:
    React.ReactNode;
  children:
    React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        inline-flex
        w-full
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
        shadow-[0_9px_22px_rgba(8,119,232,0.18)]
        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-[0_13px_28px_rgba(8,119,232,0.24)]
      "
    >
      {icon}

      {children}

      <ArrowRight
        size={14}
        className="
          transition-transform
          duration-200
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
    React.ReactNode;
  children:
    React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled
      className="
        inline-flex
        w-full
        cursor-not-allowed
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-[#DCE7EF]
        bg-[#F3F7FA]
        px-5
        py-3
        text-sm
        font-bold
        text-[#91A5B5]
      "
    >
      {icon}

      {children}
    </button>
  );
}