import {
  Building2,
  CalendarClock,
  GraduationCap,
  LoaderCircle,
  MapPin,
  Pencil,
  XCircle,
} from "lucide-react";

import type {
  Opportunity,
} from "@/types/opportunity";

import {
  formatOpportunityDate,
  formatOpportunityYears,
  getOpportunityId,
} from "@/utils/adminOpportunityUtils";

import OpportunityBadge from "./OpportunityBadge";
import OpportunityStatusBadge from "./OpportunityStatusBadge";

interface OpportunityCardProps {
  opportunity: Opportunity;
  closingId: string | null;

  onEdit: (
    opportunity: Opportunity
  ) => void;

  onClose: (
    opportunity: Opportunity
  ) => void;
}

export default function OpportunityCard({
  opportunity,
  closingId,
  onEdit,
  onClose,
}: OpportunityCardProps) {
  const id =
    getOpportunityId(
      opportunity
    );

  const closing =
    id !== null &&
    closingId === id;

  const closed =
    opportunity.status ===
    "CLOSED";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_10px_32px_rgba(8,119,232,0.045)]
        transition-all
        duration-300

        hover:border-[#B8DCF3]
        hover:shadow-[0_18px_44px_rgba(8,119,232,0.09)]
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          h-[3px]
          w-full
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          p-5

          sm:p-6
        "
      >
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
          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
              min-w-0
              flex-1
            "
          >
            {/* BADGES */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              <OpportunityBadge>
                {
                  opportunity.opportunityType
                }
              </OpportunityBadge>

              <OpportunityBadge>
                {opportunity.workMode}
              </OpportunityBadge>

              <OpportunityStatusBadge
                status={
                  opportunity.status
                }
              />
            </div>

            {/* TITLE */}

            <h3
              className="
                mt-5
                text-xl
                font-bold
                tracking-[-0.03em]
                text-[#173B63]

                sm:text-2xl
              "
            >
              {opportunity.title}
            </h3>

            {/* COMPANY */}

            <div
              className="
                mt-2
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#52718A]
                "
              >
                <Building2
                  size={15}
                  className="text-[#0877E8]"
                />

                {
                  opportunity.companyName
                }
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-[#7F94A5]
                "
              >
                <MapPin
                  size={14}
                  className="text-[#8ABEDD]"
                />

                {opportunity.location ||
                  "Location not specified"}
              </div>
            </div>

            {/* DESCRIPTION */}

            <div
              className="
                mt-5
                rounded-[18px]
                border
                border-[#E3EDF5]
                bg-[#F9FCFF]
                px-4
                py-4
              "
            >
              <p
                className="
                  whitespace-pre-line
                  text-sm
                  leading-6
                  text-[#688298]
                "
              >
                {
                  opportunity.description
                }
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="
              w-full

              lg:max-w-[310px]
            "
          >
            {/* DETAILS */}

            <div
              className="
                rounded-[20px]
                border
                border-[#DDEAF4]
                bg-[#F8FCFF]
                p-5
              "
            >
              {/* GRADUATION */}

              <div
                className="
                  flex
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
                    rounded-xl
                    bg-[#EAF6FF]
                    text-[#0877E8]
                  "
                >
                  <GraduationCap
                    size={17}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.13em]
                      text-[#8DA1B1]
                    "
                  >
                    Graduation Years
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-[#345B7C]
                    "
                  >
                    {formatOpportunityYears(
                      opportunity
                    )}
                  </p>
                </div>
              </div>

              {/* DIVIDER */}

              <div
                className="
                  my-4
                  h-px
                  bg-[#E2EDF5]
                "
              />

              {/* DEADLINE */}

              <div
                className="
                  flex
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
                    rounded-xl
                    bg-[#EEF5FF]
                    text-[#3478F6]
                  "
                >
                  <CalendarClock
                    size={17}
                  />
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.13em]
                      text-[#8DA1B1]
                    "
                  >
                    Application Deadline
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-semibold
                      text-[#345B7C]
                    "
                  >
                    {formatOpportunityDate(
                      opportunity.applicationDeadline
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div
              className="
                mt-4
                grid
                gap-3

                sm:grid-cols-2
                lg:grid-cols-1
                xl:grid-cols-2
              "
            >
              <button
                type="button"
                onClick={() =>
                  onEdit(
                    opportunity
                  )
                }
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
                  hover:bg-[#F2FAFF]
                  hover:shadow-[0_8px_20px_rgba(8,119,232,0.08)]
                "
              >
                <Pencil size={15} />

                Edit
              </button>

              <button
                type="button"
                disabled={
                  closed ||
                  closing
                }
                onClick={() =>
                  onClose(
                    opportunity
                  )
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
                  px-4
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
                {closing ? (
                  <>
                    <LoaderCircle
                      size={15}
                      className="animate-spin"
                    />

                    Closing...
                  </>
                ) : closed ? (
                  <>
                    <XCircle size={15} />

                    Closed
                  </>
                ) : (
                  <>
                    <XCircle size={15} />

                    Close
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CLOSED OVERLAY STRIP
      ===================================================== */}

      {closed && (
        <div
          className="
            border-t
            border-[#E5EDF4]
            bg-slate-50
            px-5
            py-2.5

            sm:px-6
          "
        >
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-slate-500
            "
          >
            This opportunity is closed and no longer
            accepts applications.
          </p>
        </div>
      )}
    </article>
  );
}