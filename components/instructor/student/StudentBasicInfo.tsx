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
        scroll-mt-24
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5

        sm:p-6
      "
    >
      <div>
        <p
          className="
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
            text-sm
            text-slate-500
          "
        >
          Academic and contact information
          shared by the student.
        </p>
      </div>

      <div
        className="
          mt-6
          grid
          gap-x-8
          gap-y-5

          sm:grid-cols-2
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

      {!student.bio && (
        <div
          className="
            mt-6
            border-t
            border-slate-100
            pt-5
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
              text-sm
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
}: {
  icon: typeof UserRound;
  label: string;
  value: string | null;
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
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p
          className="
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
          className="
            mt-1
            break-words
            text-sm
            font-semibold
            text-slate-800
          "
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

  return new Date(
    value
  ).toLocaleString();
}