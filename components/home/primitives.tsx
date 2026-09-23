"use client";

import React, { ReactNode } from "react";

type ShellProps = {
  children: ReactNode;
  className?: string;
};

export function Shell({
  children,
  className = "",
}: ShellProps) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-7xl
        px-5
        sm:px-8
        lg:px-12
        ${className}
      `}
    >
      {children}
    </div>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({
  children,
  className = "",
}: EyebrowProps) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.2em]
        text-[#79D9FF]
        ${className}
      `}
    >
      <span className="h-px w-8 bg-[#79D9FF]/70" />

      {children}
    </div>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className = "",
}: RevealProps) {
  return (
    <div
      className={`
        animate-[reveal_0.7s_ease-out_both]
        ${className}
      `}
    >
      {children}
    </div>
  );
}