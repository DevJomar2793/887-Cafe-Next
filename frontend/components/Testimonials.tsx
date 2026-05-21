export default function Testimonials() {
  const reviews = [
    { author: 'Alice', text: 'Best coffee in town! The ambience is perfect.' },
    { author: 'Bob', text: 'Loved the minimalist vibe and friendly staff.' },
    { author: 'Charlie', text: 'A cozy spot to work and enjoy great espresso.' },
  ];
  return (
    <section className="py-16 bg-beige text-coffee-brown p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow" id="testimonials">
      <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>Testimonials</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {reviews.map((r, i) => (
          <blockquote key={i} className="border-l-4 border-coffee-brown pl-4">
            <p className="italic mb-2">"{r.text}"</p>
            <footer className="text-right font-medium">- {r.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
