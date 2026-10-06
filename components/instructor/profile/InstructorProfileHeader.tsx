import {
  Building2,
  UserRound,
} from "lucide-react";

interface InstructorProfileHeaderProps {
  fullName: string;
  designation: string | null;
  organization: string | null;
}

function getInitials(
  fullName: string
) {
  const parts =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (parts.length === 0) {
    return "IN";
  }

  return parts
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");
}

export default function InstructorProfileHeader({
  fullName,
  designation,
  organization,
}: InstructorProfileHeaderProps) {
  const initials =
    getInitials(fullName);

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div
        className="
          h-24
          bg-gradient-to-r
          from-[#1256AF]
          via-blue-600
          to-sky-500
        "
      />

      <div
        className="
          px-5
          pb-6
          sm:px-7
        "
      >
        <div
          className="
            -mt-10
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border-4
                border-white
                bg-[#1256AF]
                text-xl
                font-bold
                text-white
                shadow-md
              "
            >
              {initials}
            </div>

            <div className="pb-1">
              <div
                className="
                  mb-1
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#1256AF]
                "
              >
                <UserRound size={14} />

                Instructor Profile
              </div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-950
                  sm:text-3xl
                "
              >
                {fullName}
              </h1>

              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  text-sm
                  text-slate-500
                "
              >
                {designation && (
                  <span>
                    {designation}
                  </span>
                )}

                {organization && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                    "
                  >
                    <Building2
                      size={14}
                    />

                    {organization}
                  </span>
                )}

                {!designation &&
                  !organization && (
                    <span>
                      Complete your
                      professional profile.
                    </span>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}