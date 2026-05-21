import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedCoffee from '@/components/FeaturedCoffee';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import MapSection from '@/components/MapSection'; // New import
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCoffee />
      <About />
      <Testimonials />
      <Gallery />
      <MapSection /> {/* New component */}
      <Footer />
    </main>
  );
}
