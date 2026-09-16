"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getMyProfile,
  updateMyProfile,
} from "@/services/studentService";

import {
  getColleges,
} from "@/services/collegeService";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  ProfileCompletion,
} from "@/services/profileCompletionService";

import type {
  College,
} from "@/types/college";


export default function ProfilePage() {

  // =========================================================
  // BASIC PROFILE
  // =========================================================

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    degree,
    setDegree,
  ] = useState("");

  const [
    branch,
    setBranch,
  ] = useState("");

  const [
    graduationYear,
    setGraduationYear,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    preferredRole,
    setPreferredRole,
  ] = useState("");

  const [
    bio,
    setBio,
  ] = useState("");


  // =========================================================
  // COLLEGE
  // =========================================================

  const [
    collegeName,
    setCollegeName,
  ] = useState("");

  const [
    collegeId,
    setCollegeId,
  ] =
    useState<string | null>(
      null
    );

  const [
    collegeSearch,
    setCollegeSearch,
  ] = useState("");

  const [
    colleges,
    setColleges,
  ] =
    useState<College[]>([]);

  const [
    searchingColleges,
    setSearchingColleges,
  ] =
    useState(false);

  const [
    showCollegeResults,
    setShowCollegeResults,
  ] =
    useState(false);


  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const [
    completion,
    setCompletion,
  ] =
    useState<ProfileCompletion | null>(
      null
    );


  // =========================================================
  // PAGE STATE
  // =========================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {

    const loadProfile =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );


        if (
          !token ||
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          const [
            profile,
            completionData,
          ] =
            await Promise.all([
              getMyProfile(),
              getProfileCompletion(),
            ]);


          setFullName(
            profile.fullName ||
            ""
          );

          setPhone(
            profile.phone ||
            ""
          );

          setDegree(
            profile.degree ||
            ""
          );

          setBranch(
            profile.branch ||
            ""
          );

          setGraduationYear(
            profile.graduationYear
              ? String(
                  profile.graduationYear
                )
              : ""
          );

          setCity(
            profile.city ||
            ""
          );

          setPreferredRole(
            profile.preferredRole ||
            ""
          );

          setBio(
            profile.bio ||
            ""
          );

          setCollegeName(
            profile.collegeName ||
            ""
          );

          setCollegeSearch(
            profile.collegeName ||
            ""
          );

          setCollegeId(
            profile.collegeId ||
            null
          );


          setCompletion(
            completionData
          );

        } catch (
          error: unknown
        ) {

          console.error(
            "PROFILE LOAD ERROR:",
            error
          );


          if (
            axios.isAxiosError(
              error
            )
          ) {

            if (
              error.response?.status ===
                401 ||
              error.response?.status ===
                403
            ) {

              localStorage.clear();

              window.location.href =
                "/login";

              return;
            }


            setError(
              error.response
                ?.data?.message ||
                "Unable to load profile."
            );

          } else {

            setError(
              "Something went wrong while loading profile."
            );
          }

        } finally {

          setLoading(
            false
          );
        }
      };


    loadProfile();

  }, []);


  // =========================================================
  // SEARCH COLLEGES
  // =========================================================

  useEffect(() => {

    if (!showCollegeResults) {
      return;
    }


    const timer =
      window.setTimeout(
        async () => {

          setSearchingColleges(
            true
          );


          try {

            const data =
              await getColleges(
                collegeSearch
              );


            setColleges(
              Array.isArray(data)
                ? data
                : []
            );

          } catch (
            error: unknown
          ) {

            console.error(
              "COLLEGE SEARCH ERROR:",
              error
            );

          } finally {

            setSearchingColleges(
              false
            );
          }

        },
        300
      );


    return () =>
      window.clearTimeout(
        timer
      );

  }, [
    collegeSearch,
    showCollegeResults,
  ]);


  // =========================================================
  // COLLEGE HELPERS
  // =========================================================

  const getCollegeId = (
    college: College
  ) => {

    return (
      college.id ||
      college.collegeId ||
      null
    );
  };


  const getCollegeName = (
    college: College
  ) => {

    return (
      college.name ||
      college.collegeName ||
      "Unnamed College"
    );
  };


  const selectCollege = (
    college: College
  ) => {

    const id =
      getCollegeId(
        college
      );

    const name =
      getCollegeName(
        college
      );


    if (!id) {

      setError(
        "College ID is missing."
      );

      return;
    }


    setCollegeId(
      id
    );

    setCollegeName(
      name
    );

    setCollegeSearch(
      name
    );

    setShowCollegeResults(
      false
    );

    setError("");
    setSuccess("");
  };


  const clearCollege =
    () => {

      setCollegeId(
        null
      );

      setCollegeName("");

      setCollegeSearch("");

      setColleges([]);

      setShowCollegeResults(
        false
      );

      setSuccess("");
    };


  // =========================================================
  // REFRESH COMPLETION
  // =========================================================

  const refreshCompletion =
    async () => {

      try {

        const data =
          await getProfileCompletion();


        setCompletion(
          data
        );

      } catch (
        error
      ) {

        console.error(
          "PROFILE COMPLETION ERROR:",
          error
        );
      }
    };


  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const saveProfile =
    async () => {

      setError("");
      setSuccess("");


      if (!fullName.trim()) {

        setError(
          "Full name is required."
        );

        return;
      }


      if (
        graduationYear &&
        Number.isNaN(
          Number(
            graduationYear
          )
        )
      ) {

        setError(
          "Graduation year must be a number."
        );

        return;
      }


      setSaving(
        true
      );


      try {

        const request = {

          fullName:
            fullName.trim(),

          phone:
            phone.trim() ||
            null,

          degree:
            degree.trim() ||
            null,

          branch:
            branch.trim() ||
            null,

          graduationYear:
            graduationYear
              ? Number(
                  graduationYear
                )
              : null,

          city:
            city.trim() ||
            null,

          preferredRole:
            preferredRole.trim() ||
            null,

          bio:
            bio.trim() ||
            null,

          collegeId,
        };


        const updated =
          await updateMyProfile(
            request
          );


        setFullName(
          updated.fullName ||
          ""
        );

        setPhone(
          updated.phone ||
          ""
        );

        setDegree(
          updated.degree ||
          ""
        );

        setBranch(
          updated.branch ||
          ""
        );

        setGraduationYear(
          updated.graduationYear
            ? String(
                updated.graduationYear
              )
            : ""
        );

        setCity(
          updated.city ||
          ""
        );

        setPreferredRole(
          updated.preferredRole ||
          ""
        );

        setBio(
          updated.bio ||
          ""
        );

        setCollegeName(
          updated.collegeName ||
          ""
        );

        setCollegeSearch(
          updated.collegeName ||
          ""
        );

        setCollegeId(
          updated.collegeId ||
          null
        );


        await refreshCompletion();


        setSuccess(
          "Profile updated successfully."
        );

      } catch (
        error: unknown
      ) {

        console.error(
          "PROFILE SAVE ERROR:",
          error
        );


        if (
          axios.isAxiosError(
            error
          )
        ) {

          setError(
            error.response
              ?.data?.message ||
              `Unable to update profile. Status: ${
                error.response
                  ?.status ||
                "unknown"
              }`
          );

        } else {

          setError(
            "Something went wrong while saving profile."
          );
        }

      } finally {

        setSaving(
          false
        );
      }
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading profile...
        </p>

      </main>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              STUDENT PROFILE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Manage your academic,
              professional and coding
              profile information.
            </p>

          </div>


          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-900"
          >
            ← Dashboard
          </Link>

        </header>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>

        )}


        {/* PROFILE SUMMARY */}

        <section className="mt-8 grid gap-5 md:grid-cols-3">

          <SummaryCard
            label="Student"
            title={
              fullName ||
              "Student"
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


        {/* ===================================================
            PROFILE COMPLETION
        =================================================== */}

        {completion && (

          <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>

                <p className="text-sm text-zinc-500">
                  Profile Completion
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Build a complete candidate profile
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  Complete the sections below
                  before applying to opportunities.
                </p>

              </div>


              <div className="text-left sm:text-right">

                <p className="text-4xl font-bold">
                  {completion.percentage}%
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  complete
                </p>

              </div>

            </div>


            {/* PROGRESS BAR */}

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${completion.percentage}%`,
                }}
              />

            </div>


            {/* CHECKLIST */}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <CompletionItem
                label="Full name"
                complete={
                  completion.fullNameComplete
                }
                href="#basic-profile"
              />

              <CompletionItem
                label="Contact details"
                complete={
                  completion.contactComplete
                }
                href="#basic-profile"
              />

              <CompletionItem
                label="Academic details"
                complete={
                  completion.academicsComplete
                }
                href="#basic-profile"
              />

              <CompletionItem
                label="College"
                complete={
                  completion.collegeComplete
                }
                href="#basic-profile"
              />

              <CompletionItem
                label="Career details"
                complete={
                  completion.careerComplete
                }
                href="#basic-profile"
              />

              <CompletionItem
                label="Skills"
                complete={
                  completion.skillsComplete
                }
                href="/profile/skills"
              />

              <CompletionItem
                label="Projects"
                complete={
                  completion.projectsComplete
                }
                href="/profile/projects"
              />

              <CompletionItem
                label="Coding profile"
                complete={
                  completion.codingProfilesComplete
                }
                href="/coding-profiles"
              />

            </div>


            {/* MISSING ITEMS */}

            {completion.missingItems.length >
            0 ? (

              <div className="mt-7 rounded-xl border border-amber-900/50 bg-amber-950/20 p-5">

                <p className="font-semibold text-amber-300">

                  {completion.missingItems.length}

                  {completion.missingItems.length === 1
                    ? " thing left to complete"
                    : " things left to complete"}

                </p>


                <div className="mt-3 space-y-2">

                  {completion.missingItems.map(
                    (
                      item,
                      index
                    ) => (

                      <p
                        key={`${item}-${index}`}
                        className="text-sm text-zinc-400"
                      >
                        • {item}
                      </p>

                    )
                  )}

                </div>

              </div>

            ) : (

              <div className="mt-7 rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-5">

                <p className="font-semibold text-emerald-300">
                  ✓ Your student profile is complete
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Your profile contains all
                  required candidate information.
                </p>

              </div>

            )}

          </section>

        )}


        {/* PROFILE SECTIONS */}

        <section className="mt-8">

          <p className="text-sm text-zinc-500">
            Profile Sections
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Build Your Student Profile
          </h2>


          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <ProfileCard
              title="Basic Profile"
              description="Update personal, academic and college details."
              href="#basic-profile"
              action="Edit Profile"
            />

            <ProfileCard
              title="Skills"
              description="Add technical skills and proficiency levels."
              href="/profile/skills"
              action="Manage Skills"
            />

            <ProfileCard
              title="Projects"
              description="Showcase academic and personal projects."
              href="/profile/projects"
              action="Manage Projects"
            />

            <ProfileCard
              title="Experience"
              description="Add internships and professional experience."
              href="/profile/experience"
              action="Manage Experience"
            />

            <ProfileCard
              title="Coding Profiles"
              description="Manage Codeforces, LeetCode and CodeChef."
              href="/coding-profiles"
              action="Coding Accounts"
            />

            <ProfileCard
              title="Leaderboard"
              description="See global, college and batch rankings."
              href="/leaderboard"
              action="View Ranking"
            />

          </div>

        </section>


        {/* BASIC PROFILE */}

        <section
          id="basic-profile"
          className="mt-10 scroll-mt-6"
        >

          <p className="text-sm text-zinc-500">
            Basic Information
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Personal & Academic Details
          </h2>


          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="grid gap-6 md:grid-cols-2">


              <Field label="Full Name">

                <input
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(
                      event.target.value
                    )
                  }
                  placeholder="Your full name"
                  maxLength={150}
                  className={inputClass}
                />

              </Field>


              <Field label="Phone">

                <input
                  type="text"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  placeholder="+91..."
                  maxLength={20}
                  className={inputClass}
                />

              </Field>


              <Field label="Degree">

                <input
                  type="text"
                  value={degree}
                  onChange={(event) =>
                    setDegree(
                      event.target.value
                    )
                  }
                  placeholder="B.Tech"
                  maxLength={100}
                  className={inputClass}
                />

              </Field>


              <Field label="Branch">

                <input
                  type="text"
                  value={branch}
                  onChange={(event) =>
                    setBranch(
                      event.target.value
                    )
                  }
                  placeholder="Computer Science"
                  maxLength={100}
                  className={inputClass}
                />

              </Field>


              <Field label="Graduation Year">

                <input
                  type="number"
                  value={
                    graduationYear
                  }
                  onChange={(event) =>
                    setGraduationYear(
                      event.target.value
                    )
                  }
                  placeholder="2027"
                  min={2000}
                  max={2100}
                  className={inputClass}
                />

              </Field>


              <Field label="City">

                <input
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(
                      event.target.value
                    )
                  }
                  placeholder="Hyderabad"
                  maxLength={100}
                  className={inputClass}
                />

              </Field>


              <div className="md:col-span-2">

                <Field label="Preferred Role">

                  <input
                    type="text"
                    value={
                      preferredRole
                    }
                    onChange={(event) =>
                      setPreferredRole(
                        event.target.value
                      )
                    }
                    placeholder="Java Backend Developer"
                    maxLength={150}
                    className={inputClass}
                  />

                </Field>

              </div>


              {/* COLLEGE */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  College
                </label>


                <div className="relative">

                  <input
                    type="text"
                    value={
                      collegeSearch
                    }
                    onFocus={() =>
                      setShowCollegeResults(
                        true
                      )
                    }
                    onChange={(event) => {

                      setCollegeSearch(
                        event.target.value
                      );

                      setCollegeId(
                        null
                      );

                      setCollegeName("");

                      setShowCollegeResults(
                        true
                      );

                    }}
                    placeholder="Search your college..."
                    className={inputClass}
                  />


                  {showCollegeResults && (

                    <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">

                      {searchingColleges ? (

                        <div className="p-4 text-sm text-zinc-500">
                          Searching colleges...
                        </div>

                      ) : colleges.length === 0 ? (

                        <div className="p-4 text-sm text-zinc-500">
                          No colleges found.
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
                                  selectCollege(
                                    college
                                  )
                                }
                                className="block w-full border-b border-zinc-800 px-4 py-4 text-left transition last:border-b-0 hover:bg-zinc-900"
                              >

                                <p className="font-medium">
                                  {name}
                                </p>


                                {(college.city ||
                                  college.state) && (

                                  <p className="mt-1 text-xs text-zinc-500">

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


                {collegeId ? (

                  <div className="mt-3 flex flex-col gap-3 rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-xs font-medium text-emerald-500">
                        SELECTED COLLEGE
                      </p>

                      <p className="mt-1 font-semibold text-emerald-300">
                        {collegeName}
                      </p>

                    </div>


                    <button
                      type="button"
                      onClick={
                        clearCollege
                      }
                      className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-900"
                    >
                      Change
                    </button>

                  </div>

                ) : (

                  <p className="mt-2 text-xs text-amber-400">
                    Search and select your
                    college from the list.
                  </p>

                )}

              </div>


              <div className="md:col-span-2">

                <Field label="Bio">

                  <textarea
                    value={bio}
                    onChange={(event) =>
                      setBio(
                        event.target.value
                      )
                    }
                    rows={5}
                    placeholder="Tell employers about yourself..."
                    className={`${inputClass} resize-none`}
                  />

                </Field>

              </div>

            </div>


            {/* SAVE */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

              {saving && (

                <p className="text-sm text-zinc-400">
                  Saving profile...
                </p>

              )}


              <button
                type="button"
                onClick={
                  saveProfile
                }
                disabled={
                  saving
                }
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving
                  ? "Saving..."
                  : "Save Profile"}

              </button>

            </div>

          </div>

        </section>


        {/* NEXT */}

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Ready for Opportunities?
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Continue building your profile
              </h2>

              <p className="mt-2 text-sm text-zinc-400">

                {completion?.percentage ===
                100
                  ? "Your required student profile sections are complete."
                  : "Complete your required profile sections before applying."}

              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <Link
                href="/opportunities"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                View Opportunities
              </Link>

              <Link
                href="/coding-profiles"
                className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm hover:bg-zinc-800"
              >
                Coding Profiles
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


// =========================================================
// COMPLETION ITEM
// =========================================================

function CompletionItem({
  label,
  complete,
  href,
}: {
  label: string;

  complete: boolean;

  href: string;
}) {

  return (
    <Link
      href={href}
      className={
        complete
          ? "flex items-center justify-between rounded-xl border border-emerald-900/50 bg-emerald-950/20 px-4 py-3 transition hover:bg-emerald-950/30"
          : "flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 transition hover:border-zinc-700"
      }
    >

      <div className="flex items-center gap-3">

        <span
          className={
            complete
              ? "flex h-7 w-7 items-center justify-center rounded-full bg-emerald-950 text-sm font-bold text-emerald-400"
              : "flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-zinc-500"
          }
        >
          {complete
            ? "✓"
            : "!"}
        </span>


        <span
          className={
            complete
              ? "text-sm font-medium text-emerald-300"
              : "text-sm font-medium text-zinc-300"
          }
        >
          {label}
        </span>

      </div>


      {!complete && (

        <span className="text-xs text-zinc-500">
          Complete →
        </span>

      )}

    </Link>
  );
}


// =========================================================
// SUMMARY
// =========================================================

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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        {description}
      </p>

    </div>
  );
}


// =========================================================
// PROFILE CARD
// =========================================================

function ProfileCard({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700"
    >

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-zinc-500">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-sm font-medium text-zinc-300">
          {action}
        </span>

        <span className="transition group-hover:translate-x-1">
          →
        </span>

      </div>

    </Link>
  );
}


// =========================================================
// FIELD
// =========================================================

function Field({
  label,
  children,
}: {
  label: string;

  children:
    React.ReactNode;
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      {children}

    </div>
  );
}


// =========================================================
// STYLE
// =========================================================

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500";