"use client";

import axios from "axios";
import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  getMyMembership,
} from "@/services/membershipService";

import {
  createPaymentOrder,
  getMyPayments,
  verifyPayment,
} from "@/services/paymentService";

import type {
  MembershipResponse,
} from "@/types/membership";

import type {
  PaymentResponse,
} from "@/types/payment";


// =========================================================
// RAZORPAY TYPES
// =========================================================

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}


interface RazorpayErrorResponse {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}


interface RazorpayOptions {
  key: string;

  amount: number;

  currency: string;

  order_id: string;

  name: string;

  description: string;

  prefill?: {
    email?: string;
  };

  theme?: {
    color?: string;
  };

  handler: (
    response: RazorpaySuccessResponse
  ) => void;

  modal?: {
    ondismiss?: () => void;
  };
}


interface RazorpayInstance {
  open: () => void;

  on: (
    event: string,
    callback: (
      response: RazorpayErrorResponse
    ) => void
  ) => void;
}


interface RazorpayConstructor {
  new (
    options: RazorpayOptions
  ): RazorpayInstance;
}


declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}


// =========================================================
// PAGE
// =========================================================

export default function MembershipPage() {

  const [
    membership,
    setMembership,
  ] = useState<MembershipResponse | null>(
    null
  );

  const [
    payments,
    setPayments,
  ] = useState<PaymentResponse[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    paying,
    setPaying,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");


  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {

    const loadPage =
      async () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const role =
          localStorage.getItem(
            "role"
          );


        if (
          !token ||
          role !== "STUDENT"
        ) {

          window.location.href =
            "/login";

          return;
        }


        try {

          await loadRazorpayScript();


          const [
            membershipData,
            paymentData,
          ] =
            await Promise.all([
              getMyMembership(),
              getMyPayments(),
            ]);


          setMembership(
            membershipData
          );


          setPayments(
            Array.isArray(
              paymentData
            )
              ? paymentData
              : []
          );

        } catch (
          error: unknown
        ) {

          handleApiError(
            error,
            "Unable to load membership."
          );

        } finally {

          setLoading(false);
        }
      };


    loadPage();

  }, []);


  // =========================================================
  // API ERROR
  // =========================================================

  const handleApiError = (
    error: unknown,
    fallback: string
  ) => {

    console.error(error);


    if (
      axios.isAxiosError(error)
    ) {

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        localStorage.clear();

        window.location.href =
          "/login";

        return;
      }


      setError(
        error.response
          ?.data?.message ||
          fallback
      );

      return;
    }


    if (
      error instanceof Error
    ) {

      setError(
        error.message
      );

      return;
    }


    setError(
      fallback
    );
  };


  // =========================================================
  // PAYMENT
  // =========================================================

  const handlePayment =
    async () => {

      setError("");
      setSuccess("");
      setPaying(true);


      try {

        if (
          !window.Razorpay
        ) {

          await loadRazorpayScript();
        }


        if (
          !window.Razorpay
        ) {

          throw new Error(
            "Razorpay checkout could not be loaded."
          );
        }


        // -----------------------------------------
        // CREATE BACKEND ORDER
        // -----------------------------------------

        const order =
          await createPaymentOrder();


        const email =
          localStorage.getItem(
            "email"
          ) || "";


        // -----------------------------------------
        // RAZORPAY OPTIONS
        // -----------------------------------------

        const options: RazorpayOptions = {

          key:
            order.keyId,

          amount:
            order.amount,

          currency:
            order.currency,

          order_id:
            order.orderId,

          name:
            "Student Platform",

          description:
            "Annual Membership",

          prefill: {
            email,
          },

          theme: {
            color:
              "#18181b",
          },


          // =======================================
          // PAYMENT SUCCESS
          // =======================================

          handler:
            async (
              response
            ) => {

              try {

                setSuccess(
                  "Payment completed. Verifying payment..."
                );


                const payment =
                  await verifyPayment(
                    {
                      razorpayOrderId:
                        response
                          .razorpay_order_id,

                      razorpayPaymentId:
                        response
                          .razorpay_payment_id,

                      razorpaySignature:
                        response
                          .razorpay_signature,
                    }
                  );


                if (
                  payment.status !==
                  "PAID"
                ) {

                  throw new Error(
                    "Payment verification did not complete successfully."
                  );
                }


                const [
                  updatedMembership,
                  updatedPayments,
                ] =
                  await Promise.all([
                    getMyMembership(),
                    getMyPayments(),
                  ]);


                setMembership(
                  updatedMembership
                );


                setPayments(
                  updatedPayments
                );


                setError("");


                setSuccess(
                  "Payment verified successfully. Your membership is active."
                );

              } catch (
                error: unknown
              ) {

                handleApiError(
                  error,
                  "Payment verification failed."
                );

              } finally {

                setPaying(false);
              }
            },


          // =======================================
          // CHECKOUT CLOSED
          // =======================================

          modal: {

            ondismiss: () => {

              setPaying(
                false
              );
            },
          },
        };


        const razorpay =
          new window.Razorpay(
            options
          );


        // -----------------------------------------
        // PAYMENT FAILURE
        // -----------------------------------------

        razorpay.on(
          "payment.failed",
          (
            response:
              RazorpayErrorResponse
          ) => {

            setPaying(
              false
            );


            setSuccess("");


            setError(
              response
                .error
                ?.description ||
                "Payment failed."
            );
          }
        );


        razorpay.open();

      } catch (
        error: unknown
      ) {

        setPaying(
          false
        );


        handleApiError(
          error,
          "Unable to start payment."
        );
      }
    };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">

        <p className="text-zinc-400">
          Loading membership...
        </p>

      </main>
    );
  }


  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-6xl px-6 py-8">


        {/* HEADER */}

        <header className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              MEMBERSHIP
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Student Membership
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Membership gives you access
              to applying for internships
              and jobs.
            </p>

          </div>


          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
          >
            ← Dashboard
          </Link>

        </header>


        {/* ERROR */}

        {error && (

          <div className="mt-6 rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-300">

            {error}

          </div>
        )}


        {/* SUCCESS */}

        {success && (

          <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/30 px-5 py-4 text-sm text-emerald-300">

            {success}

          </div>
        )}


        {/* MEMBERSHIP CARD */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">


          {/* CURRENT MEMBERSHIP */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">

            <p className="text-sm text-zinc-500">
              Current Membership
            </p>


            {membership?.active ? (

              <>

                <div className="mt-5">

                  <span className="inline-flex rounded-full border border-emerald-900 bg-emerald-950/40 px-4 py-2 text-sm font-semibold text-emerald-400">

                    ACTIVE

                  </span>

                </div>


                <div className="mt-7 space-y-5">

                  <Detail
                    label="Starts"
                    value={
                      formatDate(
                        membership.startsAt
                      )
                    }
                  />


                  <Detail
                    label="Valid Until"
                    value={
                      formatDate(
                        membership.endsAt
                      )
                    }
                  />

                </div>


                <p className="mt-7 text-sm leading-6 text-zinc-400">
                  Your membership is active.
                  You can apply to available
                  jobs and internships.
                </p>

              </>

            ) : (

              <>

                <div className="mt-5">

                  <span className="inline-flex rounded-full border border-amber-900 bg-amber-950/40 px-4 py-2 text-sm font-semibold text-amber-400">

                    INACTIVE

                  </span>

                </div>


                <p className="mt-6 text-sm leading-6 text-zinc-400">
                  Activate membership to
                  start applying for
                  opportunities.
                </p>

              </>

            )}

          </div>


          {/* PLAN */}

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">

            <p className="text-sm text-zinc-500">
              Annual Plan
            </p>


            <div className="mt-4 flex items-end gap-2">

              <span className="text-4xl font-bold">
                ₹499
              </span>

              <span className="pb-1 text-zinc-500">
                / year
              </span>

            </div>


            <div className="mt-6 space-y-3 text-sm text-zinc-300">

              <Feature>
                Apply to internships
              </Feature>

              <Feature>
                Apply to job opportunities
              </Feature>

              <Feature>
                Track application progress
              </Feature>

              <Feature>
                Resume submission after shortlist
              </Feature>

            </div>


            <button
              type="button"
              onClick={
                handlePayment
              }
              disabled={
                paying
              }
              className="mt-8 w-full rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {paying
                ? "Opening Payment..."
                : membership?.active
                ? "Extend Membership ₹499"
                : "Get Membership ₹499"}

            </button>


            <p className="mt-4 text-center text-xs text-zinc-600">
              Razorpay secure checkout
            </p>

          </div>

        </section>


        {/* PAYMENT HISTORY */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

          <div className="border-b border-zinc-800 px-6 py-5">

            <h2 className="text-lg font-semibold">
              Payment History
            </h2>

          </div>


          {payments.length ===
          0 ? (

            <div className="p-8 text-center text-sm text-zinc-500">
              No payments yet.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead className="bg-zinc-950/60">

                  <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4">
                      Order
                    </th>

                    <th className="px-6 py-4">
                      Payment
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Amount
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {payments.map(
                    (
                      payment
                    ) => (

                      <tr
                        key={
                          payment.paymentId
                        }
                        className="border-t border-zinc-800"
                      >

                        <td className="px-6 py-4 text-sm text-zinc-300">

                          {
                            formatDate(
                              payment.paidAt ||
                              payment.createdAt
                            )
                          }

                        </td>


                        <td className="px-6 py-4 text-xs text-zinc-500">

                          {
                            payment.razorpayOrderId
                          }

                        </td>


                        <td className="px-6 py-4 text-xs text-zinc-500">

                          {
                            payment.razorpayPaymentId ||
                            "-"
                          }

                        </td>


                        <td className="px-6 py-4">

                          <PaymentBadge
                            status={
                              payment.status
                            }
                          />

                        </td>


                        <td className="px-6 py-4 text-right font-semibold">

                          ₹
                          {(
                            payment.amount /
                            100
                          ).toFixed(
                            2
                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

      </div>

    </main>
  );
}


// =========================================================
// LOAD RAZORPAY SCRIPT
// =========================================================

function loadRazorpayScript():
  Promise<void> {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      if (
        window.Razorpay
      ) {

        resolve();

        return;
      }


      const existing =
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );


      if (existing) {

        existing.addEventListener(
          "load",
          () => resolve()
        );

        existing.addEventListener(
          "error",
          () =>
            reject(
              new Error(
                "Unable to load Razorpay checkout."
              )
            )
        );

        return;
      }


      const script =
        document.createElement(
          "script"
        );


      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";


      script.async =
        true;


      script.onload =
        () => resolve();


      script.onerror =
        () =>
          reject(
            new Error(
              "Unable to load Razorpay checkout."
            )
          );


      document.body.appendChild(
        script
      );
    }
  );
}


// =========================================================
// DETAIL
// =========================================================

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (
    <div>

      <p className="text-xs text-zinc-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}


// =========================================================
// FEATURE
// =========================================================

function Feature({
  children,
}: {
  children:
    React.ReactNode;
}) {

  return (
    <div className="flex gap-3">

      <span className="text-emerald-400">
        ✓
      </span>

      <span>
        {children}
      </span>

    </div>
  );
}


// =========================================================
// PAYMENT BADGE
// =========================================================

function PaymentBadge({
  status,
}: {
  status:
    | "CREATED"
    | "PAID"
    | "FAILED";
}) {

  if (
    status === "PAID"
  ) {

    return (
      <span className="rounded-full border border-emerald-900 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
        PAID
      </span>
    );
  }


  if (
    status === "FAILED"
  ) {

    return (
      <span className="rounded-full border border-red-900 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-400">
        FAILED
      </span>
    );
  }


  return (
    <span className="rounded-full border border-amber-900 bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-400">
      CREATED
    </span>
  );
}


// =========================================================
// DATE
// =========================================================

function formatDate(
  value:
    | string
    | null
) {

  if (!value) {

    return "-";
  }


  return new Date(
    value
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}