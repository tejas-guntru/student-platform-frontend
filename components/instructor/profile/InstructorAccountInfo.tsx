import {
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface InstructorAccountInfoProps {
  email: string;
}

export default function InstructorAccountInfo({
  email,
}: InstructorAccountInfoProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-emerald-50
            text-emerald-600
          "
        >
          <ShieldCheck size={18} />
        </span>

        <div>
          <h2
            className="
              text-base
              font-bold
              text-slate-950
            "
          >
            Account
          </h2>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-slate-500
            "
          >
            Account identity is managed
            separately from your instructor
            profile.
          </p>
        </div>
      </div>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
            rounded-xl
            bg-slate-50
            p-4
          "
        >
          <Mail
            size={16}
            className="
              mt-0.5
              shrink-0
              text-slate-400
            "
          />

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                text-slate-500
              "
            >
              Login email
            </p>

            <p
              className="
                mt-1
                break-all
                text-sm
                font-semibold
                text-slate-800
              "
            >
              {email}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            items-start
            gap-3
            rounded-xl
            border
            border-slate-100
            p-4
          "
        >
          <LockKeyhole
            size={16}
            className="
              mt-0.5
              shrink-0
              text-slate-400
            "
          />

          <p
            className="
              text-xs
              leading-5
              text-slate-500
            "
          >
            Email and authentication
            settings cannot be changed from
            this profile page.
          </p>
        </div>
      </div>
    </section>
  );
}