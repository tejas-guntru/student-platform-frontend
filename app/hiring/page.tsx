
"use client";

import { Suspense } from "react";

import HiringSections from "@/components/hiring/HiringSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function HiringLoading() {
  return (
    <div className="min-h-screen bg-[#eef2f6] pt-28 [font-family:var(--font-geist-sans),Arial,Helvetica,sans-serif] sm:pt-32">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8 lg:px-10">
        <div className="h-96 animate-pulse rounded-2xl border border-[#e4e9f0] bg-white shadow-[0_16px_40px_rgba(16,33,58,0.05)]" />
      </div>
    </div>
  );
}

export default function HiringPage() {
  return (
    <>
    <Navbar/>
      <Suspense fallback={<HiringLoading />}>
        <HiringSections />
      </Suspense>
    <Footer/>
    </>
  );
}
