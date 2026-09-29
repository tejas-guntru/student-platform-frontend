import {
  CreditCard,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import type {
  PaymentResponse,
} from "@/types/payment";

import PaymentBadge from "@/components/membership/PaymentBadge";

import {
  formatDate,
} from "@/utils/membershipFormatters";

interface PaymentHistoryProps {
  payments:
    PaymentResponse[];
}

export default function PaymentHistory({
  payments,
}: PaymentHistoryProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =========================================
          HEADER
      ========================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-slate-200
          px-5
          py-4

          sm:px-6
        "
      >
        <div>
          <p
            className="
              text-sm
              font-bold
              text-slate-900
            "
          >
            Transactions
          </p>

          <p
            className="
              mt-0.5
              text-xs
              text-slate-500
            "
          >
            Your membership payment records.
          </p>
        </div>

        {payments.length > 0 && (
          <span
            className="
              shrink-0
              rounded-full
              bg-slate-100
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-slate-600
            "
          >
            {payments.length}{" "}
            {payments.length === 1
              ? "payment"
              : "payments"}
          </span>
        )}
      </div>

      {/* =========================================
          CONTENT
      ========================================== */}

      {payments.length === 0 ? (
        <EmptyPayments />
      ) : (
        <>
          {/* =====================================
              MOBILE
          ====================================== */}

          <div className="sm:hidden">
            {payments.map(
              (payment) => (
                <MobilePaymentCard
                  key={
                    payment.paymentId
                  }
                  payment={
                    payment
                  }
                />
              )
            )}
          </div>

          {/* =====================================
              DESKTOP TABLE
          ====================================== */}

          <div
            className="
              hidden
              overflow-x-auto

              sm:block
            "
          >
            <table
              className="
                w-full
                min-w-[760px]
                border-collapse
              "
            >
              <thead>
                <tr
                  className="
                    border-b
                    border-slate-200
                    bg-slate-50/80
                  "
                >
                  <TableHeading>
                    Date
                  </TableHeading>

                  <TableHeading>
                    Order
                  </TableHeading>

                  <TableHeading>
                    Payment
                  </TableHeading>

                  <TableHeading>
                    Status
                  </TableHeading>

                  <TableHeading right>
                    Amount
                  </TableHeading>
                </tr>
              </thead>

              <tbody>
                {payments.map(
                  (payment) => (
                    <PaymentRow
                      key={
                        payment.paymentId
                      }
                      payment={
                        payment
                      }
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

/* =========================================================
   DESKTOP ROW
========================================================= */

function PaymentRow({
  payment,
}: {
  payment:
    PaymentResponse;
}) {
  return (
    <tr
      className="
        border-b
        border-slate-100
        transition-colors
        last:border-b-0

        hover:bg-slate-50/70
      "
    >
      {/* DATE */}

      <td
        className="
          whitespace-nowrap
          px-6
          py-4
          text-sm
          font-medium
          text-slate-700
        "
      >
        {formatDate(
          payment.paidAt ||
            payment.createdAt
        )}
      </td>

      {/* ORDER */}

      <td
        className="
          max-w-[220px]
          px-6
          py-4
        "
      >
        <TransactionId
          value={
            payment.razorpayOrderId
          }
        />
      </td>

      {/* PAYMENT */}

      <td
        className="
          max-w-[220px]
          px-6
          py-4
        "
      >
        <TransactionId
          value={
            payment.razorpayPaymentId
          }
        />
      </td>

      {/* STATUS */}

      <td
        className="
          px-6
          py-4
        "
      >
        <PaymentBadge
          status={
            payment.status
          }
        />
      </td>

      {/* AMOUNT */}

      <td
        className="
          whitespace-nowrap
          px-6
          py-4
          text-right
          text-sm
          font-bold
          tabular-nums
          text-slate-900
        "
      >
        {formatAmount(
          payment.amount
        )}
      </td>
    </tr>
  );
}

/* =========================================================
   MOBILE PAYMENT CARD
========================================================= */

function MobilePaymentCard({
  payment,
}: {
  payment:
    PaymentResponse;
}) {
  return (
    <article
      className="
        border-b
        border-slate-100
        p-5
        last:border-b-0
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.1em]
              text-slate-400
            "
          >
            Payment date
          </p>

          <p
            className="
              mt-1
              text-sm
              font-bold
              text-slate-900
            "
          >
            {formatDate(
              payment.paidAt ||
                payment.createdAt
            )}
          </p>
        </div>

        <PaymentBadge
          status={
            payment.status
          }
        />
      </div>

      {/* AMOUNT */}

      <div className="mt-5">
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.1em]
            text-slate-400
          "
        >
          Amount
        </p>

        <p
          className="
            mt-1
            text-xl
            font-bold
            tracking-[-0.03em]
            tabular-nums
            text-slate-950
          "
        >
          {formatAmount(
            payment.amount
          )}
        </p>
      </div>

      {/* IDS */}

      <div
        className="
          mt-5
          grid
          gap-4
          rounded-xl
          bg-slate-50
          p-4
        "
      >
        <MobileTransactionField
          label="Order ID"
          value={
            payment.razorpayOrderId
          }
        />

        <MobileTransactionField
          label="Payment ID"
          value={
            payment.razorpayPaymentId
          }
        />
      </div>
    </article>
  );
}

/* =========================================================
   MOBILE FIELD
========================================================= */

function MobileTransactionField({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | null
    | undefined;
}) {
  return (
    <div>
      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.1em]
          text-slate-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-all
          font-mono
          text-[11px]
          leading-5
          text-slate-600
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

/* =========================================================
   TRANSACTION ID
========================================================= */

function TransactionId({
  value,
}: {
  value:
    | string
    | null
    | undefined;
}) {
  return (
    <span
      title={
        value || undefined
      }
      className="
        block
        max-w-[190px]
        truncate
        font-mono
        text-xs
        text-slate-500
      "
    >
      {value || "-"}
    </span>
  );
}

/* =========================================================
   TABLE HEADING
========================================================= */

function TableHeading({
  children,
  right = false,
}: {
  children:
    ReactNode;

  right?: boolean;
}) {
  return (
    <th
      className={`
        whitespace-nowrap
        px-6
        py-3.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-slate-500

        ${
          right
            ? "text-right"
            : "text-left"
        }
      `}
    >
      {children}
    </th>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyPayments() {
  return (
    <div
      className="
        px-6
        py-12
        text-center

        sm:py-14
      "
    >
      <div
        className="
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
        "
      >
        <CreditCard
          size={19}
        />
      </div>

      <h3
        className="
          mt-4
          text-sm
          font-bold
          text-slate-900
        "
      >
        No payments yet
      </h3>

      <p
        className="
          mx-auto
          mt-1.5
          max-w-sm
          text-sm
          leading-6
          text-slate-500
        "
      >
        Your completed membership
        payments will appear here.
      </p>
    </div>
  );
}

/* =========================================================
   FORMAT AMOUNT
========================================================= */

function formatAmount(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(
    amount / 100
  );
}