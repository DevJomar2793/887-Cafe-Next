import Image from "next/image";
import { Coffee, Heart, Utensils } from "lucide-react";

const values = [
  { icon: Coffee, title: "Coffee for every mood", text: "Familiar favorites and non-coffee choices for any kind of break." },
  { icon: Utensils, title: "More than a quick sip", text: "Comforting pasta, rice meals, and shareable snacks made to satisfy." },
  { icon: Heart, title: "A place to slow down", text: "An easygoing café experience built around good company and good food." },
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden bg-cream py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative grid grid-cols-2 gap-4">
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-[2rem]">
            <Image src="/images/Pork Sisig.jpeg" alt="Sizzling pork sisig served at 887 Cafe" fill sizes="(max-width: 1024px) 45vw, 24vw" className="object-cover" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
            <Image src="/images/Chicken Popper Fries.jpeg" alt="Chicken popper fries served at 887 Cafe" fill sizes="(max-width: 1024px) 45vw, 24vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-orange px-6 py-4 text-center text-white shadow-xl">
            <p className="font-serif text-2xl font-bold">887</p>
            <p className="whitespace-nowrap text-xs font-black uppercase tracking-[0.18em]">Coffee · Food · Comfort</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange">The 887 feeling</p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-coffee sm:text-6xl">Your neighborhood kind of café.</h2>
          <p className="mt-6 text-lg leading-8 text-coffee/65">
            887 Cafe brings together laid-back coffee breaks and satisfying comfort food in one welcoming place. Drop in for a cup, stay for a meal, or order ahead when the day is moving fast.
          </p>
          <div className="mt-9 grid gap-5">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-2xl border bg-soft-white/60 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-sans text-base font-black text-coffee">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-coffee/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
