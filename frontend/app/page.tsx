"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FeedbackForm from "@/components/FeedbackForm";
import Gallery from "@/components/Gallery";
import MapSection from "@/components/MapSection"; // New import
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Testimonials />
      <FeedbackForm />
      <Gallery />
      <MapSection /> {/* New component */}
      <Footer />
    </main>
  );
}
