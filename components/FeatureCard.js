export default function FeatureCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-brand-charcoal bg-brand-deep p-6 shadow-[0_0_0_1px_rgba(200,168,78,0.1)]">
      <h3 className="font-heading text-xl text-brand-goldLight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-300">{description}</p>
    </article>
  );
}
