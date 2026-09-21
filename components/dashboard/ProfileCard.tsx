import Link from "next/link";

interface ProfileCardProps {
  email: string;
}

export default function ProfileCard({ email }: ProfileCardProps) {
  return (
    <div className="card flex h-full flex-col justify-between p-6">
      <div>
        {/* ICON */}
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f1f0eb] text-[#14213d]">
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* CONTENT */}
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#858994]">
          Profile
        </p>

        <h3 className="text-xl font-bold tracking-tight text-[#14213d]">
          Your Career Profile
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#5f6470]">
          Keep your academic details, skills, projects, internships and career
          information up to date.
        </p>

        {/* EMAIL */}
        <div className="mt-5 rounded-[10px] bg-[#f8f7f3] px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#858994]">
            Account
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-[#14213d]">
            {email}
          </p>
        </div>
      </div>

      {/* ACTION */}
      <div className="mt-6">
        <Link
          href="/profile"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-[#14213d]
            transition
            hover:text-[#a98616]
          "
        >
          View Profile

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
