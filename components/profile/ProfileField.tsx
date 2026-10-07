import type {
  ReactNode,
} from "react";

interface ProfileFieldProps {
  label: string;
  children: ReactNode;
}

export default function ProfileField({
  label,
  children,
}: ProfileFieldProps) {
  return (
    <div
      className="
        min-w-0
        w-full
      "
    >
      <div
        className="
          mb-2
          break-words
          text-xs
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#5F7C92]

          [overflow-wrap:anywhere]
        "
      >
        {label}
      </div>

      <div className="min-w-0">
        {children}
      </div>
    </div>
  );
}