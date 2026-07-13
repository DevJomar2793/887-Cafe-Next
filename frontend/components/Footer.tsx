import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Our story", href: "#about" },
  { label: "Visit", href: "#visit" },
  { label: "Order online", href: "/order" },
];

export default function Footer() {
  return (
    <footer className="bg-warm-black py-12 text-soft-white sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <Link href="#home" className="inline-flex items-center gap-3" aria-label="887 Cafe home">
              <Image src="/images/logo.jpg" alt="" width={52} height={52} className="h-13 w-13 rounded-full object-cover" />
              <span className="text-xl font-black tracking-[0.14em]">887 CAFE</span>
            </Link>
            <p className="mt-5 leading-7 text-white/55">{siteConfig.description}</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-4">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-bold text-white/65 transition hover:text-orange">{link.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-2 pt-7 text-sm text-white/40 sm:flex-row">
          <p>© 2026 887 Cafe. All rights reserved.</p>
          <p>{siteConfig.address ?? "Location details coming soon"}</p>
        </div>
      </div>
    </footer>
  );
}
