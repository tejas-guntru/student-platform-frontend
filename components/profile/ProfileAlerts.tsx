import {
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ProfileAlertsProps {
  error: string;
  success: string;
}

export default function ProfileAlerts({
  error,
  success,
}: ProfileAlertsProps) {
  return (
    <div className="space-y-3">
      {error && (
        <div
          role="alert"
          className="
            flex
            items-start
            gap-3
            rounded-[18px]
            border
            border-red-200
            bg-white
            px-4
            py-4
            text-sm
            shadow-[0_10px_28px_rgba(239,68,68,0.05)]

            sm:px-5
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
              bg-red-50
              text-red-600
            "
          >
            <AlertCircle size={17} />
          </div>

          <div className="min-w-0">
            <p
              className="
                font-bold
                text-red-700
              "
            >
              Unable to update profile
            </p>

            <p
              className="
                mt-1
                break-words
                leading-6
                text-red-600/85
              "
            >
              {error}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="
            flex
            items-start
            gap-3
            rounded-[18px]
            border
            border-emerald-200
            bg-white
            px-4
            py-4
            text-sm
            shadow-[0_10px_28px_rgba(16,185,129,0.05)]

            sm:px-5
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
              bg-emerald-50
              text-emerald-600
            "
          >
            <CheckCircle2 size={17} />
          </div>

          <div className="min-w-0">
            <p
              className="
                font-bold
                text-emerald-700
              "
            >
              Profile updated
            </p>

            <p
              className="
                mt-1
                break-words
                leading-6
                text-emerald-600/85
              "
            >
              {success}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}