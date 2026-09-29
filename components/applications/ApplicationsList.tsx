"use client";

import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

import type {
  ApplicationResponse,
} from "@/types/application";

import ApplicationCard from "@/components/applications/ApplicationCard";

interface ApplicationsListProps {
  applications:
    ApplicationResponse[];

  onSelect:
    (
      application:
        ApplicationResponse
    ) => void;
}

export default function ApplicationsList({
  applications,
  onSelect,
}: ApplicationsListProps) {
  if (applications.length === 0) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-6
          py-14
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-500
          "
        >
          <FileText size={20} />
        </div>

        <h2
          className="
            mt-4
            text-lg
            font-bold
            text-slate-900
          "
        >
          No applications yet
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-sm
            leading-6
            text-slate-500
          "
        >
          Once you apply for a job or
          internship, its progress will
          appear here.
        </p>

        <Link
          href="/opportunities"
          className="
            group
            mt-6
            inline-flex
            min-h-[44px]
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
          "
        >
          <BriefcaseBusiness
            size={15}
          />

          Browse Opportunities

          <ArrowRight
            size={14}
            className="
              transition-transform
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-[#1256AF]
            "
          >
            Application tracker
          </p>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              tracking-[-0.035em]
              text-slate-950
            "
          >
            Application progress
          </h2>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              leading-6
              text-slate-500
            "
          >
            Select an application to see
            its hiring progress and any
            actions required from you.
          </p>
        </div>

        <div
          className="
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            px-3.5
            py-2.5
          "
        >
          <FileText
            size={15}
            className="text-[#1256AF]"
          />

          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-slate-400
              "
            >
              Total
            </p>

            <p
              className="
                text-xs
                font-bold
                text-slate-700
              "
            >
              {applications.length}{" "}
              {applications.length === 1
                ? "application"
                : "applications"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
          mt-6
          grid
          gap-4

          md:grid-cols-2
        "
      >
        {applications.map(
          (application) => (
            <ApplicationCard
              key={
                application.applicationId
              }
              application={
                application
              }
              onSelect={
                onSelect
              }
            />
          )
        )}
      </div>
    </section>
  );
}