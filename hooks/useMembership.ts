"use client";

import axios from "axios";

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

import type {
  RazorpayErrorResponse,
  RazorpayOptions,
} from "@/types/razorpay";

import {
  loadRazorpayScript,
} from "@/utils/razorpay";

export function useMembership() {
  const [
    membership,
    setMembership,
  ] =
    useState<MembershipResponse | null>(
      null
    );

  const [
    payments,
    setPayments,
  ] =
    useState<PaymentResponse[]>(
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

  // =========================================
  // ERROR
  // =========================================

  const handleApiError = (
    error: unknown,
    fallback: string
  ) => {
    console.error(error);

    if (
      axios.isAxiosError(error)
    ) {
      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
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

    setError(fallback);
  };

  // =========================================
  // RELOAD
  // =========================================

  const reloadMembership =
    async () => {
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
    };

  // =========================================
  // INITIAL LOAD
  // =========================================

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

          await reloadMembership();
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

  // =========================================
  // PAYMENT
  // =========================================

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

        const order =
          await createPaymentOrder();

        const email =
          localStorage.getItem(
            "email"
          ) || "";

        const options:
          RazorpayOptions = {
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
                "#C9A227",
            },

            handler:
              async (
                response
              ) => {
                try {
                  setSuccess(
                    "Payment completed. Verifying payment..."
                  );

                  const payment =
                    await verifyPayment({
                      razorpayOrderId:
                        response
                          .razorpay_order_id,

                      razorpayPaymentId:
                        response
                          .razorpay_payment_id,

                      razorpaySignature:
                        response
                          .razorpay_signature,
                    });

                  if (
                    payment.status !==
                    "PAID"
                  ) {
                    throw new Error(
                      "Payment verification did not complete successfully."
                    );
                  }

                  await reloadMembership();

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

            modal: {
              ondismiss: () => {
                setPaying(false);
              },
            },
          };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.on(
          "payment.failed",
          (
            response:
              RazorpayErrorResponse
          ) => {
            setPaying(false);

            setSuccess("");

            setError(
              response.error
                ?.description ||
                "Payment failed."
            );
          }
        );

        razorpay.open();
      } catch (
        error: unknown
      ) {
        setPaying(false);

        handleApiError(
          error,
          "Unable to start payment."
        );
      }
    };

  return {
    membership,
    payments,

    loading,
    paying,

    error,
    success,

    handlePayment,
  };
}