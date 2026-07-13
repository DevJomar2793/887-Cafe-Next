import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuItems } from "@/lib/data";

const featuredIds = [16, 9, 13, 15, 1, 5];
const featuredItems = featuredIds
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is (typeof menuItems)[number] => Boolean(item));

export default function Menu() {
  return (
    <section id="menu" className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange">Popular at 887</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight text-coffee sm:text-6xl">Come hungry. Leave happy.</h2>
            <p className="mt-5 text-lg leading-8 text-coffee/65">
              From café classics to filling Filipino favorites, there is always something worth coming back for.
            </p>
          </div>
          <Link
            href="/order"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-coffee/15 px-6 font-extrabold text-coffee transition hover:border-orange hover:text-orange"
          >
            Browse the full menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item, index) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-[1.75rem] border bg-cream shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-soft-white/95 px-3 py-1.5 text-xs font-extrabold text-coffee shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                <div>
                  <h3 className="text-xl font-bold text-coffee">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-coffee/60">{item.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-orange px-3 py-1.5 text-sm font-black text-white">{item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
