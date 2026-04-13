"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-deep px-6 text-center selection:bg-brand-gold selection:text-brand-black">
      <img src="/logonobg.png" alt="Caffed Protein" className="h-16 w-auto object-contain" />

      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold/10 ring-2 ring-brand-gold">
          <CheckCircle2 size={40} className="text-brand-gold" />
        </div>
        <h1 className="font-heading text-3xl font-black uppercase text-white">Order Confirmed!</h1>
        <p className="max-w-md text-gray-400">
          Thanks for your order. You'll receive a confirmation email shortly. Time to fuel the grind.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="bg-brand-gold px-10 py-3 font-heading font-bold uppercase text-brand-black transition hover:bg-brand-goldLight"
        >
          CONTINUE SHOPPING
        </Link>
        <Link
          href="/"
          className="border border-brand-gold px-10 py-3 font-heading font-bold uppercase text-brand-gold transition hover:bg-brand-gold hover:text-brand-black"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
