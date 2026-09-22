import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

interface PaymentBadgeProps {
  status:
    | "CREATED"
    | "PAID"
    | "FAILED";
}

export default function PaymentBadge({
  status,
}: PaymentBadgeProps) {
  if (status === "PAID") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-emerald-200
          bg-emerald-50
          px-2.5
          py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-[0.09em]
          text-emerald-700
        "
      >
        <CheckCircle2
          size={12}
          strokeWidth={2.3}
        />

        Paid
      </span>
    );
  }

  if (status === "FAILED") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          border
          border-red-200
          bg-red-50
          px-2.5
          py-1.5
          text-[9px]
          font-bold
          uppercase
          tracking-[0.09em]
          text-red-600
        "
      >
        <XCircle
          size={12}
          strokeWidth={2.3}
        />

        Failed
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-[#CBE5F8]
        bg-[#EFF8FF]
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.09em]
        text-[#0877E8]
      "
    >
      <Clock3
        size={12}
        strokeWidth={2.3}
      />

      Created
    </span>
  );
}