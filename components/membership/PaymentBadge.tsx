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
      <Badge
        icon={
          <CheckCircle2
            size={12}
            strokeWidth={2.3}
          />
        }
        className="
          border-emerald-200
          bg-emerald-50
          text-emerald-700
        "
      >
        Paid
      </Badge>
    );
  }

  if (status === "FAILED") {
    return (
      <Badge
        icon={
          <XCircle
            size={12}
            strokeWidth={2.3}
          />
        }
        className="
          border-red-200
          bg-red-50
          text-red-600
        "
      >
        Failed
      </Badge>
    );
  }

  return (
    <Badge
      icon={
        <Clock3
          size={12}
          strokeWidth={2.3}
        />
      }
      className="
        border-slate-200
        bg-slate-50
        text-slate-600
      "
    >
      Created
    </Badge>
  );
}

function Badge({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1.5
        text-[9px]
        font-bold
        uppercase
        tracking-[0.08em]

        ${className}
      `}
    >
      {icon}

      {children}
    </span>
  );
}