export default function About() {
  return (
    <section className="py-16 bg-beige text-coffee-brown p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow" id="about">
      <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>About Our Café</h2>
      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src="/about.jpg" alt="Café interior" className="rounded-lg shadow-md" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-4">Nestled in the heart of the city, our cozy café offers a warm retreat for coffee lovers. We source the finest beans and craft every cup with care.</p>
          <p>Our minimalist design blends natural wood tones with soft lighting, creating a space where you can relax, work, or catch up with friends.</p>
        </div>
      </div>
    </section>
  );
}
