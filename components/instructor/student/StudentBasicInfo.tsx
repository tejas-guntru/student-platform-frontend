import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  School,
  UserRound,
} from "lucide-react";

import type {
  InstructorStudentOverviewResponse,
} from "@/types/instructorStudent";

interface StudentBasicInfoProps {
  student: InstructorStudentOverviewResponse;
}

export default function StudentBasicInfo({
  student,
}: StudentBasicInfoProps) {
  return (
    <section
      id="profile"
      className="
        min-w-0
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4

        sm:p-6
      "
    >
      {/* HEADER */}

      <div className="min-w-0">
        <p
          className="
            break-words
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#1256AF]
          "
        >
          Profile
        </p>

        <h2
          className="
            mt-2
            break-words
            text-xl
            font-bold
            text-slate-950
          "
        >
          Student Information
        </h2>

        <p
          className="
            mt-1
            max-w-2xl
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          Academic and contact information
          shared by the student.
        </p>
      </div>

      {/* INFORMATION GRID */}

      <div
        className="
          mt-5
          grid
          min-w-0
          grid-cols-1
          gap-x-6
          gap-y-5

          sm:mt-6
          sm:grid-cols-2

          lg:gap-x-8

          xl:grid-cols-3
        "
      >
        <InfoItem
          icon={UserRound}
          label="Full Name"
          value={student.fullName}
        />

        <InfoItem
          icon={Mail}
          label="Email"
          value={student.email}
          breakAll
        />

        <InfoItem
          icon={Phone}
          label="Phone"
          value={student.phone}
        />

        <InfoItem
          icon={MapPin}
          label="City"
          value={student.city}
        />

        <InfoItem
          icon={GraduationCap}
          label="Degree"
          value={student.degree}
        />

        <InfoItem
          icon={GraduationCap}
          label="Branch"
          value={student.branch}
        />

        <InfoItem
          icon={CalendarDays}
          label="Graduation Year"
          value={
            student.graduationYear
              ? String(
                  student.graduationYear
                )
              : null
          }
        />

        <InfoItem
          icon={School}
          label="College"
          value={student.collegeName}
        />

        <InfoItem
          icon={BriefcaseBusiness}
          label="Preferred Role"
          value={student.preferredRole}
        />

        <InfoItem
          icon={CalendarDays}
          label="Joined Batch"
          value={formatDateTime(
            student.joinedAt
          )}
        />
      </div>

      {/* EMPTY BIO */}

      {!student.bio && (
        <div
          className="
            mt-5
            min-w-0
            border-t
            border-slate-100
            pt-5

            sm:mt-6
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-slate-400
            "
          >
            Bio
          </p>

          <p
            className="
              mt-2
              break-words
              text-sm
              leading-6
              text-slate-500
            "
          >
            No bio has been added.
          </p>
        </div>
      )}
    </section>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  breakAll = false,
}: {
  icon: typeof UserRound;
  label: string;
  value: string | null;
  breakAll?: boolean;
}) {
  return (
    <div
      className="
        flex
        min-w-0
        items-start
        gap-3
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
          rounded-lg
          bg-slate-50
          text-slate-500
        "
      >
        <Icon
          size={16}
          aria-hidden="true"
        />
      </div>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            break-words
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className={`
            mt-1
            min-w-0
            text-sm
            font-semibold
            leading-5
            text-slate-800

            ${
              breakAll
                ? "break-all"
                : "break-words [overflow-wrap:anywhere]"
            }
          `}
        >
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function formatDateTime(
  value: string | null
) {
  if (!value) {
    return "Not provided";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not provided";
  }

  return date.toLocaleString();
}