interface PaymentBadgeProps {
  status:
    | "CREATED"
    | "PAID"
    | "FAILED";
}

export default function PaymentBadge({
  status,
}: PaymentBadgeProps) {
  if (
    status === "PAID"
  ) {
    return (
      <span className="rounded-full border border-[#BFD7C3] bg-[#F1F8F2] px-3 py-1 text-xs font-bold text-[#347A3A]">
        PAID
      </span>
    );
  }

  if (
    status === "FAILED"
  ) {
    return (
      <span className="rounded-full border border-[#E4C7C7] bg-[#FBF1F1] px-3 py-1 text-xs font-bold text-[#A43F3F]">
        FAILED
      </span>
    );
  }

  return (
    <span className="rounded-full border border-[#E8DCA9] bg-[#FBF7E8] px-3 py-1 text-xs font-bold text-[#806E30]">
      CREATED
    </span>
  );
}