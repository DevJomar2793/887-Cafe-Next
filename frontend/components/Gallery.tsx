import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/MotionPrimitives";

const images = [
  { src: "/images/Lasagna.jpeg", alt: "Lasagna from the 887 Cafe kitchen", className: "sm:col-span-2" },
  { src: "/images/Nachos Overload.jpeg", alt: "Loaded nachos from 887 Cafe", className: "" },
  { src: "/images/Pansit Bihin.jpeg", alt: "Pansit bihon from 887 Cafe", className: "" },
];

export default function Gallery() {
  return (
    <section aria-labelledby="kitchen-heading" className="bg-coffee py-20 text-soft-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-orange">From the kitchen</p>
          <h2 id="kitchen-heading" className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">Good food deserves the spotlight.</h2>
        </Reveal>
        <Stagger className="grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <StaggerItem key={image.src} className={`relative overflow-hidden rounded-[1.75rem] ${image.className}`}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition duration-500 hover:scale-105" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
