import Link from "next/link";

import {
  ArrowLeft,
  Code2,
  LoaderCircle,
  RefreshCcw,
} from "lucide-react";

interface CodingVerificationHeaderProps {
  rebuilding: boolean;
  onRebuild: () => void;
}

export default function CodingVerificationHeader({
  rebuilding,
  onRebuild,
}: CodingVerificationHeaderProps) {
  return (
    <header
      className="
        flex
        flex-col
        gap-4
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white/85
        px-5
        py-4
        shadow-[0_10px_35px_rgba(8,119,232,0.05)]
        backdrop-blur-xl

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
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
          <Code2 size={20} />
        </div>

        <div>
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <p
              className="
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              Coding Verification
            </p>

            <span
              className="
                rounded-full
                border
                border-[#CBE5F8]
                bg-[#EFF8FF]
                px-2.5
                py-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#0877E8]
              "
            >
              Admin
            </span>
          </div>

          <p
            className="
              mt-0.5
              text-xs
              text-[#8297AA]
            "
          >
            Verify coding accounts and rebuild rankings
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
        "
      >
        <button
          type="button"
          disabled={rebuilding}
          onClick={onRebuild}
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#0877E8]
            to-[#1294F2]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-[0_10px_24px_rgba(8,119,232,0.20)]
            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
        >
          {rebuilding ? (
            <>
              <LoaderCircle
                size={16}
                className="animate-spin"
              />

              Rebuilding...
            </>
          ) : (
            <>
              <RefreshCcw
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-90
                "
              />

              Rebuild Leaderboard
            </>
          )}
        </button>

        <Link
          href="/admin/dashboard"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#D8E8F4]
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#58738B]
            transition-all
            duration-200

            hover:border-[#B8DBF3]
            hover:bg-[#F5FBFF]
            hover:text-[#0877E8]
          "
        >
          <ArrowLeft
            size={15}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />

          Dashboard
        </Link>
      </div>
    </header>
  );
}