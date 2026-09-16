"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

import { login } from "@/services/authService";

export default function LoginPage() {
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

      console.log(
        "LOGIN RESPONSE:",
        response
      );

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

      console.log(
        "SAVED ROLE:",
        localStorage.getItem("role")
      );

      if (
        response.role === "ADMIN"
      ) {
        window.location.href =
          "/admin/dashboard";

        return;
      }

      if (
        response.role === "STUDENT"
      ) {
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

      if (
        axios.isAxiosError(error)
      ) {
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
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">

      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <p className="text-sm font-medium text-zinc-500">
            STUDENT PLATFORM
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Login
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Login as student or admin.
          </p>


          {error && (
            <div className="mt-5 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-zinc-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
                placeholder="Enter email"
              />
            </div>


            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
                placeholder="Enter password"
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-black hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}