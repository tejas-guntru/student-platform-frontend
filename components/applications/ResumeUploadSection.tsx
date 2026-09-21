"use client";

import type {
  ChangeEvent,
} from "react";

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
    <div className="mt-8 rounded-[18px] border border-[#E8DCA9] bg-[#FBF7E8] p-5">
      <h3 className="font-bold text-[#806E30]">
        Resume requested
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#6B707B]">
        You have been shortlisted.
        Upload a PDF resume tailored
        for this opportunity.
      </p>

      <div className="mt-5">
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(event) =>
            onFileChange(
              applicationId,
              event
            )
          }
          className="
            block
            w-full
            text-sm
            text-[#6B707B]
            file:mr-4
            file:rounded-xl
            file:border-0
            file:bg-[#C9A227]
            file:px-4
            file:py-2.5
            file:font-bold
            file:text-[#14213D]
            hover:file:bg-[#E0C766]
          "
        />
      </div>

      {selectedFile && (
        <div className="mt-4 rounded-xl border border-[#E3DFD5] bg-white p-4">
          <p className="break-all text-sm font-bold text-[#14213D]">
            {selectedFile.name}
          </p>

          <p className="mt-1 text-xs text-[#858994]">
            {formatFileSize(
              selectedFile.size
            )}
          </p>
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
          mt-5
          rounded-xl
          bg-[#C9A227]
          px-5
          py-3
          font-bold
          text-[#14213D]
          transition-all
          hover:bg-[#E0C766]
          hover:shadow-md
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {uploading
          ? "Uploading..."
          : "Upload Resume"}
      </button>
    </div>
  );
}