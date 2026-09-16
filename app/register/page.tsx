"use client";

import axios from "axios";
import Link from "next/link";

import {
  FormEvent,
  useState,
} from "react";

import {
  register,
} from "@/services/authService";


export default function RegisterPage() {

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");


  // =========================================================
  // REGISTER
  // =========================================================

  const handleRegister =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {

      event.preventDefault();

      setError("");


      // -----------------------------------------
      // VALIDATION
      // -----------------------------------------

      if (
        !fullName.trim()
      ) {

        setError(
          "Full name is required."
        );

        return;
      }


      if (
        !email.trim()
      ) {

        setError(
          "Email is required."
        );

        return;
      }


      if (
        password.length < 8
      ) {

        setError(
          "Password must be at least 8 characters."
        );

        return;
      }


      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match."
        );

        return;
      }


      setLoading(
        true
      );


      try {

        const response =
          await register(
            {
              fullName:
                fullName.trim(),

              email:
                email
                  .trim()
                  .toLowerCase(),

              password,
            }
          );


        // =========================================
        // SAVE AUTH
        // =========================================

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


        // =========================================
        // REDIRECT
        // =========================================

        if (
          response.role ===
          "STUDENT"
        ) {

          window.location.href =
            "/profile";

          return;
        }


        if (
          response.role ===
          "ADMIN"
        ) {

          window.location.href =
            "/admin/dashboard";

          return;
        }


        setError(
          "Unknown account role."
        );

      } catch (
        error: unknown
      ) {

        console.error(
          "REGISTER ERROR:",
          error
        );


        if (
          axios.isAxiosError(
            error
          )
        ) {

          const backendMessage =
            error.response
              ?.data?.message;


          if (
            backendMessage
          ) {

            setError(
              backendMessage
            );

            return;
          }


          if (
            error.response
              ?.status === 400
          ) {

            setError(
              "Please check the registration details."
            );

            return;
          }


          if (
            error.response
              ?.status === 409
          ) {

            setError(
              "An account already exists with this email."
            );

            return;
          }


          setError(
            "Unable to create account."
          );

          return;
        }


        setError(
          "Something went wrong."
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">

      <div className="w-full max-w-md">


        {/* HEADER */}

        <div className="mb-8 text-center">

          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
            STUDENT PLATFORM
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Register as a student and
            complete your academic profile
            after creating your account.
          </p>

        </div>


        {/* CARD */}

        <form
          onSubmit={
            handleRegister
          }
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8"
        >


          {/* ERROR */}

          {error && (

            <div className="mb-6 rounded-lg border border-red-900/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">

              {error}

            </div>
          )}


          {/* FULL NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Full Name
            </label>

            <input
              type="text"
              value={
                fullName
              }
              onChange={(
                event
              ) =>
                setFullName(
                  event.target.value
                )
              }
              placeholder="Tejas Guntru"
              autoComplete="name"
              maxLength={150}
              className={inputClass}
            />

          </div>


          {/* EMAIL */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={
                email
              }
              onChange={(
                event
              ) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="student@example.com"
              autoComplete="email"
              className={inputClass}
            />

          </div>


          {/* PASSWORD */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
              type="password"
              value={
                password
              }
              onChange={(
                event
              ) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              minLength={8}
              maxLength={100}
              className={inputClass}
            />

            <p className="mt-2 text-xs text-zinc-600">
              Minimum 8 characters.
            </p>

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Confirm Password
            </label>

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(
                event
              ) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Enter password again"
              autoComplete="new-password"
              className={inputClass}
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              loading
            }
            className="mt-7 w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Creating Account..."
              : "Create Student Account"}

          </button>


          {/* LOGIN */}

          <div className="mt-6 text-center text-sm text-zinc-400">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-white hover:underline"
            >
              Login
            </Link>

          </div>

        </form>


        {/* NOTE */}

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">

          <p className="text-xs leading-5 text-zinc-500">
            After registration, you&apos;ll
            complete your college, degree,
            branch, graduation year and
            career preferences from your
            student profile.
          </p>

        </div>

      </div>

    </main>
  );
}


// =========================================================
// INPUT CLASS
// =========================================================

const inputClass =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500";