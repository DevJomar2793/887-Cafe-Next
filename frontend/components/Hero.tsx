import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full bg-coffee-brown flex items-center justify-center text-center text-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      {/* Placeholder hero background image */}
      <Image
        src="/hero.jpg"
        alt="Coffee shop interior"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="relative z-10 max-w-2xl">
        <h1 className="font-sans text-5xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Welcome to Our Cozy Café
        </h1>
        <p className="text-lg mb-6">Experience the perfect blend of aroma and comfort.</p>
        <a
          href="#order"
          className="inline-block bg-beige text-coffee-brown px-6 py-3 rounded-full font-medium"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}
