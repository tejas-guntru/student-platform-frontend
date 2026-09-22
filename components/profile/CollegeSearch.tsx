"use client";

import {
  CheckCircle2,
  LoaderCircle,
  MapPin,
  School,
  Search,
  X,
} from "lucide-react";

import type {
  College,
} from "@/types/college";

import {
  profileInputClass,
} from "@/components/profile/profileStyles";

interface CollegeSearchProps {
  collegeId: string | null;
  collegeName: string;
  collegeSearch: string;

  colleges: College[];

  searching: boolean;
  showResults: boolean;

  onFocus: () => void;

  onSearchChange:
    (value: string) => void;

  onSelect:
    (college: College) => void;

  onClear: () => void;
}

export default function CollegeSearch({
  collegeId,
  collegeName,
  collegeSearch,
  colleges,
  searching,
  showResults,
  onFocus,
  onSearchChange,
  onSelect,
  onClear,
}: CollegeSearchProps) {
  const getCollegeId = (
    college: College
  ) =>
    college.id ||
    college.collegeId ||
    null;

  const getCollegeName = (
    college: College
  ) =>
    college.name ||
    college.collegeName ||
    "Unnamed College";

  return (
    <div>
      {/* LABEL */}

      <label
        className="
          mb-2
          block
          text-xs
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#5F7C92]
        "
      >
        College
      </label>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="relative">
        <Search
          size={16}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            text-[#8AA8BC]
          "
        />

        <input
          type="text"
          value={collegeSearch}
          onFocus={onFocus}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search your college..."
          className={`${profileInputClass} pl-11`}
        />

        {searching && (
          <LoaderCircle
            size={16}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              animate-spin
              text-[#0877E8]
            "
          />
        )}

        {/* ===================================================
            RESULTS
        =================================================== */}

        {showResults && (
          <div
            className="
              absolute
              left-0
              right-0
              z-40
              mt-2
              max-h-72
              overflow-y-auto
              rounded-[18px]
              border
              border-[#D6E7F3]
              bg-white
              p-1.5
              shadow-[0_20px_55px_rgba(20,70,110,0.16)]
            "
          >
            {searching ? (
              <div
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-4
                  text-sm
                  text-[#71899D]
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF6FF]
                    text-[#0877E8]
                  "
                >
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                  />
                </div>

                <span>
                  Searching colleges...
                </span>
              </div>
            ) : colleges.length === 0 ? (
              <div
                className="
                  flex
                  items-start
                  gap-3
                  px-4
                  py-4
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
                    bg-[#F3F8FC]
                    text-[#8AA0B2]
                  "
                >
                  <School size={16} />
                </div>

                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-[#527087]
                    "
                  >
                    No colleges found
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-[#91A5B5]
                    "
                  >
                    Try a different college
                    name or spelling.
                  </p>
                </div>
              </div>
            ) : (
              colleges.map(
                (
                  college,
                  index
                ) => {
                  const id =
                    getCollegeId(
                      college
                    );

                  const name =
                    getCollegeName(
                      college
                    );

                  return (
                    <button
                      key={
                        id ||
                        `${name}-${index}`
                      }
                      type="button"
                      onClick={() =>
                        onSelect(
                          college
                        )
                      }
                      className="
                        group
                        flex
                        w-full
                        items-start
                        gap-3
                        rounded-[14px]
                        px-3
                        py-3
                        text-left
                        transition-all
                        duration-150

                        hover:bg-[#F1F9FF]

                        focus:bg-[#F1F9FF]
                        focus:outline-none
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
                          transition-colors

                          group-hover:bg-[#0877E8]
                          group-hover:text-white
                        "
                      >
                        <School size={15} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            break-words
                            text-sm
                            font-semibold
                            text-[#294E6B]
                          "
                        >
                          {name}
                        </p>

                        {(college.city ||
                          college.state) && (
                          <div
                            className="
                              mt-1
                              flex
                              items-center
                              gap-1.5
                              text-xs
                              text-[#8299AA]
                            "
                          >
                            <MapPin
                              size={11}
                              className="
                                shrink-0
                                text-[#8DB7D1]
                              "
                            />

                            <span>
                              {college.city}

                              {college.city &&
                              college.state
                                ? ", "
                                : ""}

                              {college.state}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                }
              )
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          SELECTED COLLEGE
      ===================================================== */}

      {collegeId ? (
        <div
          className="
            mt-3
            flex
            flex-col
            gap-3
            rounded-[16px]
            border
            border-emerald-200
            bg-emerald-50/60
            p-4

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
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
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle2 size={16} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-emerald-600
                "
              >
                Selected College
              </p>

              <p
                className="
                  mt-1
                  break-words
                  text-sm
                  font-bold
                  text-emerald-800
                "
              >
                {collegeName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="
              inline-flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              border
              border-emerald-200
              bg-white
              px-3
              py-2
              text-xs
              font-bold
              text-emerald-700
              transition-all

              hover:border-emerald-300
              hover:bg-emerald-50
            "
          >
            <X size={13} />

            Change
          </button>
        </div>
      ) : (
        /* NO COLLEGE SELECTED */

        <div
          className="
            mt-3
            flex
            items-start
            gap-3
            rounded-[14px]
            border
            border-[#DCEAF5]
            bg-[#F8FCFF]
            px-3.5
            py-3
          "
        >
          <div
            className="
              mt-0.5
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            <School size={13} />
          </div>

          <p
            className="
              text-xs
              leading-5
              text-[#71899D]
            "
          >
            Search and select your college
            from the available results.
          </p>
        </div>
      )}
    </div>
  );
}