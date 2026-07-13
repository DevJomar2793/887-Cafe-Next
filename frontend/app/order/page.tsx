"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { CartPanel } from "@/components/order/CartPanel";
import { OrderConfirmation, type OrderConfirmationData } from "@/components/order/OrderConfirmation";
import { ProductCard } from "@/components/order/ProductCard";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/api";
import { menuCategories, menuItems } from "@/lib/data";
import { formatMoney, getCartItemCount } from "@/lib/money";

export default function OrderPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmationData | null>(null);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerFocusRef = useRef<HTMLSpanElement>(null);

  const itemCount = getCartItemCount(cart);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !normalizedQuery || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  useEffect(() => {
    if (!isCartOpen) return;
    const cartTrigger = cartTriggerRef.current;
    document.body.style.overflow = "hidden";
    drawerFocusRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
      cartTrigger?.focus();
    };
  }, [isCartOpen]);

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0 || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    const orderedItems = cart.map((item) => ({ ...item }));
    try {
      const order = await placeOrder({ customer_name: customerName.trim(), total_amount: totalPrice });
      setConfirmation({ order, items: orderedItems });
      clearCart();
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "We could not send your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return <OrderConfirmation confirmation={confirmation} onReset={() => { setConfirmation(null); setCustomerName(""); }} />;
  }

  const cartPanelProps = { customerName, setCustomerName, isSubmitting, error, onSubmit: submitOrder };

  return (
    <main className="min-h-screen bg-cream pb-28 lg:pb-12">
      <header className="border-b bg-coffee text-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/70 transition hover:text-orange"><ArrowLeft size={18} aria-hidden="true" /> Back to 887 Cafe</Link>
          <div className="mt-8 max-w-2xl pb-4">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange">Order for pickup</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">What are you craving?</h1>
            <p className="mt-4 text-lg text-white/60">Choose your favorites, add a pickup name, and we&apos;ll send your order to the café.</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-12">
        <section aria-label="Cafe menu" className="min-w-0">
          <div className="sticky top-0 z-20 -mx-5 bg-cream/95 px-5 pb-5 pt-2 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:relative lg:mx-0 lg:bg-transparent lg:p-0">
            <label className="relative block">
              <span className="sr-only">Search the menu</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" size={20} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search food and drinks" className="min-h-13 w-full rounded-full border bg-soft-white pl-12 pr-5 text-base text-coffee shadow-sm placeholder:text-coffee/40 focus:border-orange" />
            </label>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Menu categories">
              {menuCategories.map((menuCategory) => (
                <button key={menuCategory} type="button" onClick={() => setCategory(menuCategory)} aria-pressed={category === menuCategory} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-extrabold transition ${category === menuCategory ? "bg-orange text-white" : "border bg-soft-white text-coffee hover:border-orange"}`}>{menuCategory}</button>
              ))}
            </div>
          </div>

          <p className="mb-5 mt-2 text-sm font-bold text-coffee/50" aria-live="polite">{filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}</p>
          {filteredItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filteredItems.map((item) => <ProductCard key={item.id} item={item} />)}</div>
          ) : (
            <div className="rounded-[2rem] border border-dashed bg-soft-white p-10 text-center"><p className="font-black text-coffee">No menu items match that search.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-4 min-h-11 rounded-full bg-coffee px-6 font-bold text-white">Clear filters</button></div>
          )}
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-3rem)] overflow-hidden rounded-[2rem] border shadow-lg">
            <CartPanel idPrefix="desktop" {...cartPanelProps} />
          </div>
        </aside>
      </div>

      <button ref={cartTriggerRef} type="button" onClick={() => setIsCartOpen(true)} className="fixed inset-x-4 bottom-4 z-30 flex min-h-16 items-center justify-between rounded-full bg-orange px-6 text-left text-white shadow-2xl lg:hidden" aria-haspopup="dialog" aria-expanded={isCartOpen}>
        <span><span className="block text-xs font-bold text-white/70">{itemCount} {itemCount === 1 ? "item" : "items"}</span><span className="font-black">View your order</span></span>
        <span className="font-black">{formatMoney(totalPrice)}</span>
      </button>

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Your pickup order">
            <motion.button type="button" aria-label="Close cart" className="absolute inset-0 h-full w-full bg-coffee/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="absolute inset-x-0 bottom-0 h-[88vh] overflow-hidden rounded-t-[2rem] shadow-2xl">
              <span ref={drawerFocusRef} tabIndex={-1} className="sr-only">Cart opened</span>
              <CartPanel idPrefix="mobile" {...cartPanelProps} onClose={() => setIsCartOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
