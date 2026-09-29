import {
  CreditCard,
  ReceiptText,
} from "lucide-react";

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
        mt-6
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-200
          px-5
          py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-600
            "
          >
            <ReceiptText size={17} />
          </div>

          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#1256AF]
              "
            >
              Payments
            </p>

            <h2
              className="
                mt-1
                text-lg
                font-bold
                tracking-[-0.02em]
                text-slate-900
              "
            >
              Payment History
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Your membership payment records.
            </p>
          </div>
        </div>

        {payments.length > 0 && (
          <span
            className="
              w-fit
              rounded-full
              border
              border-slate-200
              bg-slate-50
              px-3
              py-1.5
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

      {payments.length === 0 ? (
        <EmptyPayments />
      ) : (
        <div className="overflow-x-auto">
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
                  text-left
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
                  <tr
                    key={
                      payment.paymentId
                    }
                    className="
                      border-b
                      border-slate-100
                      transition-colors
                      last:border-b-0

                      hover:bg-slate-50/70
                    "
                  >
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

                    <td
                      className="
                        max-w-[220px]
                        px-6
                        py-4
                      "
                    >
                      <span
                        className="
                          block
                          truncate
                          font-mono
                          text-xs
                          text-slate-500
                        "
                        title={
                          payment.razorpayOrderId
                        }
                      >
                        {payment.razorpayOrderId}
                      </span>
                    </td>

                    <td
                      className="
                        max-w-[220px]
                        px-6
                        py-4
                      "
                    >
                      <span
                        className="
                          block
                          truncate
                          font-mono
                          text-xs
                          text-slate-500
                        "
                        title={
                          payment.razorpayPaymentId ||
                          undefined
                        }
                      >
                        {payment.razorpayPaymentId ||
                          "-"}
                      </span>
                    </td>

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
                      ₹
                      {(
                        payment.amount /
                        100
                      ).toFixed(2)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function TableHeading({
  children,
  right = false,
}: {
  children:
    React.ReactNode;
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

function EmptyPayments() {
  return (
    <div
      className="
        px-6
        py-12
        text-center
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
        <CreditCard size={19} />
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
        Your completed membership payments
        will appear here.
      </p>
    </div>
  );
}