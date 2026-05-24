export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 1,
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1974&auto=format&fit=crop',
    category: 'Coffee',
  },
  {
    id: 2,
    name: 'Oat Milk Latte',
    description: 'Smooth espresso with creamy oat milk and a touch of sweetness.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1974&auto=format&fit=crop',
    category: 'Coffee',
  },
  {
    id: 3,
    name: 'Vanilla Sweet Cream',
    description: 'Slow-steeped cold brew topped with house-made vanilla sweet cream.',
    price: '$5.25',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop',
    category: 'Coffee',
  },
  {
    id: 4,
    name: 'Hazelnut Praline',
    description: 'Rich espresso with toasted hazelnut and caramelized praline topping.',
    price: '$6.50',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop',
    category: 'Coffee',
  },

  // Non-Coffee
  {
    id: 5,
    name: 'Matcha Latte',
    description: 'Premium grade matcha blended with creamy steamed milk.',
    price: '$5.75',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop',
    category: 'Non-Coffee',
  },
  {
    id: 6,
    name: 'Dark Chocolate Mocha',
    description: 'Rich Belgian chocolate melted into espresso and steamed milk.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    category: 'Non-Coffee',
  },
  // Pastries
  {
    id: 7,
    name: 'Butter Croissant',
    description: 'Flaky, buttery traditional French pastry baked fresh daily.',
    price: '$4.25',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1974&auto=format&fit=crop',
    category: 'Pastries',
  },
  {
    id: 8,
    name: 'Almond Danish',
    description: 'Sweet almond cream filling topped with toasted almond flakes.',
    price: '$4.75',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1974&auto=format&fit=crop',
    category: 'Pastries',
  },
  // Pasta & Noodles
  {
    id: 9,
    name: 'Creamy Carbonara',
    description: 'Al dente pasta with a rich egg and pecorino cheese sauce.',
    price: '$12.00',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2070&auto=format&fit=crop',
    category: 'Pasta & Noodles',
  },
  {
    id: 10,
    name: 'Pesto Penne',
    description: 'Penne pasta tossed in a fresh basil pesto with parmesan.',
    price: '$11.50',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2070&auto=format&fit=crop',
    category: 'Pasta & Noodles',
  },
  // Pica-Pica
  {
    id: 11,
    name: 'Truffle Fries',
    description: 'Crispy golden fries tossed in white truffle oil and parmesan.',
    price: '$7.50',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1974&auto=format&fit=crop',
    category: 'Pica-Pica',
  },
  {
    id: 12,
    name: 'Chicken Wings',
    description: 'Crispy wings glazed in our signature honey garlic sauce.',
    price: '$9.00',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1974&auto=format&fit=crop',
    category: 'Pica-Pica',
  },
  // Rice Meal
  {
    id: 13,
    name: 'Beef Gyudon',
    description: 'Thinly sliced beef and onions simmered in a sweet soy glaze.',
    price: '$13.00',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1974&auto=format&fit=crop',
    category: 'Rice Meal',
  },
  {
    id: 14,
    name: 'Grilled Salmon Rice',
    description: 'Perfectly grilled salmon fillet served over steamed jasmine rice.',
    price: '$15.00',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1974&auto=format&fit=crop',
    category: 'Rice Meal',
  },
];

export const menuCategories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];
