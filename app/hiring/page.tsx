
"use client";

import { Suspense } from "react";

import HiringSections from "@/components/hiring/HiringSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function HiringLoading() {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-96 animate-pulse rounded-lg border border-gray-200 bg-gray-50 shadow-sm" />
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
