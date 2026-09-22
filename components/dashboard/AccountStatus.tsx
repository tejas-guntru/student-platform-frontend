import {
  BadgeCheck,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface AccountStatusProps {
  email: string;
  membershipActive: boolean;
}

export default function AccountStatus({
  email,
  membershipActive,
}: AccountStatusProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_30px_rgba(8,119,232,0.045)]
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-[#38BDF8]/10
          blur-[80px]
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-6
          p-5

          sm:p-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* ===================================================
            LEFT
        =================================================== */}

        <div
          className="
            flex
            items-start
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#0877E8]
              "
            >
              Account Status
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
              Your Trailbliz account
            </h3>

            <div
              className="
                mt-2
                flex
                items-center
                gap-2
                text-sm
                text-[#71899D]
              "
            >
              <Mail
                size={14}
                className="
                  shrink-0
                  text-[#8CB8D4]
                "
              />

              <span
                className="
                  break-all
                "
              >
                {email || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            STATUS
        =================================================== */}

        <div
          className="
            grid
            gap-3

            sm:grid-cols-2

            lg:min-w-[420px]
          "
        >
          {/* ACCOUNT */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-[18px]
              border
              border-emerald-200
              bg-emerald-50/70
              px-4
              py-3.5
            "
          >
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <BadgeCheck size={16} />
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-600/70
                "
              >
                Account
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  font-bold
                  text-emerald-700
                "
              >
                Active
              </p>
            </div>
          </div>

          {/* MEMBERSHIP */}

          <div
            className={`
              flex
              items-center
              gap-3
              rounded-[18px]
              border
              px-4
              py-3.5

              ${
                membershipActive
                  ? `
                    border-emerald-200
                    bg-emerald-50/70
                  `
                  : `
                    border-[#DCEAF5]
                    bg-[#F8FCFF]
                  `
              }
            `}
          >
            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl

                ${
                  membershipActive
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-[#EAF6FF] text-[#0877E8]"
                }
              `}
            >
              <ShieldCheck size={16} />
            </div>

            <div>
              <p
                className={`
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]

                  ${
                    membershipActive
                      ? "text-emerald-600/70"
                      : "text-[#8AA0B2]"
                  }
                `}
              >
                Membership
              </p>

              <p
                className={`
                  mt-0.5
                  text-xs
                  font-bold

                  ${
                    membershipActive
                      ? "text-emerald-700"
                      : "text-[#58748B]"
                  }
                `}
              >
                {membershipActive
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACCENT */}

      <div
        className="
          h-[3px]
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />
    </section>
  );
}