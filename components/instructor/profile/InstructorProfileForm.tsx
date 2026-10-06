"use client";

import {
  Save,
} from "lucide-react";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import type {
  InstructorProfileResponse,
  UpdateInstructorProfileRequest,
} from "@/types/instructorProfile";

interface InstructorProfileFormProps {
  profile: InstructorProfileResponse;
  saving: boolean;
  onSave: (
    request: UpdateInstructorProfileRequest
  ) => Promise<void>;
}

interface FormState {
  fullName: string;
  phone: string;
  organization: string;
  designation: string;
  bio: string;
}

function createFormState(
  profile: InstructorProfileResponse
): FormState {
  return {
    fullName:
      profile.fullName ?? "",
    phone:
      profile.phone ?? "",
    organization:
      profile.organization ?? "",
    designation:
      profile.designation ?? "",
    bio:
      profile.bio ?? "",
  };
}

function optionalValue(
  value: string
): string | null {
  const trimmed =
    value.trim();

  return trimmed.length > 0
    ? trimmed
    : null;
}

export default function InstructorProfileForm({
  profile,
  saving,
  onSave,
}: InstructorProfileFormProps) {
  const [
    form,
    setForm,
  ] = useState<FormState>(
    createFormState(profile)
  );

  useEffect(() => {
    setForm(
      createFormState(profile)
    );
  }, [profile]);

  function updateField(
    field: keyof FormState,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const fullName =
      form.fullName.trim();

    if (!fullName) {
      return;
    }

    await onSave({
      fullName,
      phone:
        optionalValue(form.phone),
      organization:
        optionalValue(
          form.organization
        ),
      designation:
        optionalValue(
          form.designation
        ),
      bio:
        optionalValue(form.bio),
    });
  }

  const hasName =
    form.fullName.trim().length > 0;

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      <div>
        <p
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#1256AF]
          "
        >
          Edit Profile
        </p>

        <h2
          className="
            mt-1
            text-lg
            font-bold
            text-slate-950
          "
        >
          Professional details
        </h2>

        <p
          className="
            mt-1
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          Keep your instructor information
          accurate and up to date.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >
        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
          "
        >
          <Field
            label="Full name"
            required
          >
            <input
              type="text"
              value={form.fullName}
              onChange={(event) =>
                updateField(
                  "fullName",
                  event.target.value
                )
              }
              maxLength={150}
              required
              className={inputClassName}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Phone">
            <input
              type="tel"
              value={form.phone}
              onChange={(event) =>
                updateField(
                  "phone",
                  event.target.value
                )
              }
              maxLength={20}
              className={inputClassName}
              placeholder="Phone number"
            />
          </Field>

          <Field label="Organization">
            <input
              type="text"
              value={
                form.organization
              }
              onChange={(event) =>
                updateField(
                  "organization",
                  event.target.value
                )
              }
              maxLength={255}
              className={inputClassName}
              placeholder="College, company or institution"
            />
          </Field>

          <Field label="Designation">
            <input
              type="text"
              value={
                form.designation
              }
              onChange={(event) =>
                updateField(
                  "designation",
                  event.target.value
                )
              }
              maxLength={150}
              className={inputClassName}
              placeholder="e.g. Software Instructor"
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Bio">
            <textarea
              value={form.bio}
              onChange={(event) =>
                updateField(
                  "bio",
                  event.target.value
                )
              }
              maxLength={5000}
              rows={6}
              className={`
                ${inputClassName}
                resize-y
              `}
              placeholder="Tell students a little about your teaching experience and areas of focus."
            />

            <div
              className="
                mt-1.5
                text-right
                text-[11px]
                text-slate-400
              "
            >
              {form.bio.length}/5000
            </div>
          </Field>
        </div>

        <div
          className="
            mt-6
            flex
            justify-end
            border-t
            border-slate-100
            pt-5
          "
        >
          <button
            type="submit"
            disabled={
              saving ||
              !hasName
            }
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#1256AF]
              px-5
              text-sm
              font-bold
              text-white
              transition-colors
              hover:bg-[#0f4892]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Save size={16} />

            {saving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({
  label,
  required = false,
  children,
}: FieldProps) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-slate-700
        "
      >
        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

const inputClassName = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-3.5
  py-2.5
  text-sm
  text-slate-900
  outline-none
  transition
  placeholder:text-slate-400
  focus:border-[#1256AF]
  focus:ring-4
  focus:ring-blue-50
`;