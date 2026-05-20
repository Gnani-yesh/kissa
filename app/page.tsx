import { Atmosphere } from "@/components/site/atmosphere";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { FeaturedCoffee } from "@/components/site/featured";
import { Philosophy } from "@/components/site/philosophy";
import { Process } from "@/components/site/process";
import { Gallery } from "@/components/site/gallery";
import { Menu } from "@/components/site/menu";
import { Reservation } from "@/components/site/reservation";
import { Footer } from "@/components/site/footer";

export default function HomePage() {
  return (
    <>
      <Atmosphere />
      <Navbar />
      <main className="relative">
        <Hero />
        <FeaturedCoffee />
        <Philosophy />
        <Process />
        <Gallery />
        <Menu />
        <Reservation />
        <Footer />
      </main>
    </>
  );
}
