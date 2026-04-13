"use client";

import { useCart } from "../../components/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart();

  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-brand-deep selection:bg-brand-gold selection:text-brand-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-brand-gold/20 bg-brand-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-brand-gold transition hover:text-brand-goldLight">
            <ArrowLeft size={18} />
            <span className="font-heading text-xs uppercase tracking-widest">Back</span>
          </Link>
          <img src="/logonobg.png" alt="Caffed Protein" className="h-14 w-auto object-contain" />
          <div className="w-20" />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-10 font-heading text-3xl font-black uppercase tracking-tight text-white">
          Your Cart
        </h1>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <ShoppingBag size={56} className="text-brand-gold/40" />
            <p className="text-lg font-medium text-gray-400">Your cart is empty.</p>
            <Link
              href="/"
              className="bg-brand-gold px-8 py-3 font-heading text-sm font-bold text-brand-black transition hover:bg-brand-goldLight"
            >
              SHOP NOW
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Item list */}
            <div className="lg:col-span-2">
              <ul className="divide-y divide-brand-gold/10">
                {items.map((item) => (
                  <li key={item.name} className="flex gap-5 py-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-brand-charcoal">
                      <img
                        src={item.img1}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-500">
                            20g Protein · 100mg Caffeine
                          </p>
                        </div>
                        <p className="font-bold text-brand-gold">
                          ${(item.qty * parseFloat(item.price)).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-0 border border-brand-gold/30">
                          <button
                            onClick={() => updateQty(item.name, item.qty - 1)}
                            className="px-3 py-1.5 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.name, item.qty + 1)}
                            className="px-3 py-1.5 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-gray-500 transition hover:text-red-400"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={clearCart}
                className="mt-4 text-xs text-gray-500 underline transition hover:text-gray-300"
              >
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="h-fit rounded-lg border border-brand-gold/20 bg-brand-charcoal p-6">
              <h2 className="mb-6 font-heading text-sm font-black uppercase tracking-widest text-white">
                Order Summary
              </h2>

              {/* Free shipping progress */}
              {!shippingFree && (
                <div className="mb-5">
                  <p className="mb-2 text-xs text-gray-400">
                    Add{" "}
                    <span className="font-bold text-brand-gold">
                      ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}
                    </span>{" "}
                    more for free shipping
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-black">
                    <div
                      className="h-full rounded-full bg-brand-gold transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {shippingFree && (
                <p className="mb-5 text-xs font-bold text-brand-gold">
                  🎉 You've unlocked free shipping!
                </p>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{shippingFree ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-brand-gold/20 pt-4 font-bold text-white">
                  <span>Total</span>
                  <span className="text-brand-gold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-brand-gold py-4 font-heading font-bold text-brand-black transition hover:bg-brand-goldLight active:scale-95"
                onClick={() => alert("Checkout coming soon!")}
              >
                PROCEED TO CHECKOUT
              </button>

              <Link
                href="/"
                className="mt-4 block text-center text-xs text-gray-500 underline transition hover:text-gray-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
