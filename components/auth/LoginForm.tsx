"use client";

import axios from "axios";
import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";

import AuthInput from "@/components/auth/AuthInput";
import { login } from "@/services/authService";

export default function LoginForm() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email: normalizedEmail,
        password,
      });

      /*
       * Validate the role before storing
       * the authenticated session.
       */
      if (
        response.role !== "STUDENT" &&
        response.role !== "ADMIN"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setError(
          "Unknown user role returned by server."
        );

        return;
      }

      /*
       * Store session
       */
      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "email",
        response.email
      );

      localStorage.setItem(
        "role",
        response.role
      );

      /*
       * Role-based redirect
       */
      if (response.role === "ADMIN") {
        window.location.replace(
          "/admin/dashboard"
        );

        return;
      }

      window.location.replace(
        "/student"
      );
    } catch (error: unknown) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      /*
       * Make sure a failed login
       * cannot leave an old session.
       */
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      if (
        axios.isAxiosError(error)
      ) {
        setError(
          error.response?.data?.message ||
            "Invalid email or password."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#1256AF]/15 bg-[#1256AF]/5 px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1256AF]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1256AF]">
            Sign in
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-[0.95] tracking-[-0.05em] text-gray-900 sm:text-4xl">
          Welcome back.
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-600">
          Continue building your profile and
          moving your career forward.
        </p>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          role="alert"
          className="mt-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm leading-5 text-red-700"
        >
          <span
            aria-hidden="true"
            className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold"
          >
            !
          </span>

          <span>{error}</span>
        </div>
      )}

      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          autoComplete="email"
          onChange={(event) => {
            setEmail(
              event.target.value
            );

            if (error) {
              setError("");
            }
          }}
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(
              event.target.value
            );

            if (error) {
              setError("");
            }
          }}
        />

        {/* =================================================
            SUBMIT
        ================================================= */}

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="
            group
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-[#1256AF]
            bg-[#1256AF]
            px-5
            py-3.5
            text-[14px]
            font-semibold
            text-white
            shadow-[0_12px_30px_rgba(18,86,175,0.18)]
            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:bg-[#0F4994]
            hover:shadow-[0_16px_38px_rgba(18,86,175,0.22)]

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#1256AF]/20

            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />

              Signing in...
            </>
          ) : (
            <>
              Continue

              <span
                aria-hidden="true"
                className="text-base transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </>
          )}
        </button>
      </form>

      {/* =====================================================
          REGISTER
      ===================================================== */}

      <div className="mt-7 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#1256AF] transition-colors duration-200 hover:text-[#0F4994]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}