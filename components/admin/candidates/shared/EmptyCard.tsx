import type {
  ReactNode,
} from "react";

interface EmptyCardProps {
  children: ReactNode;
}

export default function EmptyCard({
  children,
}: EmptyCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-sm text-zinc-500">
      {children}
    </div>
  );
}