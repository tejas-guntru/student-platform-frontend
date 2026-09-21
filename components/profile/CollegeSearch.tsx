"use client";

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
      <label className="mb-2 block text-sm font-semibold text-[#14213D]">
        College
      </label>

      {/* SEARCH */}
      <div className="relative">
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
          className={
            profileInputClass
          }
        />

        {/* RESULTS */}
        {showResults && (
          <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-[#D8D5CC] bg-white shadow-[0_18px_50px_rgba(20,33,61,0.15)]">

            {/* SEARCHING */}
            {searching ? (
              <div className="flex items-center gap-3 p-4 text-sm text-[#6B707B]">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D5CC] border-t-[#C9A227]" />

                <span>
                  Searching colleges...
                </span>
              </div>
            ) : colleges.length === 0 ? (
              /* EMPTY */
              <div className="p-4 text-sm text-[#858994]">
                No colleges found.
              </div>
            ) : (
              /* COLLEGES */
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
                        block
                        w-full
                        border-b
                        border-[#EEECE6]
                        px-4
                        py-4
                        text-left
                        transition
                        last:border-b-0
                        hover:bg-[#F8F7F3]
                        focus:bg-[#F8F7F3]
                        focus:outline-none
                      "
                    >
                      <p className="font-semibold text-[#14213D]">
                        {name}
                      </p>

                      {(college.city ||
                        college.state) && (
                        <p className="mt-1 text-xs text-[#858994]">
                          {college.city}

                          {college.city &&
                          college.state
                            ? ", "
                            : ""}

                          {college.state}
                        </p>
                      )}
                    </button>
                  );
                }
              )
            )}
          </div>
        )}
      </div>

      {/* SELECTED COLLEGE */}
      {collegeId ? (
        <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#BFD7C3] bg-[#F1F8F2] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4B8A55]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#4B8A55]">
                Selected College
              </p>
            </div>

            <p className="mt-2 font-semibold text-[#245B2C]">
              {collegeName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="
              rounded-lg
              border
              border-[#C8C5BC]
              bg-white
              px-3
              py-2
              text-xs
              font-bold
              text-[#14213D]
              transition-all
              hover:border-[#C9A227]
              hover:bg-[#FBFAF6]
              hover:text-[#A98616]
            "
          >
            Change
          </button>
        </div>
      ) : (
        /* NO COLLEGE SELECTED */
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#E8DCA9] bg-[#FBF7E8] px-3 py-2.5">
          <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A227]" />

          <p className="text-xs leading-5 text-[#806E30]">
            Search and select your college
            from the list.
          </p>
        </div>
      )}
    </div>
  );
}