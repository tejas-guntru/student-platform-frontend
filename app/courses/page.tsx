import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CoursesPage from "@/components/courses/CoursesPage";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Courses are assigned to your batches. Search yours, continue what you started, and open the next lesson.",
};

export default function Courses() {
  return (
    <>
      <Navbar />
      <CoursesPage />
      <Footer />
    </>
  );
}
