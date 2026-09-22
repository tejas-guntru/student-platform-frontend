import {
  ArrowUpRight,
  Code2,
  GraduationCap,
  LoaderCircle,
  Mail,
  ShieldCheck,
  ShieldOff,
  UserRound,
} from "lucide-react";

import type {
  AdminCodingProfile,
} from "@/types/adminCodingProfile";

import {
  formatCodingPlatform,
  getCodingStudentName,
} from "@/utils/adminCodingProfileUtils";

import VerificationBadge from "./VerificationBadge";
import CodingStatCard from "./CodingStatCard";

interface CodingProfileCardProps {
  profile: AdminCodingProfile;
  working: boolean;

  onVerify: (
    profile: AdminCodingProfile
  ) => void;

  onUnverify: (
    profile: AdminCodingProfile
  ) => void;
}

export default function CodingProfileCard({
  profile,
  working,
  onVerify,
  onUnverify,
}: CodingProfileCardProps) {
  const verified =
    profile.verificationStatus ===
    "VERIFIED";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_34px_rgba(8,119,232,0.05)]
        transition-all
        duration-300

        hover:border-[#B7DCF4]
        hover:shadow-[0_20px_46px_rgba(8,119,232,0.09)]
      "
    >
      {/* TOP ACCENT */}

      <div
        className={`
          h-[3px]
          w-full
          bg-gradient-to-r

          ${
            verified
              ? "from-emerald-500 via-teal-400 to-cyan-400"
              : "from-[#0877E8] via-[#1294F2] to-[#38BDF8]"
          }
        `}
      />

      <div
        className="
          p-5

          sm:p-7
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* STUDENT */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
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
                  bg-gradient-to-br
                  from-[#E5F5FF]
                  to-[#CBEAFF]
                  text-[#0877E8]
                "
              >
                <UserRound size={21} />
              </div>

              <div className="min-w-0">
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <h2
                    className="
                      text-xl
                      font-bold
                      tracking-[-0.03em]
                      text-[#173B63]

                      sm:text-2xl
                    "
                  >
                    {getCodingStudentName(
                      profile
                    )}
                  </h2>

                  <VerificationBadge
                    status={
                      profile.verificationStatus
                    }
                  />
                </div>

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
                    className="text-[#8CBBD8]"
                  />

                  <span className="truncate">
                    {profile.studentEmail ||
                      profile.email ||
                      "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* PROFILE INFO */}

            <div
              className="
                mt-5
                grid
                gap-3

                sm:grid-cols-3
              "
            >
              <ProfileInfo
                icon={Code2}
                label="Platform"
                value={formatCodingPlatform(
                  profile.platform
                )}
              />

              <ProfileInfo
                icon={UserRound}
                label="Username"
                value={
                  profile.username || "-"
                }
              />

              <ProfileInfo
                icon={GraduationCap}
                label="Graduation"
                value={
                  profile.graduationYear
                    ? String(
                        profile.graduationYear
                      )
                    : "-"
                }
              />
            </div>
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              flex
              w-full
              flex-wrap
              gap-3

              lg:w-auto
              lg:justify-end
            "
          >
            {profile.profileUrl && (
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#CFE4F3]
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#0877E8]
                  transition-all
                  duration-200

                  hover:border-[#A9D2EC]
                  hover:bg-[#EFF8FF]
                  hover:shadow-[0_8px_20px_rgba(8,119,232,0.07)]
                "
              >
                Open Profile

                <ArrowUpRight size={15} />
              </a>
            )}

            {!verified ? (
              <button
                type="button"
                disabled={working}
                onClick={() =>
                  onVerify(profile)
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#0877E8]
                  to-[#1294F2]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_10px_24px_rgba(8,119,232,0.18)]
                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-[0_14px_30px_rgba(8,119,232,0.25)]

                  disabled:cursor-not-allowed
                  disabled:translate-y-0
                  disabled:opacity-60
                "
              >
                {working ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />

                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={15} />

                    Verify
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={working}
                onClick={() =>
                  onUnverify(profile)
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-red-600
                  transition-all
                  duration-200

                  hover:border-red-300
                  hover:bg-red-100

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {working ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <ShieldOff size={15} />

                    Unverify
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ===================================================
            STATS
        =================================================== */}

        <div
          className="
            mt-7
            border-t
            border-[#E5EFF7]
            pt-6
          "
        >
          <div
            className="
              mb-4
              flex
              flex-col
              gap-2

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#0877E8]
                "
              >
                Coding Performance
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-bold
                  text-[#274E70]
                "
              >
                Profile Statistics
              </h3>
            </div>

            <div
              className="
                w-fit
                rounded-full
                border
                border-[#DCEAF5]
                bg-[#F8FCFF]
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-[#71899D]
              "
            >
              {formatCodingPlatform(
                profile.platform
              )}
            </div>
          </div>

          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-5
            "
          >
            <CodingStatCard
              label="Current Rating"
              value={
                profile.currentRating
              }
            />

            <CodingStatCard
              label="Max Rating"
              value={
                profile.maxRating
              }
            />

            <CodingStatCard
              label="Problems"
              value={
                profile.problemsSolved
              }
            />

            <CodingStatCard
              label="Contests"
              value={
                profile.contestCount
              }
            />

            <CodingStatCard
              label="Sync"
              value={
                profile.syncStatus ||
                "-"
              }
            />
          </div>
        </div>
      </div>

      {/* VERIFIED FOOTER */}

      {verified && (
        <div
          className="
            flex
            items-center
            gap-2
            border-t
            border-emerald-100
            bg-emerald-50/60
            px-5
            py-3

            sm:px-7
          "
        >
          <ShieldCheck
            size={14}
            className="text-emerald-600"
          />

          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-emerald-700
            "
          >
            Verified profile — eligible for leaderboard ranking
          </p>
        </div>
      )}
    </article>
  );
}

function ProfileInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[16px]
        border
        border-[#E1ECF5]
        bg-[#FBFDFF]
        p-3.5
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Icon
          size={14}
          className="text-[#87B8D6]"
        />

        <span
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#93A6B5]
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-2
          truncate
          text-xs
          font-semibold
          text-[#52718A]
        "
      >
        {value}
      </p>
    </div>
  );
}