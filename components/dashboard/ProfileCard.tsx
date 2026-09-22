import Link from "next/link";

import {
  ArrowRight,
  Mail,
  UserRound,
} from "lucide-react";

interface ProfileCardProps {
  email: string;
}

export default function ProfileCard({
  email,
}: ProfileCardProps) {
  return (
    <article
      className="
        group
        relative
        flex
        h-full
        flex-col
        justify-between
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        p-5
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_40px_rgba(8,119,232,0.09)]

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
          to-[#38BDF8]
        "
      />

      {/* GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-36
          w-36
          rounded-full
          bg-[#38BDF8]/0
          blur-3xl
          transition-all
          duration-300

          group-hover:bg-[#38BDF8]/10
        "
      />

      <div className="relative">
        {/* ICON */}

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
          "
        >
          <UserRound size={19} />
        </div>

        {/* CONTENT */}

        <p
          className="
            mt-5
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-[#0877E8]
          "
        >
          Profile
        </p>

        <h3
          className="
            mt-1.5
            text-xl
            font-bold
            tracking-[-0.03em]
            text-[#173B63]
          "
        >
          Your Career Profile
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-[#6F879A]
          "
        >
          Keep your academics, skills, projects,
          experience and career details up to date.
        </p>

        {/* ACCOUNT */}

        <div
          className="
            mt-5
            rounded-[18px]
            border
            border-[#E1ECF5]
            bg-[#F8FCFF]
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Mail
              size={14}
              className="text-[#8CB8D4]"
            />

            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#8DA2B3]
              "
            >
              Account
            </p>
          </div>

          <p
            className="
              mt-2
              truncate
              text-sm
              font-semibold
              text-[#456982]
            "
          >
            {email || "-"}
          </p>
        </div>
      </div>

      {/* ACTION */}

      <div
        className="
          relative
          mt-6
          border-t
          border-[#E7F0F7]
          pt-4
        "
      >
        <Link
          href="/profile"
          className="
            group/link
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#0877E8]
            transition

            hover:text-[#1294F2]
          "
        >
          View Profile

          <ArrowRight
            size={15}
            className="
              transition-transform
              duration-200
              group-hover/link:translate-x-1
            "
          />
        </Link>
      </div>
    </article>
  );
} 