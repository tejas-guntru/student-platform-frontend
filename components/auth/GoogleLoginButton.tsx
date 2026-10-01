"use client";

import axios from "axios";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { googleLogin } from "@/services/authService";

// =========================================================
// GOOGLE TYPES
// =========================================================

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (
      response: GoogleCredentialResponse
    ) => void;
  }) => void;

  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?:
        | "outline"
        | "filled_blue"
        | "filled_black";
      size?: "large" | "medium" | "small";
      text?:
        | "signin_with"
        | "signup_with"
        | "continue_with"
        | "signin";
      shape?:
        | "rectangular"
        | "pill"
        | "circle"
        | "square";
      width?: number;
    }
  ) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

interface GoogleLoginButtonProps {
  onError: (message: string) => void;
}

// =========================================================
// HELPERS
// =========================================================

function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}

// =========================================================
// COMPONENT
// =========================================================

export default function GoogleLoginButton({
  onError,
}: GoogleLoginButtonProps) {
  const buttonRef =
    useRef<HTMLDivElement>(null);

  /*
   * Prevent Google Identity Services from being
   * initialized more than once for this component.
   */
  const initializedRef =
    useRef(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  useEffect(() => {
    const clientId =
      process.env
        .NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error(
        "NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing."
      );

      onError(
        "Google login is not configured."
      );

      return;
    }

    let attempts = 0;
    let timeoutId: number | undefined;
    let cancelled = false;

    const setupGoogle = () => {
      if (cancelled) {
        return;
      }

      if (
        !window.google ||
        !buttonRef.current
      ) {
        attempts += 1;

        if (attempts < 50) {
          timeoutId = window.setTimeout(
            setupGoogle,
            100
          );
        } else {
          onError(
            "Google sign-in could not be loaded."
          );
        }

        return;
      }

      /*
       * Avoid repeated initialize() calls.
       */
      if (!initializedRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,

          callback: async (
            response: GoogleCredentialResponse
          ) => {
            if (!response.credential) {
              onError(
                "Google did not return a valid credential."
              );

              return;
            }

            setGoogleLoading(true);
            onError("");

            try {
              const loginResponse =
                await googleLogin({
                  credential:
                    response.credential,
                });

              /*
               * Google OAuth is strictly
               * for STUDENT accounts.
               *
               * The backend already enforces
               * this rule. This frontend check
               * prevents an invalid session
               * from being stored.
               */
              if (
                loginResponse.role !==
                "STUDENT"
              ) {
                clearSession();

                onError(
                  "Google sign-in is available only for student accounts."
                );

                return;
              }

              // ---------------------------------------------
              // Store student session
              // ---------------------------------------------

              localStorage.setItem(
                "token",
                loginResponse.token
              );

              localStorage.setItem(
                "email",
                loginResponse.email
              );

              localStorage.setItem(
                "role",
                loginResponse.role
              );

              // ---------------------------------------------
              // Student destination
              // ---------------------------------------------

              window.location.replace(
                "/student"
              );
            } catch (error: unknown) {
              console.error(
                "GOOGLE LOGIN ERROR:",
                error
              );

              clearSession();

              if (
                axios.isAxiosError(error)
              ) {
                onError(
                  error.response?.data
                    ?.message ||
                    "Google login failed."
                );
              } else {
                onError(
                  "Google login failed. Please try again."
                );
              }
            } finally {
              setGoogleLoading(false);
            }
          },
        });

        initializedRef.current = true;
      }

      /*
       * Render / re-render the Google button.
       */
      buttonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: 400,
        }
      );
    };

    setupGoogle();

    return () => {
      cancelled = true;

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [onError]);

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <div
          ref={buttonRef}
          className={
            googleLoading
              ? "pointer-events-none opacity-60"
              : ""
          }
        />
      </div>

      {googleLoading && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-gray-500">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-[#1256AF]" />

          Signing in with Google...
        </div>
      )}
    </div>
  );
}