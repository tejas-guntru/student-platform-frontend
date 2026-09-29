"use client";

import {
  LoaderCircle,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

interface StudentAuthGuardProps {
  children: React.ReactNode;
}

export default function StudentAuthGuard({
  children,
}: StudentAuthGuardProps) {
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

    if (role !== "STUDENT") {
      if (role === "ADMIN") {
        router.replace("/admin/dashboard");
        return;
      }

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
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <LoaderCircle
              size={20}
              className="animate-spin text-[#1256af]"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}