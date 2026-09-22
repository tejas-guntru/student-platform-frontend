"use client";

import axios from "axios";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import {
  closeAdminOpportunity,
  createAdminOpportunity,
  getAdminOpportunities,
  updateAdminOpportunity,
} from "@/services/adminService";

import type {
  CreateOpportunityRequest,
  Opportunity,
  UpdateOpportunityRequest,
} from "@/types/opportunity";

import {
  getOpportunityId,
  initialOpportunityFormData,
  toDateTimeLocal,
  type OpportunityFormData,
} from "@/utils/adminOpportunityUtils";

import OpportunitiesHeader from "@/components/admin/opportunities/OpportunitiesHeader";
import OpportunityForm from "@/components/admin/opportunities/OpportunityForm";
import OpportunitySummary from "@/components/admin/opportunities/OpportunitySummary";
import OpportunitiesList from "@/components/admin/opportunities/OpportunitiesList";

export default function AdminOpportunitiesPage() {
  const [
    opportunities,
    setOpportunities,
  ] = useState<Opportunity[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    closingId,
    setClosingId,
  ] = useState<string | null>(null);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(null);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    formData,
    setFormData,
  ] = useState<OpportunityFormData>({
    ...initialOpportunityFormData,
  });

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    const loadPage = async () => {
      const token =
        localStorage.getItem("token");

      const role =
        localStorage.getItem("role");

      if (
        !token ||
        role !== "ADMIN"
      ) {
        window.location.href =
          "/login";

        return;
      }

      await loadOpportunities();
    };

    loadPage();
  }, []);

  // =========================================================
  // LOAD
  // =========================================================

  const loadOpportunities =
    async () => {
      try {
        const response =
          await getAdminOpportunities();

        setOpportunities(
          Array.isArray(response)
            ? response
            : []
        );
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to load opportunities."
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================================
  // ERROR
  // =========================================================

  const handleError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(
        error
      )
    ) {
      if (
        error.response
          ?.status === 401 ||
        error.response
          ?.status === 403
      ) {
        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }

      setError(
        error.response?.data
          ?.message ||
          fallback
      );

      return;
    }

    setError(fallback);
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      ...initialOpportunityFormData,
    });
  };

  // =========================================================
  // CREATE BUTTON
  // =========================================================

  const openCreateForm = () => {
    setError("");
    setSuccess("");

    resetForm();

    setEditingId(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // EDIT BUTTON
  // =========================================================

  const openEditForm = (
    opportunity: Opportunity
  ) => {
    const id =
      getOpportunityId(
        opportunity
      );

    if (!id) {
      setError(
        "Opportunity ID is missing."
      );

      return;
    }

    setError("");
    setSuccess("");

    setEditingId(id);

    setFormData({
      title:
        opportunity.title,

      companyName:
        opportunity.companyName,

      opportunityType:
        opportunity.opportunityType,

      workMode:
        opportunity.workMode,

      location:
        opportunity.location ||
        "",

      description:
        opportunity.description,

      eligibility:
        opportunity.eligibility ||
        "",

      minGraduationYear:
        opportunity.minGraduationYear
          ? String(
              opportunity.minGraduationYear
            )
          : "",

      maxGraduationYear:
        opportunity.maxGraduationYear
          ? String(
              opportunity.maxGraduationYear
            )
          : "",

      deadline:
        toDateTimeLocal(
          opportunity.applicationDeadline
        ),

      status:
        opportunity.status,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    resetForm();

    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // =========================================================
  // SUBMIT CREATE / UPDATE
  // =========================================================

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      if (
        !formData.title.trim() ||
        !formData.companyName.trim() ||
        !formData.description.trim()
      ) {
        setError(
          "Title, company and description are required."
        );

        return;
      }

      if (
        formData.minGraduationYear &&
        formData.maxGraduationYear &&
        Number(
          formData.minGraduationYear
        ) >
          Number(
            formData.maxGraduationYear
          )
      ) {
        setError(
          "Minimum graduation year cannot be greater than maximum graduation year."
        );

        return;
      }

      setSaving(true);

      try {
        const request = {
          title:
            formData.title.trim(),

          companyName:
            formData.companyName.trim(),

          opportunityType:
            formData.opportunityType,

          workMode:
            formData.workMode,

          location:
            formData.location.trim() ||
            null,

          description:
            formData.description.trim(),

          eligibility:
            formData.eligibility.trim() ||
            null,

          minGraduationYear:
            formData.minGraduationYear
              ? Number(
                  formData.minGraduationYear
                )
              : null,

          maxGraduationYear:
            formData.maxGraduationYear
              ? Number(
                  formData.maxGraduationYear
                )
              : null,

          applicationDeadline:
            formData.deadline
              ? new Date(
                  formData.deadline
                ).toISOString()
              : null,

          status:
            formData.status,
        };

        // =====================================================
        // UPDATE
        // =====================================================

        if (editingId) {
          const updated =
            await updateAdminOpportunity(
              editingId,
              request as UpdateOpportunityRequest
            );

          setOpportunities(
            (current) =>
              current.map(
                (opportunity) => {
                  const id =
                    getOpportunityId(
                      opportunity
                    );

                  return id ===
                    editingId
                    ? updated
                    : opportunity;
                }
              )
          );

          setSuccess(
            `${updated.title} updated successfully.`
          );
        }

        // =====================================================
        // CREATE
        // =====================================================

        else {
          const created =
            await createAdminOpportunity(
              request as CreateOpportunityRequest
            );

          setOpportunities(
            (current) => [
              created,
              ...current,
            ]
          );

          setSuccess(
            `${created.title} created successfully.`
          );
        }

        resetForm();

        setEditingId(null);
        setShowForm(false);

        await loadOpportunities();
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          editingId
            ? "Unable to update opportunity."
            : "Unable to create opportunity."
        );
      } finally {
        setSaving(false);
      }
    };

  // =========================================================
  // CLOSE OPPORTUNITY
  // =========================================================

  const handleCloseOpportunity =
    async (
      opportunity: Opportunity
    ) => {
      const id =
        getOpportunityId(
          opportunity
        );

      if (!id) {
        setError(
          "Opportunity ID is missing."
        );

        return;
      }

      if (
        opportunity.status ===
        "CLOSED"
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Close "${opportunity.title}"?\n\nStudents will no longer be able to apply.`
        );

      if (!confirmed) {
        return;
      }

      setError("");
      setSuccess("");

      setClosingId(id);

      try {
        const closed =
          await closeAdminOpportunity(
            id
          );

        setOpportunities(
          (current) =>
            current.map(
              (item) => {
                const itemId =
                  getOpportunityId(
                    item
                  );

                return itemId === id
                  ? closed
                  : item;
              }
            )
        );

        setSuccess(
          `${opportunity.title} closed successfully.`
        );

        await loadOpportunities();
      } catch (
        error: unknown
      ) {
        handleError(
          error,
          "Unable to close opportunity."
        );
      } finally {
        setClosingId(null);
      }
    };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          overflow-hidden
          bg-[#F4F9FF]
        "
      >
        {/* GLOWS */}

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-10
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#38BDF8]/15
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            bottom-10
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#0877E8]/12
            blur-[130px]
          "
        />

        {/* LOADER */}

        <div
          className="
            relative
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#0877E8]
              to-[#38BDF8]
              text-white
              shadow-[0_14px_35px_rgba(8,119,232,0.25)]
            "
          >
            <LoaderCircle
              size={25}
              className="animate-spin"
            />
          </div>

          <p
            className="
              mt-5
              font-semibold
              text-[#173B63]
            "
          >
            Loading opportunities
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8095A8]
            "
          >
            Preparing opportunity management...
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // COUNTS
  // =========================================================

  const activeCount =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "ACTIVE"
    ).length;

  const closedCount =
    opportunities.filter(
      (opportunity) =>
        opportunity.status ===
        "CLOSED"
    ).length;

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F4F9FF]
        text-[#173B63]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-24
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#38BDF8]/10
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-56
          top-[500px]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#0877E8]/8
          blur-[150px]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(8,119,232,0.04) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          py-6

          sm:px-6

          lg:px-8
          lg:py-8
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <OpportunitiesHeader
          onCreate={
            openCreateForm
          }
        />

        {/* ===================================================
            PAGE HERO
        =================================================== */}

        <section
          className="
            relative
            mt-6
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[#0877E8]
            via-[#1294F2]
            to-[#38BDF8]
            px-6
            py-7
            text-white
            shadow-[0_22px_60px_rgba(8,119,232,0.18)]

            sm:px-8
            sm:py-9
          "
        >
          {/* glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-72
              w-72
              rounded-full
              bg-white/18
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-28
              left-[30%]
              h-72
              w-72
              rounded-full
              bg-[#C9F0FF]/20
              blur-[90px]
            "
          />

          {/* grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.14]
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.2) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-7

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}

            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-3.5
                  py-2
                  backdrop-blur-xl
                "
              >
                <BriefcaseBusiness
                  size={14}
                />

                <span
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white/80
                  "
                >
                  Opportunity Management
                </span>
              </div>

              <h1
                className="
                  mt-5
                  text-3xl
                  font-bold
                  tracking-[-0.04em]

                  sm:text-4xl
                "
              >
                Jobs & Internships
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/75

                  sm:text-base
                "
              >
                Create, update and manage opportunities
                available to students across the
                Trailbliz platform.
              </p>
            </div>

            {/* RIGHT */}

            <div
              className="
                grid
                w-full
                grid-cols-3
                gap-3

                lg:max-w-lg
              "
            >
              <HeroMetric
                label="Total"
                value={
                  opportunities.length
                }
              />

              <HeroMetric
                label="Active"
                value={
                  activeCount
                }
              />

              <HeroMetric
                label="Closed"
                value={
                  closedCount
                }
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-700
              shadow-[0_8px_24px_rgba(239,68,68,0.05)]
            "
          >
            <AlertCircle
              size={18}
              className="
                mt-0.5
                shrink-0
              "
            />

            <div>
              <p className="font-semibold">
                Something needs attention
              </p>

              <p className="mt-1">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {success && (
          <div
            className="
              mt-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-emerald-200
              bg-emerald-50
              px-5
              py-4
              text-sm
              text-emerald-700
              shadow-[0_8px_24px_rgba(16,185,129,0.05)]
            "
          >
            <CheckCircle2
              size={18}
              className="
                mt-0.5
                shrink-0
              "
            />

            <div>
              <p className="font-semibold">
                Success
              </p>

              <p className="mt-1">
                {success}
              </p>
            </div>
          </div>
        )}

        {/* ===================================================
            CREATE / EDIT FORM
        =================================================== */}

        {showForm && (
          <div className="mt-7">
            <OpportunityForm
              formData={
                formData
              }
              setFormData={
                setFormData
              }
              editing={
                Boolean(
                  editingId
                )
              }
              saving={
                saving
              }
              onSubmit={
                handleSubmit
              }
              onCancel={
                closeForm
              }
            />
          </div>
        )}

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <div className="mt-8">
          <OpportunitySummary
            opportunities={
              opportunities
            }
          />
        </div>

        {/* ===================================================
            OPPORTUNITY LIST
        =================================================== */}

        <div className="mt-8">
          <OpportunitiesList
            opportunities={
              opportunities
            }
            closingId={
              closingId
            }
            onEdit={
              openEditForm
            }
            onClose={
              handleCloseOpportunity
            }
          />
        </div>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <footer
          className="
            mt-12
            border-t
            border-[#DCEAF5]
            py-6
            text-center
          "
        >
          <p
            className="
              text-xs
              text-[#8298AB]
            "
          >
            Trailbliz Administration
            <span
              className="
                mx-2
                text-[#C1D4E2]
              "
            >
              •
            </span>
            Opportunity Management
          </p>
        </footer>
      </div>
    </main>
  );
}

// =========================================================
// HERO METRIC
// =========================================================

function HeroMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-white/15
        bg-white/10
        px-3
        py-4
        text-center
        backdrop-blur-xl

        sm:px-4
      "
    >
      <p
        className="
          text-2xl
          font-bold
          tracking-[-0.04em]
          text-white

          sm:text-3xl
        "
      >
        {value}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          font-bold
          uppercase
          tracking-[0.13em]
          text-white/60
        "
      >
        {label}
      </p>
    </div>
  );
}