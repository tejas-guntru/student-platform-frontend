import Hero from "@/components/home/Hero";
import YourTrail from "@/components/home/YourTrail";
import Build from "@/components/home/Build";
import Show from "@/components/home/Show";
import Discover from "@/components/home/Discover";
import MoveForward from "@/components/home/MoveForward";
import KeepGoing from "@/components/home/KeepGoing";
import Navbar from "@/components/Navbar";
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <YourTrail />
      <Build />
      <Show />
      <Discover />
      <MoveForward />
      <KeepGoing />
    </main>
  );
}