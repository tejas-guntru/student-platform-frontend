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
    <div>
      <label
        className="
          mb-2
          block
          text-xs
          font-bold
          uppercase
          tracking-[0.08em]
          text-[#5F7C92]
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}