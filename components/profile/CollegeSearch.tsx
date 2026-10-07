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
    <div
      className="
        min-w-0
        w-full
      "
    >
      {/* LABEL */}

      <label
        htmlFor="college-search"
        className="
          mb-2
          block
          break-words
          text-xs
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#5F7C92]

          [overflow-wrap:anywhere]
        "
      >
        College
      </label>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div
        className="
          relative
          min-w-0
          w-full
        "
      >
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
          aria-hidden="true"
        />

        <input
          id="college-search"
          type="search"
          value={collegeSearch}
          onFocus={onFocus}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search your college..."
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={
            showResults
          }
          aria-controls="college-search-results"
          className={`
            ${profileInputClass}
            min-w-0
            w-full
            pl-11
            ${searching ? "pr-11" : ""}
          `}
        />

        {searching && (
          <LoaderCircle
            size={16}
            className="
              pointer-events-none
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              animate-spin
              text-[#0877E8]
            "
            aria-hidden="true"
          />
        )}

        {/* ===================================================
            RESULTS
        =================================================== */}

        {showResults && (
          <div
            id="college-search-results"
            className="
              absolute
              left-0
              right-0
              z-40
              mt-2
              max-h-64
              min-w-0
              overflow-x-hidden
              overflow-y-auto
              overscroll-contain
              rounded-2xl
              border
              border-[#D6E7F3]
              bg-white
              p-1.5
              shadow-[0_20px_55px_rgba(20,70,110,0.16)]

              sm:max-h-72
              sm:rounded-[18px]
            "
            role="listbox"
            aria-label="College search results"
          >
            {searching ? (
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                  px-3
                  py-4
                  text-sm
                  text-[#71899D]

                  sm:px-4
                "
                role="status"
                aria-live="polite"
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
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                </div>

                <span
                  className="
                    min-w-0
                    break-words

                    [overflow-wrap:anywhere]
                  "
                >
                  Searching colleges...
                </span>
              </div>
            ) : colleges.length === 0 ? (
              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-3
                  px-3
                  py-4

                  sm:px-4
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
                  <School
                    size={16}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      break-words
                      text-sm
                      font-semibold
                      text-[#527087]

                      [overflow-wrap:anywhere]
                    "
                  >
                    No colleges found
                  </p>

                  <p
                    className="
                      mt-1
                      break-words
                      text-xs
                      leading-5
                      text-[#91A5B5]

                      [overflow-wrap:anywhere]
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

                  const location =
                    [
                      college.city,
                      college.state,
                    ]
                      .filter(Boolean)
                      .join(", ");

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
                        min-h-12
                        w-full
                        min-w-0
                        items-start
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        transition-colors
                        duration-150

                        hover:bg-[#F1F9FF]

                        focus-visible:bg-[#F1F9FF]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-[#0877E8]/20

                        sm:rounded-[14px]
                      "
                      role="option"
                      aria-selected={
                        Boolean(
                          collegeId &&
                            id ===
                              collegeId
                        )
                      }
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
                        <School
                          size={15}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            break-words
                            text-sm
                            font-semibold
                            leading-5
                            text-[#294E6B]

                            [overflow-wrap:anywhere]
                          "
                        >
                          {name}
                        </p>

                        {location && (
                          <div
                            className="
                              mt-1
                              flex
                              min-w-0
                              items-start
                              gap-1.5
                              text-xs
                              leading-5
                              text-[#8299AA]
                            "
                          >
                            <MapPin
                              size={11}
                              className="
                                mt-1
                                shrink-0
                                text-[#8DB7D1]
                              "
                              aria-hidden="true"
                            />

                            <span
                              className="
                                min-w-0
                                break-words

                                [overflow-wrap:anywhere]
                              "
                            >
                              {location}
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
            min-w-0
            flex-col
            gap-3
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50/60
            p-3.5

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-4
          "
        >
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
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >
              <CheckCircle2
                size={16}
                aria-hidden="true"
              />
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
                  leading-5
                  text-emerald-800

                  [overflow-wrap:anywhere]
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
              min-h-10
              w-full
              shrink-0
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
              transition-colors

              hover:border-emerald-300
              hover:bg-emerald-50

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500/20
              focus-visible:ring-offset-2

              sm:w-auto
            "
            aria-label={`Change selected college${
              collegeName
                ? `: ${collegeName}`
                : ""
            }`}
          >
            <X
              size={13}
              className="shrink-0"
              aria-hidden="true"
            />

            Change
          </button>
        </div>
      ) : (
        /* NO COLLEGE SELECTED */

        <div
          className="
            mt-3
            flex
            min-w-0
            items-start
            gap-3
            rounded-xl
            border
            border-[#DCEAF5]
            bg-[#F8FCFF]
            px-3.5
            py-3

            sm:rounded-[14px]
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
            <School
              size={13}
              aria-hidden="true"
            />
          </div>

          <p
            className="
              min-w-0
              break-words
              text-xs
              leading-5
              text-[#71899D]

              [overflow-wrap:anywhere]
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