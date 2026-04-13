"use client";

import { useId } from "react";

const ZAP_PATH =
  "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";

const logoGradient = {
  backgroundImage:
    "linear-gradient(90deg, #5c4a18 0%, #8a7028 18%, #C8A84E 42%, #E8D48B 72%, #D4AF37 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export default function CaffedLogo({ className = "", variant = "nav" }) {
  const gradId = useId().replace(/:/g, "");

  const isFooter = variant === "footer";
  const titleClass = isFooter
    ? "text-xl font-black tracking-tighter md:text-2xl"
    : "text-[1.35rem] font-black tracking-tighter sm:text-2xl md:text-[1.7rem]";
  const boltClass = isFooter ? "h-6 w-6 md:h-7 md:w-7" : "h-7 w-7 md:h-8 md:w-8";
  const tagClass = isFooter
    ? "mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] md:text-[9px]"
    : "mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] md:text-[10px]";

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-1 md:gap-1.5">
        <span className={`font-heading ${titleClass}`} style={logoGradient}>
          CAFFED
        </span>
        <svg className={`${boltClass} shrink-0`} viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5c4a18" />
              <stop offset="18%" stopColor="#8a7028" />
              <stop offset="42%" stopColor="#C8A84E" />
              <stop offset="72%" stopColor="#E8D48B" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          <path d={ZAP_PATH} fill={`url(#${gradId})`} />
        </svg>
      </div>
      <p className={`font-heading ${tagClass}`} style={logoGradient}>
        CAFFEINATED PROTEIN
      </p>
    </div>
  );
}
