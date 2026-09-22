"use client";

import axios from "axios";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

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
  ] = useState<string | null>(
    null
  );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

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
  ] =
    useState<OpportunityFormData>({
      ...initialOpportunityFormData,
    });

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    const loadPage =
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

        // UPDATE

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

        // CREATE

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
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">
          Loading opportunities...
        </p>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <OpportunitiesHeader
          onCreate={
            openCreateForm
          }
        />

        {error && (
          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>
        )}

        {showForm && (
          <OpportunityForm
            formData={formData}
            setFormData={
              setFormData
            }
            editing={
              Boolean(
                editingId
              )
            }
            saving={saving}
            onSubmit={
              handleSubmit
            }
            onCancel={
              closeForm
            }
          />
        )}

        <OpportunitySummary
          opportunities={
            opportunities
          }
        />

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
    </main>
  );
}