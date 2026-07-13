import Link from "next/link";
import { Check } from "lucide-react";
import type { CartItem } from "@/context/CartContext";
import type { OrderResponse } from "@/lib/api";
import { formatMoney, getLineTotal } from "@/lib/money";

export interface OrderConfirmationData {
  order: OrderResponse;
  items: CartItem[];
}

export function OrderConfirmation({ confirmation, onReset }: { confirmation: OrderConfirmationData; onReset: () => void }) {
  return (
    <main className="min-h-screen bg-cream px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-[2rem] border bg-soft-white p-6 shadow-xl sm:p-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange text-white"><Check size={30} strokeWidth={3} aria-hidden="true" /></div>
          <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-orange">Order received</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-coffee sm:text-5xl">Thanks, {confirmation.order.customer_name}.</h1>
          <p className="mt-4 leading-7 text-coffee/60">Your pickup order is now marked as {confirmation.order.status.toLowerCase()}. Keep the order number below handy.</p>
          <div className="mt-8 rounded-2xl bg-coffee p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">Order number</p>
            <p className="mt-2 break-words font-mono text-2xl font-black">{confirmation.order.order_number}</p>
          </div>
          <div className="mt-6 space-y-3 border-b pb-6">
            {confirmation.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-coffee/65"><strong className="text-coffee">{item.quantity}×</strong> {item.name}</span>
                <span className="font-bold text-coffee">{formatMoney(getLineTotal(item))}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-5 text-lg font-black text-coffee"><span>Total</span><span>{formatMoney(confirmation.order.total_amount)}</span></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/" className="flex min-h-12 items-center justify-center rounded-full border font-extrabold text-coffee">Back home</Link>
            <button type="button" onClick={onReset} className="min-h-12 rounded-full bg-orange px-5 font-extrabold text-white">Order something else</button>
          </div>
        </div>
      </div>
    </main>
  );
}
