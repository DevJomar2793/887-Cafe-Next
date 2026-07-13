import type { CartItem } from "@/context/CartContext";

export const CURRENCY_SYMBOL = "$";

export function parseMenuPrice(price: string): number {
  const parsed = Number(price.replace(CURRENCY_SYMBOL, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatMoney(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}

export function getLineTotal(item: CartItem): number {
  return parseMenuPrice(item.price) * item.quantity;
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
