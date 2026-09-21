"use client";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";

import { register } from "@/services/authService";
import AuthInput from "@/components/auth/AuthInput";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await register({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
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

      if (response.role === "STUDENT") {
        window.location.href = "/profile";
        return;
      }

      if (response.role === "ADMIN") {
        window.location.href =
          "/admin/dashboard";
        return;
      }

      setError("Unknown account role.");
    } catch (error: unknown) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      if (axios.isAxiosError(error)) {
        const backendMessage =
          error.response?.data?.message;

        if (backendMessage) {
          setError(backendMessage);
          return;
        }

        if (error.response?.status === 400) {
          setError(
            "Please check the registration details."
          );
          return;
        }

        if (error.response?.status === 409) {
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
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}

      <div className="text-center">
        <div
          className="
            mx-auto
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#CBE5F8]
            bg-[#EFF8FF]
            px-3.5
            py-1.5
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#0877E8]
              shadow-[0_0_8px_rgba(8,119,232,0.45)]
            "
          />

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#4381B3]
            "
          >
            Join Trailbliz
          </span>
        </div>

        <h1
          className="
            mt-5
            text-3xl
            font-bold
            leading-[0.95]
            tracking-[-0.05em]
            text-[#173B63]

            sm:text-4xl
          "
        >
          Create your account.
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-sm
            text-sm
            leading-6
            text-[#647B91]
          "
        >
          Start building your profile and connect everything that
          shapes your career journey.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div
          role="alert"
          className="
            mt-7
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[#F1CCCC]
            bg-[#FFF5F5]
            px-4
            py-3.5
            text-sm
            leading-5
            text-[#A43F3F]
          "
        >
          <span
            aria-hidden="true"
            className="
              mt-[2px]
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#FCE4E4]
              text-[11px]
              font-bold
            "
          >
            !
          </span>

          <span>
            {error}
          </span>
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleRegister}
        className="mt-8 space-y-5"
      >
        <AuthInput
          id="fullName"
          label="Full Name"
          type="text"
          value={fullName}
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={150}
          onChange={(event) =>
            setFullName(event.target.value)
          }
        />

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

        <div>
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={password}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            minLength={8}
            maxLength={100}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              px-1
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#79BFF0]
              "
            />

            <p
              className="
                text-xs
                text-[#7B91A6]
              "
            >
              Use at least 8 characters.
            </p>
          </div>
        </div>

        <AuthInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          placeholder="Enter your password again"
          autoComplete="new-password"
          onChange={(event) =>
            setConfirmPassword(
              event.target.value
            )
          }
        />

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
          className="
            group
            relative
            flex
            min-h-[52px]
            w-full
            items-center
            justify-center
            gap-3
            overflow-hidden
            rounded-2xl

            bg-gradient-to-r
            from-[#0877E8]
            via-[#118EED]
            to-[#2DB5F7]

            px-5
            py-3.5

            text-[14px]
            font-semibold
            text-white

            shadow-[0_12px_30px_rgba(8,119,232,0.22)]

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-[0_16px_38px_rgba(8,119,232,0.28)]

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#1689F5]/20

            disabled:cursor-not-allowed
            disabled:translate-y-0
            disabled:opacity-60
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-8
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/70
              to-transparent
            "
          />

          {loading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/35
                  border-t-white
                "
              />

              Creating account...
            </>
          ) : (
            <>
              Create account

              <span
                aria-hidden="true"
                className="
                  text-base
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </>
          )}
        </button>
      </form>

      {/* LOGIN */}

      <div
        className="
          mt-7
          border-t
          border-[#DCEAF6]
          pt-6
          text-center
        "
      >
        <p
          className="
            text-sm
            text-[#6A8096]
          "
        >
          Already have an account?{" "}

          <Link
            href="/login"
            className="
              font-semibold
              text-[#0877E8]
              transition-colors
              duration-200
              hover:text-[#075FCB]
            "
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}