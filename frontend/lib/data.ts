export interface Drink {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export const drinks: Drink[] = [
  {
    id: 1,
    name: 'Caramel Macchiato',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso.',
    price: '$5.50',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Oat Milk Latte',
    description: 'Smooth espresso with creamy oat milk and a touch of sweetness.',
    price: '$6.00',
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Vanilla Sweet Cream',
    description: 'Slow-steeped cold brew topped with house-made vanilla sweet cream.',
    price: '$5.25',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Hazelnut Praline',
    description: 'Rich espresso with toasted hazelnut and caramelized praline topping.',
    price: '$6.50',
    image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1974&auto=format&fit=crop',
  },
];
