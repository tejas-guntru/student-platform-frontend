import type {
  ReactNode,
} from "react";

interface TagProps {
  children: ReactNode;
}

export default function Tag({
  children,
}: TagProps) {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-[#D5E6F2]
        bg-white
        px-3
        py-1.5
        text-[10px]
        font-semibold
        text-[#668198]
      "
    >
      {children}
    </span>
  );
}