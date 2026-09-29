"use client";

import type {
  ChangeEvent,
} from "react";

import {
  FileCheck2,
  FileText,
  LoaderCircle,
  UploadCloud,
} from "lucide-react";

import {
  formatFileSize,
} from "@/utils/applicationUtils";

interface ResumeUploadSectionProps {
  applicationId:
    string;

  selectedFile:
    File | null;

  uploading:
    boolean;

  onFileChange:
    (
      applicationId: string,
      event: ChangeEvent<HTMLInputElement>
    ) => void;

  onUpload:
    (
      applicationId: string
    ) => void;
}

export default function ResumeUploadSection({
  applicationId,
  selectedFile,
  uploading,
  onFileChange,
  onUpload,
}: ResumeUploadSectionProps) {
  return (
    <section
      className="
        rounded-xl
        border
        border-amber-200
        bg-amber-50/50
        p-4

        sm:p-5
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
            rounded-lg
            bg-amber-100
            text-amber-700
          "
        >
          <FileText size={16} />
        </div>

        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-amber-700
            "
          >
            Action required
          </p>

          <h3
            className="
              mt-1
              text-sm
              font-bold
              text-slate-900
            "
          >
            Resume requested
          </h3>

          <p
            className="
              mt-1
              max-w-xl
              text-xs
              leading-5
              text-slate-600
            "
          >
            You have been shortlisted. Upload a PDF
            resume tailored for this opportunity.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label
          className="
            block
            cursor-pointer
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-white
            p-4
            transition

            hover:border-[#1256AF]
            hover:bg-blue-50/30
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex
                items-center
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
                  rounded-lg
                  bg-slate-100
                  text-slate-600
                "
              >
                <UploadCloud
                  size={16}
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  Choose resume
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-slate-500
                  "
                >
                  PDF only · Maximum 5 MB
                </p>
              </div>
            </div>

            <span
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3.5
                py-2
                text-xs
                font-bold
                text-slate-700
                transition

                hover:border-blue-200
                hover:text-[#1256AF]
              "
            >
              Select PDF
            </span>
          </div>

          <input
            type="file"
            accept=".pdf,application/pdf"
            disabled={uploading}
            onChange={(event) =>
              onFileChange(
                applicationId,
                event
              )
            }
            className="sr-only"
          />
        </label>
      </div>

      {selectedFile && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-emerald-200
            bg-emerald-50
            p-3
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-emerald-100
              text-emerald-600
            "
          >
            <FileCheck2
              size={15}
            />
          </div>

          <div className="min-w-0">
            <p
              title={selectedFile.name}
              className="
                truncate
                text-xs
                font-bold
                text-emerald-800
              "
            >
              {selectedFile.name}
            </p>

            <p
              className="
                mt-0.5
                text-[11px]
                text-emerald-700
              "
            >
              {formatFileSize(
                selectedFile.size
              )}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        disabled={
          !selectedFile ||
          uploading
        }
        onClick={() =>
          onUpload(
            applicationId
          )
        }
        className="
          mt-4
          inline-flex
          min-h-[44px]
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#1256AF]
          px-4
          text-sm
          font-bold
          text-white
          transition

          hover:bg-[#0E4C9D]

          disabled:cursor-not-allowed
          disabled:bg-slate-200
          disabled:text-slate-400
        "
      >
        {uploading ? (
          <>
            <LoaderCircle
              size={15}
              className="animate-spin"
            />

            Uploading...
          </>
        ) : (
          <>
            <UploadCloud
              size={15}
            />

            Upload Resume
          </>
        )}
      </button>
    </section>
  );
}