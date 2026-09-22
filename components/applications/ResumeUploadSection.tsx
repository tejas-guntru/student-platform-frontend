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
      applicationId:
        string,
      event:
        ChangeEvent<HTMLInputElement>
    ) => void;

  onUpload:
    (
      applicationId:
        string
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
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-amber-200
        bg-white
        p-5
        shadow-[0_8px_24px_rgba(245,158,11,0.04)]
      "
    >
      {/* ACCENT */}

      <div
        className="
          absolute
          bottom-0
          left-0
          top-0
          w-[3px]
          bg-amber-400
        "
      />

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
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-amber-50
            text-amber-600
          "
        >
          <FileText size={17} />
        </div>

        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-amber-600
            "
          >
            Action Required
          </p>

          <h3
            className="
              mt-1
              text-base
              font-bold
              text-[#173B63]
            "
          >
            Resume requested
          </h3>

          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-[#71899D]
            "
          >
            You have been shortlisted. Upload a PDF resume
            tailored for this opportunity.
          </p>
        </div>
      </div>

      {/* FILE INPUT */}

      <div className="mt-5">
        <label
          className="
            block
            rounded-[16px]
            border
            border-dashed
            border-[#C8DEED]
            bg-[#F8FCFF]
            p-4
            transition-all
            duration-200

            hover:border-[#9FD2F1]
            hover:bg-[#F3FAFF]
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
                  rounded-xl
                  bg-[#EAF6FF]
                  text-[#0877E8]
                "
              >
                <UploadCloud size={16} />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-bold
                    text-[#355E7A]
                  "
                >
                  Choose resume
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-[#8AA0B2]
                  "
                >
                  PDF files only
                </p>
              </div>
            </div>

            <span
              className="
                inline-flex
                w-fit
                items-center
                justify-center
                rounded-xl
                bg-[#0877E8]
                px-3.5
                py-2
                text-xs
                font-bold
                text-white
                shadow-[0_6px_16px_rgba(8,119,232,0.16)]
              "
            >
              Select PDF
            </span>
          </div>

          <input
            type="file"
            accept=".pdf,application/pdf"
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

      {/* SELECTED FILE */}

      {selectedFile && (
        <div
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-[16px]
            border
            border-emerald-200
            bg-emerald-50/60
            p-4
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
            <FileCheck2 size={16} />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-bold
                text-emerald-800
              "
              title={selectedFile.name}
            >
              {selectedFile.name}
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-emerald-700/75
              "
            >
              {formatFileSize(
                selectedFile.size
              )}
            </p>
          </div>
        </div>
      )}

      {/* UPLOAD */}

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
          mt-5
          inline-flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[#0877E8]
          to-[#1294F2]
          px-5
          py-3
          text-sm
          font-bold
          text-white
          shadow-[0_9px_22px_rgba(8,119,232,0.18)]
          transition-all
          duration-200

          hover:-translate-y-0.5
          hover:shadow-[0_13px_28px_rgba(8,119,232,0.24)]

          disabled:cursor-not-allowed
          disabled:opacity-50
          disabled:hover:translate-y-0
        "
      >
        {uploading ? (
          <>
            <LoaderCircle
              size={16}
              className="animate-spin"
            />

            Uploading...
          </>
        ) : (
          <>
            <UploadCloud size={16} />

            Upload Resume
          </>
        )}
      </button>
    </section>
  );
}