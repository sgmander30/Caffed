"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ShoppingBag, Plus, Minus,
  CheckCircle2, Zap, Dumbbell, Leaf, Star,
} from "lucide-react";
import { useCart } from "../../../components/CartContext";
import { PRODUCTS } from "../../../components/products";

export default function ProductDetail({ product }) {
  const { addItem, totalItems } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const isAvailable = product.status !== "Coming Soon";

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    window.location.href = "/cart";
  };

  return (
    <main className="min-h-screen bg-brand-deep selection:bg-brand-gold selection:text-brand-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-brand-gold/20 bg-brand-black/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-brand-gold transition hover:text-brand-goldLight"
          >
            <ArrowLeft size={18} />
            <span className="font-heading text-xs uppercase tracking-widest">Back</span>
          </Link>
          <img src="/logonobg.png" alt="Caffed Protein" className="h-14 w-auto object-contain" />
          <Link href="/cart" className="relative text-white transition hover:text-brand-gold">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-brand-gold px-1.5 text-[10px] font-bold text-brand-black">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE GALLERY */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-brand-charcoal shadow-[0_20px_50px_rgba(200,168,78,0.15)]"
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.status && (
                <span className="absolute left-4 top-4 bg-brand-gold px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-black">
                  {product.status}
                </span>
              )}
            </motion.div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                    activeImg === i
                      ? "border-brand-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col">
            <span className="mb-2 font-heading text-xs uppercase tracking-[0.25em] text-brand-gold">
              Caffed Protein
            </span>
            <h1 className="mb-1 font-heading text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              {product.name}
            </h1>
            <p className="mb-4 font-heading text-sm italic text-brand-goldLight">{product.tagline}</p>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs text-gray-400">4.8 · Verified reviews</span>
            </div>

            <p className="mb-5 text-3xl font-black text-brand-gold">${product.price}</p>

            {/* Quick macro tiles */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              {[
                { icon: <Dumbbell size={18} />, val: "20g", label: "Protein" },
                { icon: <Zap size={18} />, val: "100mg", label: "Caffeine" },
                { icon: <Leaf size={18} />, val: "5g", label: "Sugar" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-center gap-1 rounded-lg border border-brand-gold/20 bg-brand-charcoal py-3"
                >
                  <span className="text-brand-gold">{m.icon}</span>
                  <span className="font-black text-white">{m.val}</span>
                  <span className="font-heading text-[10px] uppercase tracking-widest text-brand-gold">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mb-6 leading-relaxed text-gray-300">{product.description}</p>

            <ul className="mb-8 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Buy controls */}
            {isAvailable ? (
              <>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-brand-gold/30">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-white">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-4 py-3 text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-4 font-heading font-bold uppercase tracking-wide transition active:scale-95 ${
                      added
                        ? "bg-brand-gold text-brand-black"
                        : "bg-brand-gold text-brand-black hover:bg-brand-goldLight"
                    }`}
                  >
                    {added ? "ADDED TO CART ✓" : "ADD TO CART"}
                  </button>
                </div>
                {added && (
                  <Link
                    href="/cart"
                    className="mt-3 text-center text-sm font-medium text-brand-gold underline transition hover:text-brand-goldLight"
                  >
                    View Cart →
                  </Link>
                )}
                <button
                  onClick={handleBuyNow}
                  className="mt-3 w-full border border-brand-gold py-4 font-heading font-bold uppercase tracking-wide text-brand-gold transition hover:bg-brand-gold hover:text-brand-black active:scale-95"
                >
                  BUY NOW
                </button>
              </>
            ) : (
              <div className="rounded-lg border border-brand-gold/20 bg-brand-charcoal px-6 py-4 text-center">
                <p className="font-heading text-sm font-bold uppercase tracking-widest text-brand-gold">
                  Coming Soon
                </p>
                <p className="mt-1 text-xs text-gray-400">Check back soon for this flavor.</p>
              </div>
            )}
          </div>
        </div>

        {/* NUTRITION + INGREDIENTS */}
        <div className="mt-20 grid gap-10 border-t border-brand-gold/10 pt-16 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-heading text-xl font-black uppercase text-white">Nutrition Facts</h2>
            <div className="divide-y divide-brand-gold/10 rounded-lg border border-brand-gold/20 bg-brand-charcoal">
              {product.macros.map((m) => (
                <div key={m.label} className="flex justify-between px-5 py-3 text-sm">
                  <span className="font-medium text-gray-300">{m.label}</span>
                  <span className="font-bold text-brand-gold">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 font-heading text-xl font-black uppercase text-white">Ingredients</h2>
            <p className="rounded-lg border border-brand-gold/20 bg-brand-charcoal px-5 py-4 text-sm leading-relaxed text-gray-300">
              {product.ingredients}
            </p>
            <h2 className="mb-4 mt-10 font-heading text-xl font-black uppercase text-white">Why Caffed?</h2>
            <ul className="space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-gold" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OTHER FLAVORS */}
        <div className="mt-20 border-t border-brand-gold/10 pt-16">
          <h2 className="mb-8 font-heading text-xl font-black uppercase text-white">Other Flavors</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group overflow-hidden rounded-lg border border-transparent bg-brand-charcoal transition hover:border-brand-gold/40"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={p.img1}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wide text-white">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 font-bold text-brand-gold">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
