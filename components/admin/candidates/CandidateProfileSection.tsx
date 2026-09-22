import {
  FileText,
  UserRound,
} from "lucide-react";

import type {
  AdminCandidate,
} from "@/types/adminCandidate";

import SectionHeader from "./shared/SectionHeader";
import InfoCard from "./shared/InfoCard";

interface CandidateProfileSectionProps {
  candidate: AdminCandidate;
}

export default function CandidateProfileSection({
  candidate,
}: CandidateProfileSectionProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.045)]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          gap-3
          border-b
          border-[#E5EFF7]
          bg-[#FBFDFF]
          px-5
          py-5

          sm:px-6
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#EAF6FF]
            text-[#0877E8]
          "
        >
          <UserRound size={18} />
        </div>

        <SectionHeader
          title="Candidate Profile"
          subtitle="Personal and academic information"
        />
      </div>

      {/* PROFILE INFORMATION */}

      <div
        className="
          grid
          gap-4
          p-5

          sm:grid-cols-2
          sm:p-6

          lg:grid-cols-4
        "
      >
        <InfoCard
          label="College"
          value={candidate.collegeName}
        />

        <InfoCard
          label="Degree"
          value={candidate.degree}
        />

        <InfoCard
          label="Branch"
          value={candidate.branch}
        />

        <InfoCard
          label="Graduation"
          value={candidate.graduationYear}
        />

        <InfoCard
          label="City"
          value={candidate.city}
        />

        <InfoCard
          label="Phone"
          value={candidate.phone}
        />

        <InfoCard
          label="Preferred Role"
          value={candidate.preferredRole}
        />

        <InfoCard
          label="Email"
          value={candidate.email}
        />
      </div>

      {/* BIO */}

      {candidate.bio && (
        <div
          className="
            border-t
            border-[#E5EFF7]
            px-5
            py-5

            sm:px-6
            sm:py-6
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[20px]
              border
              border-[#DCEAF5]
              bg-[#F8FCFF]
              p-5
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-36
                w-36
                rounded-full
                bg-[#38BDF8]/8
                blur-[45px]
              "
            />

            <div
              className="
                relative
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EAF6FF]
                  text-[#0877E8]
                "
              >
                <FileText size={14} />
              </div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-[#0877E8]
                "
              >
                Candidate Bio
              </p>
            </div>

            <p
              className="
                relative
                mt-4
                whitespace-pre-line
                text-sm
                leading-7
                text-[#58748B]
              "
            >
              {candidate.bio}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}