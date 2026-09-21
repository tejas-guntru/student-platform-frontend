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
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </label>

      {children}
    </div>
  );
}