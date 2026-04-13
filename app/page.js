import FeatureCard from "../components/FeatureCard";

const features = [
  {
    title: "Single-Origin Beans",
    description: "Carefully sourced lots from small farms, roasted to highlight origin character.",
  },
  {
    title: "Luxury Atmosphere",
    description: "A modern, intimate experience with warm lighting and premium service.",
  },
  {
    title: "Crafted Daily",
    description: "From espresso to pour-over, every cup is dialed in by trained baristas.",
  },
];

const marqueeWords = [
  "SPECIALTY COFFEE",
  "SMALL-BATCH ROASTS",
  "LIMITED RELEASES",
  "ARTISAN PASTRIES",
];

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="rounded-3xl border border-brand-charcoal bg-brand-deep/60 p-8 md:p-12">
          <p className="font-heading tracking-[0.24em] text-brand-gold">CAFFED</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl uppercase leading-tight text-white md:text-6xl">
            Coffee crafted with precision and character.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-300 md:text-lg">
            Build your next coffee brand presence with an elevated visual identity and a bold dark
            palette powered by Tailwind CSS.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold uppercase text-brand-black transition hover:bg-brand-goldLight">
              Explore Menu
            </button>
            <button className="rounded-full border border-brand-gold px-6 py-3 text-sm font-semibold uppercase text-brand-gold transition hover:bg-brand-gold hover:text-brand-black">
              Book a Table
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-brand-charcoal bg-brand-black py-4">
        <div className="animate-marquee-fast whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((item, idx) => (
            <span key={`${item}-${idx}`} className="mx-6 font-heading text-sm tracking-[0.2em] text-brand-goldMuted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl text-brand-goldLight md:text-4xl">Why choose Caffed</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </section>
    </main>
  );
}
