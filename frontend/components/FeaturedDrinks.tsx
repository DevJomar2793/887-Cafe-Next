export default function FeaturedDrinks() {
  const drinks = [
    { name: 'Espresso', img: '/drink-01.jpg', desc: 'Rich and bold' },
    { name: 'Cappuccino', img: '/drink-02.jpg', desc: 'Smooth with foam' },
    { name: 'Latte', img: '/drink-03.jpg', desc: 'Creamy delight' },
    { name: 'Americano', img: '/drink-04.jpg', desc: 'Classic simplicity' },
  ];
  return (
    <section className="py-16 bg-beige text-coffee-brown p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow" id="featured-drinks">
      <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>Featured Drinks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {drinks.map((d) => (
          <div key={d.name} className="bg-white rounded-lg overflow-hidden shadow-md">
            <img src={d.img} alt={d.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-xl mb-2">{d.name}</h3>
              <p className="text-sm">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
