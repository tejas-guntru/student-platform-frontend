"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

interface InstructorAuthGuardProps {
  children: ReactNode;
}

export default function InstructorAuthGuard({
  children,
}: InstructorAuthGuardProps) {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role !== "INSTRUCTOR") {
      if (role === "ADMIN") {
        router.replace(
          "/admin/dashboard"
        );
        return;
      }

      if (role === "STUDENT") {
        router.replace("/student");
        return;
      }

      /*
       * We don't currently have a confirmed
       * recruiter landing route here, so do
       * not guess one.
       */
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-50
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-slate-200
              border-t-[#1256AF]
            "
          />

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            Loading instructor workspace...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
