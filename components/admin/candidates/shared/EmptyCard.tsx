import type {
  ReactNode,
} from "react";

import {
  Inbox,
} from "lucide-react";

interface EmptyCardProps {
  children: ReactNode;
}

export default function EmptyCard({
  children,
}: EmptyCardProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[20px]
        border
        border-dashed
        border-[#CADFEE]
        bg-[#FAFDFF]
        px-6
        py-9
        text-center
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-[#EAF6FF]
          text-[#0877E8]
        "
      >
        <Inbox size={19} />
      </div>

      <p
        className="
          mt-3
          text-sm
          font-medium
          leading-6
          text-[#7890A3]
        "
      >
        {children}
      </p>
    </div>
  );
}