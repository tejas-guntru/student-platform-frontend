"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { login } from "@/services/authService";
import AuthInput from "@/components/auth/AuthInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login({
        email: email.trim(),
        password,
      });

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

      if (response.role === "ADMIN") {
        window.location.href =
          "/admin/dashboard";

        return;
      }

      if (response.role === "STUDENT") {
        window.location.href =
          "/dashboard";

        return;
      }

      setError(
        "Unknown user role returned by server."
      );
    } catch (error: unknown) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Invalid email or password."
        );
      } else {
        setError(
          "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[24px] border border-[#D8D5CC] bg-white p-7 shadow-[0_20px_60px_rgba(20,33,61,0.08)] sm:p-9">

      {/* HEADER */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227]">
          Sign in
        </p>

        <h1 className="mt-4 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-[#14213D]">
          Welcome back.
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#5F6470]">
          Continue where your trail left off.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-7 rounded-xl border border-[#E4C7C7] bg-[#FBF1F1] px-4 py-3 text-sm text-[#A43F3F]">
          {error}
        </div>
      )}

      {/* FORM */}
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
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          autoComplete="current-password"
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-[#C9A227]
            px-4
            py-3.5
            text-sm
            font-bold
            text-[#14213D]
            transition-all
            duration-200
            hover:bg-[#E0C766]
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Continue"}

          {!loading && (
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </form>

      {/* REGISTER */}
      <div className="mt-7 border-t border-[#E3E1DA] pt-6 text-center">
        <p className="text-sm text-[#6B707B]">
          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="font-bold text-[#14213D] transition-colors hover:text-[#C9A227]"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}