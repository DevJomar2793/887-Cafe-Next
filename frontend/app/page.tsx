import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Gallery />
      <MapSection />
      <Footer />
    </main>
  );
}
