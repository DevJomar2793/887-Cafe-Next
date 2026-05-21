export default function OrderSection() {
  return (
    <section id="order" className="py-16 bg-beige text-coffee-brown text-center my-12 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
        Order Your Favorite Brew
      </h2>
      <p className="mb-6">Select from our curated menu and enjoy a fresh cup.</p>
      <a
        href="/order"
        className="inline-block bg-coffee-brown text-beige px-6 py-3 rounded-full font-medium"
      >
        Go to Order Page
      </a>
    </section>
  );
}
