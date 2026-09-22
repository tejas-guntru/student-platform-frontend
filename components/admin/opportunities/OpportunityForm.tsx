import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

import type {
  OpportunityStatus,
  OpportunityType,
  WorkMode,
} from "@/types/opportunity";

import type {
  OpportunityFormData,
} from "@/utils/adminOpportunityUtils";

interface OpportunityFormProps {
  formData: OpportunityFormData;

  setFormData: Dispatch<
    SetStateAction<OpportunityFormData>
  >;

  editing: boolean;

  saving: boolean;

  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  onCancel: () => void;
}

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500";

export default function OpportunityForm({
  formData,
  setFormData,
  editing,
  saving,
  onSubmit,
  onCancel,
}: OpportunityFormProps) {
  const updateField = <
    K extends keyof OpportunityFormData,
  >(
    field: K,
    value: OpportunityFormData[K]
  ) => {
    setFormData(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {editing
              ? "Edit Opportunity"
              : "Create Opportunity"}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {editing
              ? "Update the opportunity details below."
              : "Add a new job or internship."}
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <Field label="Job Title">
          <input
            type="text"
            value={formData.title}
            onChange={(event) =>
              updateField(
                "title",
                event.target.value
              )
            }
            placeholder="Java Backend Developer Intern"
            className={inputClass}
          />
        </Field>

        <Field label="Company">
          <input
            type="text"
            value={
              formData.companyName
            }
            onChange={(event) =>
              updateField(
                "companyName",
                event.target.value
              )
            }
            placeholder="Demo Technologies"
            className={inputClass}
          />
        </Field>

        <Field label="Opportunity Type">
          <select
            value={
              formData.opportunityType
            }
            onChange={(event) =>
              updateField(
                "opportunityType",
                event.target
                  .value as OpportunityType
              )
            }
            className={inputClass}
          >
            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="JOB">
              Job
            </option>
          </select>
        </Field>

        <Field label="Work Mode">
          <select
            value={
              formData.workMode
            }
            onChange={(event) =>
              updateField(
                "workMode",
                event.target
                  .value as WorkMode
              )
            }
            className={inputClass}
          >
            <option value="ONSITE">
              Onsite
            </option>

            <option value="HYBRID">
              Hybrid
            </option>

            <option value="REMOTE">
              Remote
            </option>
          </select>
        </Field>

        <Field label="Location">
          <input
            type="text"
            value={
              formData.location
            }
            onChange={(event) =>
              updateField(
                "location",
                event.target.value
              )
            }
            placeholder="Hyderabad"
            className={inputClass}
          />
        </Field>

        <Field label="Status">
          <select
            value={
              formData.status
            }
            onChange={(event) =>
              updateField(
                "status",
                event.target
                  .value as OpportunityStatus
              )
            }
            className={inputClass}
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="DRAFT">
              Draft
            </option>

            {editing &&
              formData.status ===
                "CLOSED" && (
                <option value="CLOSED">
                  Closed
                </option>
              )}
          </select>
        </Field>

        <Field label="Minimum Graduation Year">
          <input
            type="number"
            min="2020"
            max="2040"
            value={
              formData.minGraduationYear
            }
            onChange={(event) =>
              updateField(
                "minGraduationYear",
                event.target.value
              )
            }
            placeholder="2027"
            className={inputClass}
          />
        </Field>

        <Field label="Maximum Graduation Year">
          <input
            type="number"
            min="2020"
            max="2040"
            value={
              formData.maxGraduationYear
            }
            onChange={(event) =>
              updateField(
                "maxGraduationYear",
                event.target.value
              )
            }
            placeholder="2027"
            className={inputClass}
          />
        </Field>

        <Field label="Application Deadline">
          <input
            type="datetime-local"
            value={
              formData.deadline
            }
            onChange={(event) =>
              updateField(
                "deadline",
                event.target.value
              )
            }
            className={inputClass}
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Description">
            <textarea
              value={
                formData.description
              }
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              rows={6}
              placeholder="Describe the role..."
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Eligibility">
            <textarea
              value={
                formData.eligibility
              }
              onChange={(event) =>
                updateField(
                  "eligibility",
                  event.target.value
                )
              }
              rows={4}
              placeholder="B.Tech students graduating in 2027"
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : editing
              ? "Save Changes"
              : "Create Opportunity"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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