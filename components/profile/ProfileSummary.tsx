interface ProfileSummaryProps {
  fullName: string;
  preferredRole: string;
  collegeName: string;
  degree: string;
  branch: string;
  graduationYear: string;
  city: string;
}

export default function ProfileSummary({
  fullName,
  preferredRole,
  collegeName,
  degree,
  branch,
  graduationYear,
  city,
}: ProfileSummaryProps) {
  return (
    <section className="mt-8 grid gap-5 md:grid-cols-3">
      <SummaryCard
        label="Student"
        title={
          fullName || "Student"
        }
        description={
          preferredRole ||
          "Preferred role not added"
        }
      />

      <SummaryCard
        label="College"
        title={
          collegeName ||
          "College not selected"
        }
        description={
          degree
            ? `${degree}${
                branch
                  ? ` • ${branch}`
                  : ""
              }`
            : "Degree not added"
        }
      />

      <SummaryCard
        label="Graduation"
        title={
          graduationYear ||
          "Not added"
        }
        description={
          city ||
          "City not added"
        }
      />
    </section>
  );
}

function SummaryCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#D8D5CC] bg-white p-6 shadow-[0_12px_35px_rgba(20,33,61,0.04)]">
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-[#C9A227]" />

        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C9A227]">
          {label}
        </p>
      </div>

      <h2 className="mt-4 text-xl font-bold tracking-[-0.02em] text-[#14213D]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#6B707B]">
        {description}
      </p>
    </div>
  );
}