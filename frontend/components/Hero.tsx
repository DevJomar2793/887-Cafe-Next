import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Clock3 } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-coffee pt-28 text-soft-white sm:pt-32">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,#c9572d_0,transparent_35%)]" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:pb-20">
        <div className="max-w-2xl py-8">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-cream">
            <Clock3 size={16} aria-hidden="true" />
            Made fresh for your next coffee break
          </div>
          <h1 className="text-balance text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[5.6rem]">
            Your cozy pause,
            <span className="mt-2 block font-sans text-orange">served at 887.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-cream/75 sm:text-xl">
            Coffee, comfort food, and the kind of atmosphere that makes you want to stay a little longer.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/order"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange px-7 font-extrabold text-white transition hover:bg-orange-dark"
            >
              Start an order <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <Link
              href="#menu"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 px-7 font-bold text-soft-white transition hover:bg-white/10"
            >
              See what&apos;s cooking <ArrowDown size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
          <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-orange blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-warm-black shadow-2xl sm:rounded-[3rem]">
            <Image
              src="/images/887bg.jpg"
              alt="The Eighty Eight Seven sign inside 887 Cafe"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee/70 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-coffee/75 p-5 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">Eighty Eight Seven</p>
              <p className="mt-2 text-lg font-bold text-white">A familiar corner for good food and better breaks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
