"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  Search,
  Star,
  Bolt,
  Dumbbell,
  Leaf,
  CheckCircle2,
  Camera,
  Bird,
  ArrowRight,
} from "lucide-react";

import CaffedLogo from "../components/CaffedLogo";

/**
 * Hero: default `public/caffed-protein-hero.jpg` (replace that file with your export),
 * or set NEXT_PUBLIC_HERO_IMAGE=https://... to a hosted image.
 */
function getHeroImageSrc() {
  const fromEnv = process.env.NEXT_PUBLIC_HERO_IMAGE?.trim();
  if (fromEnv) return fromEnv;
  return "/caffed-protein-hero.jpg";
}

function isAbsoluteImageUrl(src) {
  return /^https?:\/\//i.test(src);
}

// --- COMPONENTS ---

const ANNOUNCEMENT_ITEMS = [
  "Free Shipping On Orders Over $50",
  "20G Protein",
  "100mg Caffeine",
  "Low Sugar",
  "Fuel Your Grind",
];

const AnnouncementBar = () => (
  <div className="overflow-hidden whitespace-nowrap border-b border-brand-gold/20 bg-brand-black py-2">
    <div className="flex animate-marquee">
      {[...Array(4)].map((_, repeat) =>
        ANNOUNCEMENT_ITEMS.map((item, i) => (
          <span
            key={`${repeat}-${i}`}
            className="font-heading text-xs uppercase tracking-widest text-brand-gold"
          >
            <span className="mx-10">{item}</span>
            <span className="mx-1 text-brand-goldLight">•</span>
          </span>
        ))
      )}
    </div>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-brand-gold/30 bg-brand-black/80 py-3 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="hidden space-x-8 font-heading text-sm tracking-wider text-white md:flex">
          <a href="#" className="transition hover:text-brand-gold">
            SHOP
          </a>
          <a href="#" className="transition hover:text-brand-gold">
            ABOUT
          </a>
        </div>
        <button className="text-brand-gold md:hidden">
          <Menu />
        </button>

        <div className="flex flex-col items-center">
          <h1 className="m-0 p-0">
            <img
              src="/logonobg.png"
              alt="Caffed Protein"
              className="h-20 w-auto object-contain"
            />
          </h1>
        </div>

        <div className="flex items-center space-x-5 text-white">
          <Search className="h-5 w-5 cursor-pointer transition hover:text-brand-gold" />
          <div className="group relative cursor-pointer">
            <ShoppingBag className="h-5 w-5 transition group-hover:text-brand-gold" />
            <span className="absolute -right-2 -top-2 rounded-full bg-brand-gold px-1.5 text-[10px] font-bold text-brand-black">
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const heroSrc = getHeroImageSrc();
  const heroRemote = isAbsoluteImageUrl(heroSrc);

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-radial-gradient from-brand-gold/10 to-transparent opacity-50" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-5 sm:gap-10 sm:px-6 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5 xl:col-span-5"
        >
          <span className="mb-3 block font-heading text-[10px] tracking-[0.22em] text-brand-gold sm:text-xs sm:tracking-[0.28em]">
            THE ORIGINAL CAFFEINATED PROTEIN BAR
          </span>
          <h2 className="mb-4 max-w-[16ch] text-4xl font-black leading-[0.95] text-white sm:text-5xl sm:leading-none lg:mb-5 lg:max-w-none lg:text-5xl xl:text-6xl">
            PROTEIN <br /> MEETS <br />{" "}
            <span className="bg-gradient-to-r from-brand-gold to-brand-goldLight bg-clip-text text-transparent">
              CAFFEINE
            </span>
          </h2>
          <p className="mb-6 max-w-xs text-sm font-medium leading-snug text-brand-goldLight sm:max-w-sm sm:text-base lg:mb-7">
            20g Protein · 100mg Caffeine
          </p>
          <button
            type="button"
            className="w-fit bg-brand-gold px-7 py-3 font-heading text-sm font-bold text-brand-black transition-transform hover:bg-brand-goldLight active:scale-95 sm:px-9 sm:py-3.5 sm:text-base"
          >
            SHOP NOW
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
          className="order-1 w-full lg:order-2 lg:col-span-7 xl:col-span-7"
        >
          <div className="relative mx-auto w-full max-w-[min(100%,420px)] lg:ml-auto lg:mr-0 lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-full bg-brand-gold/12 blur-[90px]" />
            <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-lg shadow-[0_28px_50px_rgba(200,168,78,0.2)] sm:rounded-xl">
              {heroRemote ? (
                <img
                  src={heroSrc}
                  alt="Two people holding Caffed Protein bars — opened chocolate bar and sealed black-and-gold packaging"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <Image
                  src={heroSrc}
                  alt="Two people holding Caffed Protein bars — opened chocolate bar and sealed black-and-gold packaging"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard = ({ name, price, status, img1, img2 }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative mb-4 aspect-square overflow-hidden border border-transparent bg-brand-charcoal transition-all group-hover:border-brand-gold/30">
        {status && (
          <span className="absolute left-4 top-4 z-20 bg-brand-gold px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-black">
            {status}
          </span>
        )}
        <img
          src={img1}
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={img2}
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <button className="w-full bg-white py-3 font-heading text-xs font-bold text-brand-black transition hover:bg-brand-gold">
            QUICK ADD +
          </button>
        </div>
      </div>
      <h3 className="mb-1 font-heading uppercase tracking-wide text-white">{name}</h3>
      <div className="flex items-center justify-between">
        <p className="font-bold text-brand-gold">${price}</p>
        <div className="flex text-brand-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsStrip = () => (
  <section className="border-y border-brand-gold/20 bg-brand-black py-20">
    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
      {[
        { icon: <Dumbbell />, val: "20g", label: "Protein" },
        { icon: <Bolt />, val: "100mg", label: "Caffeine" },
        { icon: <Leaf />, val: "Low", label: "Sugar" },
        { icon: <CheckCircle2 />, val: "Clean", label: "Ingredients" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          className="group text-center"
        >
          <div className="mb-4 flex justify-center text-brand-gold transition group-hover:scale-110">{stat.icon}</div>
          <h4 className="mb-1 text-3xl font-black uppercase tracking-tighter text-white">{stat.val}</h4>
          <p className="font-heading text-xs uppercase tracking-widest text-brand-gold">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-brand-gold/10 bg-brand-black pb-10 pt-20">
    <div className="mx-auto mb-16 grid max-w-7xl gap-12 px-6 md:grid-cols-4">
      <div>
        <div className="mb-6">
          <img
            src="/logonobg.png"
            alt="Caffed Protein"
            className="h-16 w-auto object-contain"
          />
        </div>
        <p className="text-sm leading-relaxed text-gray-400">
          Fueling the modern grind with premium protein and clean caffeine.
        </p>
      </div>
      <div>
        <h4 className="mb-6 font-heading text-xs tracking-widest text-white">SHOP</h4>
        <ul className="space-y-3 text-sm font-medium text-gray-400">
          <li className="cursor-pointer transition hover:text-brand-gold">Protein Bars</li>
          <li className="cursor-pointer transition hover:text-brand-gold">Subscribe & Save</li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 font-heading text-xs tracking-widest text-white">SUPPORT</h4>
        <ul className="space-y-3 text-sm font-medium text-gray-400">
          <li className="cursor-pointer transition hover:text-brand-gold">Shipping Policy</li>
          <li className="cursor-pointer transition hover:text-brand-gold">Returns</li>
          <li className="cursor-pointer transition hover:text-brand-gold">FAQ</li>
        </ul>
      </div>
      <div>
        <h4 className="mb-6 font-heading text-xs tracking-widest text-white">JOIN THE GRIND</h4>
        <div className="flex border-b border-brand-gold/50 pb-2">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border-none bg-transparent text-sm text-white focus:outline-none"
          />
          <button>
            <ArrowRight size={18} className="text-brand-gold" />
          </button>
        </div>
        <div className="mt-6 flex space-x-4 text-brand-gold">
          <Camera size={20} className="cursor-pointer" aria-hidden />
          <Bird size={20} className="cursor-pointer" aria-hidden />
        </div>
      </div>
    </div>
    <div className="text-center text-[10px] uppercase tracking-widest text-gray-600">
      © 2026 CAFFED. CO-PACKED BY ELEMENT BARS CHICAGO.
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-deep selection:bg-brand-gold selection:text-brand-black">
      <AnnouncementBar />
      <Navbar />
      <Hero />

      {/* Product Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 flex flex-col items-center">
          <h2 className="mb-2 font-heading text-4xl font-black uppercase text-white">Our Bars</h2>
          <div className="h-1 w-20 bg-brand-gold" />
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-3">
          <ProductCard
            name="Chocolate Peanut Butter"
            price="34.99"
            status="Best Seller"
            img1="/products/choc-pb-box.png"
            img2="/products/choc-pb-bar.png"
          />
          <ProductCard
            name="Rich Chocolate"
            price="34.99"
            status="Coming Soon"
            img1="/products/rich-choc-box.png"
            img2="/products/rich-choc-bar.png"
          />
          <ProductCard
            name="Cinnamon"
            price="34.99"
            status="Coming Soon"
            img1="/products/cinnamon-box.png"
            img2="/products/cinnamon-bar.png"
          />
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="overflow-hidden border-y border-brand-black bg-brand-gold py-3">
        <div className="flex animate-marquee-fast">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="mx-10 whitespace-nowrap text-2xl font-black uppercase tracking-tighter text-brand-black"
            >
              20G PROTEIN · 100MG CAFFEINE · LOW SUGAR · FUEL YOUR GRIND
            </span>
          ))}
        </div>
      </div>

      <StatsStrip />

      {/* Review Section */}
      <section className="overflow-hidden bg-brand-deep py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-4 font-heading text-3xl font-black uppercase text-white">What People Are Saying</h2>
              <div className="flex items-center space-x-2 text-brand-gold">
                <span className="text-2xl font-bold">4.8 / 5</span>
                <div className="flex">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex snap-x space-x-6 overflow-x-auto pb-8">
            {[
              {
                text: "Finally, a protein bar that actually wakes me up AND tastes good. Game changer.",
                author: "Alex R.",
              },
              {
                text: "I replaced my morning coffee with one of these before the gym. The energy is unreal.",
                author: "Jordan M.",
              },
              {
                text: "20g of protein AND caffeine? Why hasn't anyone done this before?",
                author: "Taylor S.",
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="min-w-[300px] snap-center border-l-4 border-brand-gold bg-brand-charcoal p-8 md:min-w-[400px]"
              >
                <div className="mb-4 flex text-brand-gold">
                  <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" />{" "}
                  <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" />{" "}
                  <Star size={14} fill="currentColor" />
                </div>
                <p className="mb-6 leading-relaxed text-white italic">&quot;{rev.text}&quot;</p>
                <p className="font-heading text-xs uppercase tracking-widest text-brand-gold">
                  {rev.author} — <span className="text-gray-500">Verified Customer</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
