import Link from "next/link";
import { ArrowRight, MapPin, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/MotionPrimitives";

export default function MapSection() {
  const hasLocation = Boolean(siteConfig.address && siteConfig.mapsUrl);

  return (
    <section id="visit" className="bg-soft-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-orange text-white shadow-xl sm:rounded-[3rem]">
            <div className="grid lg:grid-cols-[1.1fr_.9fr]">
              <Reveal className="p-7 sm:p-12 lg:p-16" direction="right" distance={28} delay={0.08}>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/70">Plan your 887 break</p>
                <h2 className="mt-3 max-w-xl text-4xl font-bold leading-tight sm:text-6xl">We&apos;ll save you a good bite.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">
                  Browse the complete menu and send your pickup order before you head over.
                </p>
                <Link href="/order" className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-coffee px-7 font-extrabold text-white transition hover:bg-warm-black">
                  Order for pickup <ArrowRight size={19} aria-hidden="true" />
                </Link>
              </Reveal>
              <Reveal className="flex min-h-[320px] flex-col justify-between bg-coffee p-7 sm:p-12 lg:p-14" direction="left" distance={28} delay={0.16}>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange">
                  {hasLocation ? <MapPin size={28} aria-hidden="true" /> : <ShoppingBag size={28} aria-hidden="true" />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange">Visit us</p>
                  {hasLocation ? (
                    <>
                      <p className="mt-3 text-2xl font-bold">{siteConfig.address}</p>
                      <a href={siteConfig.mapsUrl ?? "#"} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-bold text-cream hover:text-orange">Get directions <ArrowRight size={17} /></a>
                    </>
                  ) : (
                    <>
                      <p className="mt-3 text-2xl font-bold">Location details coming soon.</p>
                      <p className="mt-3 max-w-sm leading-7 text-cream/65">We&apos;re preparing the latest visit information. You can still place a pickup order online.</p>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
