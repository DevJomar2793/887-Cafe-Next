"use client";

import type { FormEvent } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatMoney, getLineTotal } from "@/lib/money";

interface CartPanelProps {
  idPrefix: string;
  customerName: string;
  setCustomerName: (value: string) => void;
  isSubmitting: boolean;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
}

export function CartPanel({ idPrefix, customerName, setCustomerName, isSubmitting, error, onSubmit, onClose }: CartPanelProps) {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="flex h-full flex-col bg-soft-white">
      <div className="flex items-center justify-between border-b px-5 py-5 sm:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange">Pickup order</p>
          <h2 className="mt-1 font-sans text-xl font-black text-coffee">Your cart</h2>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-coffee" aria-label="Close cart">
            <X aria-hidden="true" />
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-orange"><ShoppingBag size={28} aria-hidden="true" /></div>
          <p className="mt-5 font-black text-coffee">Your cart is ready when you are.</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-coffee/55">Add a drink, a meal, or a snack from the menu to get started.</p>
          {onClose && <button type="button" onClick={onClose} className="mt-6 min-h-11 rounded-full bg-coffee px-6 font-bold text-white">Browse menu</button>}
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
            {cart.map((item) => (
              <div key={item.id} className="rounded-2xl border bg-cream/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black leading-tight text-coffee">{item.name}</p>
                    <p className="mt-1 text-sm text-coffee/55">{item.price} each</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="flex h-10 w-10 items-center justify-center rounded-full text-coffee/45 transition hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${item.name}`}>
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-full border bg-soft-white">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-10 w-10 items-center justify-center rounded-full" aria-label={`Decrease ${item.name} quantity`}><Minus size={15} aria-hidden="true" /></button>
                    <span className="w-8 text-center text-sm font-black" aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-10 w-10 items-center justify-center rounded-full" aria-label={`Increase ${item.name} quantity`}><Plus size={15} aria-hidden="true" /></button>
                  </div>
                  <span className="font-black text-coffee">{formatMoney(getLineTotal(item))}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="border-t bg-soft-white p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between text-lg font-black text-coffee">
              <span>Total</span><span>{formatMoney(totalPrice)}</span>
            </div>
            <label htmlFor={`${idPrefix}-customer-name`} className="text-sm font-bold text-coffee">Pickup name</label>
            <input
              id={`${idPrefix}-customer-name`}
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              required
              autoComplete="name"
              maxLength={80}
              placeholder="Who is picking up?"
              className="mt-2 min-h-12 w-full rounded-xl border bg-cream px-4 text-base text-coffee placeholder:text-coffee/40 focus:border-orange"
              aria-describedby={error ? `${idPrefix}-order-error` : undefined}
            />
            {error && <p id={`${idPrefix}-order-error`} role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-orange px-6 font-extrabold text-white transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending order…</> : <>Place pickup order <ShoppingBag size={18} aria-hidden="true" /></>}
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-coffee/45">Payment is handled at pickup.</p>
          </form>
        </>
      )}
    </div>
  );
}
