import Build from "@/components/home/Build";
import Discover from "@/components/home/Discover";
import MoveForward from "@/components/home/MoveForward";
import Show from "@/components/home/Show";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Hiring() {
  return (
    <>
      <Navbar />

      <main>
        <Build />
        <Discover />
        <MoveForward />
        <Show />
      </main>

      <Footer />
    </>
  );
}