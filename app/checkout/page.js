"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "../../components/CartContext";

const FREE_SHIPPING_THRESHOLD = 50;

const INPUT =
  "w-full rounded-md border border-brand-gold/20 bg-brand-charcoal px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none transition";
const LABEL = "mb-1 block font-heading text-xs uppercase tracking-widest text-gray-400";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, totalItems, clearCart } = useCart();

  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : 6.99;
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = subtotal + shipping + tax;

  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    sameAsBilling: true,
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validate = () => {
    const e = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.zip || !/^\d{5}(-\d{4})?$/.test(form.zip)) e.zip = "Valid ZIP required";
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
    if (!form.cardName.trim()) e.cardName = "Required";
    if (!form.expiry || form.expiry.length < 5) e.expiry = "MM/YY required";
    if (!form.cvv || form.cvv.length < 3) e.cvv = "Required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1800));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0 && !loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand-deep px-6 text-center">
        <ShoppingBag size={48} className="text-brand-gold/40" />
        <p className="text-lg font-medium text-gray-400">Your cart is empty.</p>
        <Link href="/" className="bg-brand-gold px-8 py-3 font-heading text-sm font-bold text-brand-black transition hover:bg-brand-goldLight">
          SHOP NOW
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-deep selection:bg-brand-gold selection:text-brand-black">
      {/* Header */}
      <header className="border-b border-brand-gold/20 bg-brand-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/cart" className="flex items-center gap-2 text-brand-gold transition hover:text-brand-goldLight">
            <ArrowLeft size={18} />
            <span className="font-heading text-xs uppercase tracking-widest">Cart</span>
          </Link>
          <img src="/logonobg.png" alt="Caffed Protein" className="h-14 w-auto object-contain" />
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Lock size={13} />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* LEFT — Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-10">

            {/* Contact */}
            <section>
              <h2 className="mb-5 font-heading text-lg font-black uppercase text-white">Contact</h2>
              <div>
                <label className={LABEL}>Email</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} className={INPUT} />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>
            </section>

            {/* Shipping */}
            <section>
              <h2 className="mb-5 font-heading text-lg font-black uppercase text-white">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>First Name</label>
                    <input placeholder="John" value={form.firstName} onChange={set("firstName")} className={INPUT} />
                    {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>Last Name</label>
                    <input placeholder="Doe" value={form.lastName} onChange={set("lastName")} className={INPUT} />
                    {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Address</label>
                  <input placeholder="123 Main St" value={form.address} onChange={set("address")} className={INPUT} />
                  {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                </div>
                <div>
                  <label className={LABEL}>Apt / Suite (optional)</label>
                  <input placeholder="Apt 4B" value={form.apt} onChange={set("apt")} className={INPUT} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className={LABEL}>City</label>
                    <input placeholder="Chicago" value={form.city} onChange={set("city")} className={INPUT} />
                    {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>State</label>
                    <select value={form.state} onChange={set("state")} className={INPUT + " cursor-pointer"}>
                      <option value="">—</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="mt-1 text-xs text-red-400">{errors.state}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>ZIP</label>
                    <input placeholder="60601" value={form.zip} onChange={set("zip")} maxLength={10} className={INPUT} />
                    {errors.zip && <p className="mt-1 text-xs text-red-400">{errors.zip}</p>}
                  </div>
                </div>
                <div>
                  <label className={LABEL}>Phone (optional)</label>
                  <input type="tel" placeholder="(312) 555-0100" value={form.phone} onChange={set("phone")} className={INPUT} />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="mb-5 font-heading text-lg font-black uppercase text-white">Payment</h2>
              <div className="mb-3 flex items-center gap-2 rounded-md border border-brand-gold/20 bg-brand-charcoal px-4 py-2 text-xs text-gray-400">
                <Lock size={13} className="text-brand-gold" />
                Your payment info is encrypted and secure.
              </div>
              <div className="grid gap-4">
                <div>
                  <label className={LABEL}>Card Number</label>
                  <input
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={(e) => setForm((f) => ({ ...f, cardNumber: formatCard(e.target.value) }))}
                    maxLength={19}
                    className={INPUT + " tracking-widest"}
                  />
                  {errors.cardNumber && <p className="mt-1 text-xs text-red-400">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label className={LABEL}>Name on Card</label>
                  <input placeholder="John Doe" value={form.cardName} onChange={set("cardName")} className={INPUT} />
                  {errors.cardName && <p className="mt-1 text-xs text-red-400">{errors.cardName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>Expiry</label>
                    <input
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                      maxLength={5}
                      className={INPUT}
                    />
                    {errors.expiry && <p className="mt-1 text-xs text-red-400">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>CVV</label>
                    <input
                      placeholder="123"
                      value={form.cvv}
                      onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                      maxLength={4}
                      className={INPUT}
                    />
                    {errors.cvv && <p className="mt-1 text-xs text-red-400">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold py-4 font-heading text-base font-bold uppercase tracking-wide text-brand-black transition hover:bg-brand-goldLight active:scale-95 disabled:opacity-60"
            >
              {loading ? "PLACING ORDER…" : `PLACE ORDER · $${total.toFixed(2)}`}
            </button>

            <p className="text-center text-xs text-gray-500">
              By placing your order you agree to our{" "}
              <span className="underline cursor-pointer hover:text-gray-300">Terms</span> &amp;{" "}
              <span className="underline cursor-pointer hover:text-gray-300">Privacy Policy</span>.
            </p>
          </form>

          {/* RIGHT — Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            {/* Mobile toggle */}
            <button
              onClick={() => setOrderSummaryOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-t-lg border border-brand-gold/20 bg-brand-charcoal px-5 py-4 lg:hidden"
            >
              <span className="font-heading text-sm font-bold uppercase text-white">
                Order Summary ({totalItems} item{totalItems !== 1 ? "s" : ""})
              </span>
              <span className="font-bold text-brand-gold">${total.toFixed(2)}</span>
              {orderSummaryOpen ? <ChevronUp size={16} className="text-brand-gold" /> : <ChevronDown size={16} className="text-brand-gold" />}
            </button>

            <div className={`rounded-b-lg border border-t-0 border-brand-gold/20 bg-brand-charcoal p-5 lg:rounded-lg lg:border-t lg:border-brand-gold/20 ${orderSummaryOpen ? "block" : "hidden lg:block"}`}>
              {/* Items */}
              <ul className="mb-5 divide-y divide-brand-gold/10">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center gap-4 py-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-brand-black">
                      <img src={item.img1} alt={item.name} className="h-full w-full object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-black">
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-heading text-xs font-bold uppercase text-white">{item.name}</p>
                    </div>
                    <p className="font-bold text-brand-gold">${(item.qty * parseFloat(item.price)).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              {/* Free shipping progress */}
              {!shippingFree && (
                <div className="mb-4">
                  <p className="mb-1.5 text-xs text-gray-400">
                    Add <span className="font-bold text-brand-gold">${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)}</span> more for free shipping
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-black">
                    <div className="h-full rounded-full bg-brand-gold transition-all" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }} />
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 border-t border-brand-gold/10 pt-4 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span><span>{shippingFree ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Est. Tax (8%)</span><span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-brand-gold/20 pt-3 font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-brand-gold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
