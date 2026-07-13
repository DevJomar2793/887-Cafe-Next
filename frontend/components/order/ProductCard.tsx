"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MenuItem } from "@/lib/data";

export function ProductCard({ item }: { item: MenuItem }) {
  const { cart, addToCart } = useCart();
  const quantity = cart.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0;

  return (
    <article className="group flex gap-4 rounded-[1.5rem] border bg-soft-white p-3 shadow-sm transition hover:border-orange/30 hover:shadow-lg sm:flex-col sm:p-4">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.15rem] bg-beige sm:aspect-[4/3] sm:h-auto sm:w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 112px, (max-width: 1024px) 45vw, 28vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:px-1 sm:pb-1">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-orange">{item.category}</p>
          <h2 className="mt-1 font-sans text-base font-black leading-tight text-coffee sm:text-lg">{item.name}</h2>
          <p className="mt-1 hidden text-sm leading-5 text-coffee/55 sm:line-clamp-2">{item.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-black text-coffee">{item.price}</span>
          <button
            type="button"
            onClick={() => addToCart(item)}
            className="flex min-h-11 items-center gap-1 rounded-full bg-orange px-4 text-sm font-extrabold text-white transition hover:bg-orange-dark"
            aria-label={`Add ${item.name} to order`}
          >
            <Plus size={16} aria-hidden="true" /> {quantity > 0 ? `Add (${quantity})` : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
