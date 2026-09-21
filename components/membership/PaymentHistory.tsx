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
    <section className="mt-8 overflow-hidden rounded-[24px] border border-[#D8D5CC] bg-white shadow-[0_16px_45px_rgba(20,33,61,0.05)]">
      <div className="border-b border-[#EEECE6] px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A227]" />

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9A227]">
            Payments
          </p>
        </div>

        <h2 className="mt-3 text-xl font-bold text-[#14213D]">
          Payment History
        </h2>
      </div>

      {payments.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-sm text-[#6B707B]">
            No payments yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#F8F7F3]">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-[#858994]">
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
                (payment) => (
                  <tr
                    key={
                      payment.paymentId
                    }
                    className="border-t border-[#EEECE6] transition-colors hover:bg-[#FBFAF6]"
                  >
                    <td className="px-6 py-4 text-sm text-[#5F6470]">
                      {formatDate(
                        payment.paidAt ||
                          payment.createdAt
                      )}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#858994]">
                      {payment.razorpayOrderId}
                    </td>

                    <td className="px-6 py-4 text-xs text-[#858994]">
                      {payment.razorpayPaymentId ||
                        "-"}
                    </td>

                    <td className="px-6 py-4">
                      <PaymentBadge
                        status={
                          payment.status
                        }
                      />
                    </td>

                    <td className="px-6 py-4 text-right font-bold text-[#14213D]">
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
  );
}