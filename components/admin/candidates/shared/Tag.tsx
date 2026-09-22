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
    <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}