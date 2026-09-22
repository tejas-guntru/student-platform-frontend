import type {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
} from "react";

import {
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  FileText,
  GraduationCap,
  LoaderCircle,
  MapPin,
  Plus,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";

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

const inputClass = `
  w-full
  rounded-xl
  border
  border-[#D6E7F3]
  bg-white
  px-4
  py-3
  text-sm
  text-[#173B63]
  outline-none
  transition-all
  duration-200

  placeholder:text-[#9AAEBD]

  hover:border-[#BDDDF2]

  focus:border-[#1689F5]
  focus:ring-4
  focus:ring-[#1689F5]/10
`;

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
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#DCEAF5]
        bg-white
        shadow-[0_16px_45px_rgba(8,119,232,0.07)]
      "
    >
      {/* =====================================================
          TOP ACCENT
      ===================================================== */}

      <div
        className="
          h-1
          w-full
          bg-gradient-to-r
          from-[#0877E8]
          via-[#1294F2]
          to-[#38BDF8]
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-5
          border-b
          border-[#E3EEF6]
          bg-[#FBFDFF]
          px-6
          py-6

          sm:flex-row
          sm:items-center
          sm:justify-between

          sm:px-8
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#EAF6FF]
              text-[#0877E8]
            "
          >
            {editing ? (
              <Save size={21} />
            ) : (
              <Plus size={22} />
            )}
          </div>

          <div>
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-[#0877E8]
              "
            >
              {editing
                ? "Edit Listing"
                : "New Listing"}
            </p>

            <h2
              className="
                mt-1.5
                text-2xl
                font-bold
                tracking-[-0.035em]
                text-[#173B63]
              "
            >
              {editing
                ? "Edit Opportunity"
                : "Create Opportunity"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#7D92A4]
              "
            >
              {editing
                ? "Update the opportunity details below."
                : "Publish a new internship or job opportunity for students."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-xl
            border
            border-[#D8E8F4]
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#607A90]
            transition-all
            duration-200

            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600

            sm:self-auto
          "
        >
          <X size={15} />

          Cancel
        </button>
      </div>

      {/* =====================================================
          FORM CONTENT
      ===================================================== */}

      <div
        className="
          space-y-7
          px-6
          py-7

          sm:px-8
          sm:py-8
        "
      >
        {/* ===================================================
            BASIC INFORMATION
        =================================================== */}

        <FormSection
          icon={BriefcaseBusiness}
          title="Opportunity details"
          description="Add the main information students will see."
        >
          <div
            className="
              grid
              gap-5

              md:grid-cols-2
            "
          >
            <Field
              label="Job Title"
              required
              icon={BriefcaseBusiness}
            >
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

            <Field
              label="Company"
              required
              icon={Building2}
            >
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

            <Field
              label="Opportunity Type"
              icon={BriefcaseBusiness}
            >
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

            <Field
              label="Work Mode"
              icon={MapPin}
            >
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

            <Field
              label="Location"
              icon={MapPin}
            >
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

            <Field
              label="Status"
              icon={ShieldCheck}
            >
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
          </div>
        </FormSection>

        {/* ===================================================
            ELIGIBILITY & DEADLINE
        =================================================== */}

        <FormSection
          icon={GraduationCap}
          title="Eligibility & timeline"
          description="Define the graduation-year range and application deadline."
        >
          <div
            className="
              grid
              gap-5

              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            <Field
              label="Minimum Graduation Year"
              icon={GraduationCap}
            >
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

            <Field
              label="Maximum Graduation Year"
              icon={GraduationCap}
            >
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

            <Field
              label="Application Deadline"
              icon={CalendarClock}
            >
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
          </div>

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-[#DCEAF5]
              bg-[#F7FBFF]
              px-4
              py-3
            "
          >
            <p
              className="
                text-xs
                leading-5
                text-[#72899C]
              "
            >
              Graduation-year limits are optional. Leave them
              blank if the opportunity is open to students from
              any graduating batch.
            </p>
          </div>
        </FormSection>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <FormSection
          icon={FileText}
          title="Role information"
          description="Explain the role and who should apply."
        >
          <div className="space-y-5">
            <Field
              label="Description"
              required
              icon={FileText}
            >
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
                rows={7}
                placeholder="Describe the role, responsibilities, required skills and what the student will work on..."
                className={`
                  ${inputClass}
                  resize-y
                `}
              />
            </Field>

            <Field
              label="Eligibility"
              icon={GraduationCap}
            >
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
                placeholder="Example: B.Tech students graduating in 2027 with Java and Spring Boot knowledge."
                className={`
                  ${inputClass}
                  resize-y
                `}
              />
            </Field>
          </div>
        </FormSection>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-[#E3EEF6]
          bg-[#FBFDFF]
          px-6
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between

          sm:px-8
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            text-[#8599AA]
          "
        >
          <ShieldCheck
            size={14}
            className="text-[#0877E8]"
          />

          <span>
            Fields marked with{" "}
            <span className="font-semibold text-red-500">
              *
            </span>{" "}
            are required.
          </span>
        </div>

        <div
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
          "
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8E8F4]
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#607A90]
              transition-all

              hover:bg-[#F5FAFE]
              hover:text-[#173B63]

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={15} />

            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="
              inline-flex
              min-w-[170px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#0877E8]
              to-[#1294F2]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_25px_rgba(8,119,232,0.20)]
              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-[0_14px_30px_rgba(8,119,232,0.28)]

              disabled:cursor-not-allowed
              disabled:translate-y-0
              disabled:opacity-60
            "
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />

                Saving...
              </>
            ) : editing ? (
              <>
                <Save size={16} />

                Save Changes
              </>
            ) : (
              <>
                <Plus size={16} />

                Create Opportunity
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

// =========================================================
// FORM SECTION
// =========================================================

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className="
        rounded-[22px]
        border
        border-[#E0ECF5]
        bg-[#FCFEFF]
        p-5

        sm:p-6
      "
    >
      <div
        className="
          mb-5
          flex
          items-start
          gap-3
          border-b
          border-[#E7F0F7]
          pb-4
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
          <Icon size={17} />
        </div>

        <div>
          <h3
            className="
              text-sm
              font-bold
              text-[#274E70]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-[#869AAB]
            "
          >
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

// =========================================================
// FIELD
// =========================================================

function Field({
  label,
  children,
  required = false,
  icon: Icon,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-xs
          font-semibold
          text-[#4E6F88]
        "
      >
        {Icon && (
          <Icon
            size={13}
            className="text-[#87B9D9]"
          />
        )}

        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}