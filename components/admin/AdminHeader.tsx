import Image from "next/image";

import {
  LogOut,
  ShieldCheck,
} from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({
  onLogout,
}: AdminHeaderProps) {
  return (
    <header
      className="
        flex
        flex-col
        gap-4
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white/80
        px-5
        py-4
        shadow-[0_10px_35px_rgba(8,119,232,0.05)]
        backdrop-blur-xl

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-[#D6E9F7]
            bg-[#F4FAFF]
          "
        >
          <Image
            src="/trailbliz-icon.png"
            alt="Trailbliz"
            width={44}
            height={44}
            className="
              h-full
              w-full
              object-contain
              p-1.5
            "
            priority
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p
              className="
                text-lg
                font-bold
                tracking-[-0.025em]
                text-[#173B63]
              "
            >
              Trailbliz
            </p>

            <span
              className="
                inline-flex
                items-center
                gap-1.5
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
              <ShieldCheck size={11} />

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
            Platform administration
          </p>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-[#DDEBF5]
            bg-[#F8FCFF]
            px-3
            py-2

            sm:flex
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              shadow-[0_0_0_4px_rgba(16,185,129,0.10)]
            "
          />

          <span
            className="
              text-[11px]
              font-semibold
              text-[#647F96]
            "
          >
            Admin session active
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
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

            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600
            hover:shadow-[0_8px_22px_rgba(239,68,68,0.08)]
          "
        >
          <LogOut
            size={16}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />

          Logout
        </button>
      </div>
    </header>
  );
}