import Link from "next/link";

interface OpportunitiesAlertsProps {
  error: string;
  success: string;
}

export default function OpportunitiesAlerts({
  error,
  success,
}: OpportunitiesAlertsProps) {
  return (
    <>
      {error && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E4C7C7] bg-[#FBF1F1] px-5 py-4 text-sm text-[#A43F3F]">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C65A5A]" />

          <p className="leading-6">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-xl border border-[#BFD7C3] bg-[#F1F8F2] px-5 py-4 text-sm text-[#347A3A]">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#4B8A55]" />

            <p className="leading-6">
              {success}
            </p>
          </div>

          <Link
            href="/applications"
            className="mt-3 inline-flex font-bold underline"
          >
            View My Applications
          </Link>
        </div>
      )}
    </>
  );
}