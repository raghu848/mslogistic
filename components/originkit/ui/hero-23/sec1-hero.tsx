// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import React, { useState, type CSSProperties } from "react";
import { MediaGlobe, MediaStardust } from "@/components/originkit/ui/hero-23/media-globe";
import { ScaleFrame } from "@/components/originkit/ui/hero-23/scale-frame";

const A = "/originkit/hero-23";

const HELVETICA = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const NAV_LINKS = [
  { label: "Home", href: "#hero", active: true },
  { label: "About", href: "#about", active: false },
  { label: "Services", href: "#services", active: false },
  { label: "Network", href: "#network", active: false },
  { label: "Why Us", href: "#whyus", active: false },
  { label: "FAQ", href: "#faq", active: false },
  { label: "Contact", href: "#contact", active: false },
];

const FLAGS = [
  { src: `${A}/flag-canada.svg`, alt: "Canada" },
  { src: `${A}/flag-sweden.svg`, alt: "Sweden" },
  { src: `${A}/flag-brazil.svg`, alt: "Brazil" },
  { src: `${A}/flag-taiwan.svg`, alt: "Taiwan" },
  { src: `${A}/flag-liberia.svg`, alt: "Liberia" },
  { src: `${A}/flag-ireland.svg`, alt: "Ireland" },
];

const AVATARS = [1, 2, 3];

/** Entrance stagger. `hero-reveal` (globals.css) fades + lifts, and collapses to
 *  a plain fade under prefers-reduced-motion. */
const REVEAL = "animate-hero-reveal";
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** Linearly interpolates a Figma value between two viewport widths, clamped at
 *  both ends — used to grow the tablet frame into the desktop one. */
const interpolate = (from: [number, number], to: [number, number]) => {
  const [fromVw, fromPx] = from;
  const [toVw, toPx] = to;
  const slope = (toPx - fromPx) / (toVw - fromVw);
  const intercept = fromPx - slope * fromVw;
  const sign = intercept < 0 ? "-" : "+";
  const track = `calc(${(slope * 100).toFixed(3)}vw ${sign} ${Math.abs(intercept).toFixed(3)}px)`;
  const [min, max] = fromPx < toPx ? [fromPx, toPx] : [toPx, fromPx];
  return `clamp(${min}px, ${track}, ${max}px)`;
};

/** Tablet → desktop band (744px → 1280px). */
const fluidLg = (atTablet: number, atDesktop: number) =>
  interpolate([744, atTablet], [1280, atDesktop]);

const STARDUST = {
  particleDensity: 10,
  minSize: 1,
  maxSize: 1,
  speed: 10,
  particleSpeed: 1,
  movement: 6,
  angle: 184,
  particleColor: "#FFFFFF33",
  background: "#0F0F0F",
} as const;

const BUTTON_SHADOW =
  "drop-shadow-[0px_53px_7.5px_rgba(0,0,0,0),0px_34px_7px_rgba(0,0,0,0.01),0px_19px_6px_rgba(0,0,0,0.05),0px_9px_4.5px_rgba(0,0,0,0.09),0px_2px_2.5px_rgba(0,0,0,0.1)]";

const BUTTON_GRADIENT =
  "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, rgb(229, 229, 229) 0%, rgb(229, 229, 229) 100%)";

const LightButton = ({
  label,
  className = "",
  href,
}: {
  label: string;
  className?: string;
  href: string;
}) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5722] via-[#FF6E40] to-[#F4511E] text-white font-bold text-[14px] sm:text-[15px] tracking-wide uppercase shadow-[0_4px_25px_rgba(255,87,34,0.45)] hover:shadow-[0_8px_32px_rgba(255,87,34,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ${className}`}
  >
    <span className="whitespace-nowrap">{label}</span>
    <i className="fa-solid fa-arrow-right text-[12px] opacity-90 transition-transform duration-200 group-hover:translate-x-1"></i>
  </a>
);

const DarkButton = ({
  label,
  className = "",
  href,
}: {
  label: string;
  className?: string;
  href: string;
}) => (
  <a
    href={href}
    className={`group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/25 bg-white/[0.08] hover:bg-white/[0.16] hover:border-white/40 text-white font-bold text-[14px] sm:text-[15px] tracking-wide uppercase backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 ${className}`}
  >
    <i className="fa-solid fa-location-crosshairs text-[13px] text-[#FF6E40]"></i>
    <span className="whitespace-nowrap">{label}</span>
  </a>
);

const Badge = ({ step }: { step: number }) => (
  <div
    style={delay(step)}
    className={`${REVEAL} relative flex shrink-0 items-center justify-center gap-[10px] overflow-clip rounded-full border border-orange-500/30 bg-orange-500/10 px-[16px] py-[6px] shadow-sm`}
  >
    <div className="relative size-[6px] shrink-0 rounded-full bg-[#FF5722] animate-pulse"></div>
    <p style={{ color: '#FF5722' }} className="relative shrink-0 whitespace-nowrap text-[12px] leading-normal tracking-[0.08em] font-extrabold">
      FAST • SAFE • EVERYWHERE
    </p>
  </div>
);

const Corners = ({ size = "size-[10px]" }: { size?: string }) => (
  <>
    <div className={`absolute left-0 top-0 ${size}`}>
      <img alt="" className="block size-full max-w-none" src={`${A}/corner-tl.svg`} />
    </div>
    <div className={`absolute right-0 top-0 flex items-center justify-center ${size}`}>
      <div className="flex-none rotate-180 -scale-y-100">
        <div className={`relative ${size}`}>
          <img alt="" className="block size-full max-w-none" src={`${A}/corner-tr.svg`} />
        </div>
      </div>
    </div>
    <div className={`absolute bottom-0 right-0 flex items-center justify-center ${size}`}>
      <div className="flex-none rotate-180">
        <div className={`relative ${size}`}>
          <img alt="" className="block size-full max-w-none" src={`${A}/corner-tr.svg`} />
        </div>
      </div>
    </div>
    <div className={`absolute bottom-0 left-0 flex items-center justify-center ${size}`}>
      <div className="flex-none -scale-y-100">
        <div className={`relative ${size}`}>
          <img alt="" className="block size-full max-w-none" src={`${A}/corner-tl.svg`} />
        </div>
      </div>
    </div>
  </>
);

/** Every size below is a raw CSS length, so a caller can hand it a fixed px
 *  value (iPad / desktop frames) or a fluid clamp() (phones). */
const StatCard = ({
  className,
  shadow,
  media,
  value,
  caption,
  width,
  padding,
  gap,
  radius,
  border,
  valueSize,
  captionSize,
  tracking,
  position,
}: {
  className: string;
  shadow: string;
  media: React.ReactNode;
  value: string;
  caption: string;
  width: string;
  padding: string;
  gap: string;
  radius: string;
  border: string;
  valueSize: string;
  captionSize: string;
  tracking: string;
  position: CSSProperties;
}) => (
  <div
    className={`${REVEAL} absolute flex flex-col items-center border-solid border-[rgba(255,255,255,0.1)] bg-[#292929] ${className} ${shadow}`}
    style={{
      ...position,
      width,
      padding,
      gap,
      borderRadius: radius,
      borderWidth: border,
    }}
  >
    {media}
    {/* leading 1.15 = Figma's "normal" for Helvetica; keeps the two-line block
        at 36px (mobile) / 50px (desktop) so the card height matches the frame */}
    <div className="relative w-full shrink-0 text-center" style={{ letterSpacing: tracking }}>
      <p
        className="mb-0 font-bold leading-[1.15] text-[rgba(255,255,255,0.8)]"
        style={{ fontSize: valueSize }}
      >
        {value}
      </p>
      <p className="leading-[1.15] text-[rgba(255,255,255,0.6)]" style={{ fontSize: captionSize }}>
        {caption}
      </p>
    </div>
  </div>
);

const Avatars = ({ size, overlap }: { size: string; overlap: string }) => (
  <div className="relative flex shrink-0 items-center">
    {[1, 2, 3].map((n) => (
      <div
        key={n}
        className="relative shrink-0 flex items-center justify-center rounded-full bg-[#FF5722] text-white border border-white/20 overflow-hidden"
        style={{
          width: size,
          height: size,
          marginRight: n < 3 ? `calc(-1 * ${overlap})` : undefined,
          fontSize: `calc(${size} * 0.45)`,
        }}
      >
        <i className="fa-solid fa-user"></i>
      </div>
    ))}
  </div>
);

const FlagRow = ({
  size,
  gap,
  maskSize,
  maskPosition,
  offsetX = "0px",
  offsetY = "0px",
}: {
  size: string;
  gap: string;
  maskSize: string;
  maskPosition?: string;
  offsetX?: string;
  offsetY?: string;
}) => (
  <div className="relative inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start">
    <div
      className="relative col-start-1 row-start-1 flex items-center"
      style={{
        gap,
        marginLeft: `calc(-1 * ${offsetX})`,
        marginTop: offsetY,
        maskImage: `url("${A}/flags-mask.svg")`,
        WebkitMaskImage: `url("${A}/flags-mask.svg")`,
        maskMode: "alpha",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize,
        WebkitMaskSize: maskSize,
        ...(maskPosition
          ? { maskPosition, WebkitMaskPosition: maskPosition }
          : {}),
      }}
    >
      {FLAGS.map((flag) => (
        <div
          key={flag.alt}
          className="relative shrink-0"
          style={{ width: size, height: size }}
        >
          <img alt={flag.alt} className="absolute inset-0 block size-full max-w-none" src={flag.src} />
        </div>
      ))}
    </div>
  </div>
);

// iPad and desktop share one card size (Figma 2001:35156 / 2001:58408).
const BIG_CARD = {
  className: "overflow-clip",
  padding: "12px",
  gap: "8px",
  radius: "6px",
  border: "1px",
  valueSize: "28px",
  captionSize: "16px",
  tracking: "-0.4px",
} as const;

const BIG_CARD_LEFT = {
  ...BIG_CARD,
  width: "166px",
  value: "10K+",
  caption: "shipments delivered",
  media: <Avatars size="24px" overlap="12px" />,
};

const BIG_CARD_RIGHT = {
  ...BIG_CARD,
  width: "171px",
  value: "50+",
  caption: "countries served",
  media: <FlagRow size="24px" gap="8px" maskSize="184px 24px" />,
};

const CARD_SHADOW_LEFT_DESKTOP =
  "shadow-[0px_86px_24px_0px_rgba(186,186,186,0),0px_55px_22px_0px_rgba(186,186,186,0.01),0px_31px_19px_0px_rgba(186,186,186,0.05),0px_14px_14px_0px_rgba(186,186,186,0.09),0px_3px_8px_0px_rgba(186,186,186,0.1)]";
const CARD_SHADOW_RIGHT_DESKTOP =
  "shadow-[0px_86px_24px_0px_rgba(186,186,186,0),0px_55px_22px_0px_rgba(186,186,186,0.01),0px_31px_19px_0px_rgba(186,186,186,0.05),0px_14px_14px_0px_rgba(186,186,186,0.09),0px_3px_8px_0px_rgba(186,186,186,0.1)]";
const CARD_SHADOW_LEFT_MOBILE =
  "shadow-[0px_35.467px_9.898px_0px_rgba(186,186,186,0),0px_22.683px_9.073px_0px_rgba(186,186,186,0.01),0px_12.785px_7.836px_0px_rgba(186,186,186,0.05),0px_5.774px_5.774px_0px_rgba(186,186,186,0.09),0px_1.237px_3.299px_0px_rgba(186,186,186,0.1)]";
const CARD_SHADOW_RIGHT_MOBILE =
  "shadow-[0px_35.467px_9.898px_0px_rgba(186,186,186,0),0px_22.683px_9.073px_0px_rgba(186,186,186,0.01),0px_12.785px_7.836px_0px_rgba(186,186,186,0.05),0px_5.774px_5.774px_0px_rgba(186,186,186,0.09),0px_1.237px_3.299px_0px_rgba(186,186,186,0.1)]";

const BRAND_ART = {
  one: (
    <>
      <div className="absolute inset-[10.01%_0.01%_7.49%_24.08%]">
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src={`${A}/brand-1-type.svg`}
        />
      </div>
      <div className="absolute inset-[0_78.9%_0_-0.01%]">
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src={`${A}/brand-1-mark.svg`}
        />
      </div>
    </>
  ),
  two: (
    <div className="absolute inset-[0_0_-0.01%_0]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/brand-2.svg`} />
    </div>
  ),
  three: (
    <div className="absolute inset-[-0.02%_0_0.02%_0]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/brand-3.svg`} />
    </div>
  ),
  four: (
    <div className="absolute inset-[0_-0.01%_0_0.01%]">
      <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/brand-4.svg`} />
    </div>
  ),
} as const;

type BrandCell = { art: keyof typeof BRAND_ART; size: string };

// Logo box sizes are identical on iPad and desktop; only mobile shrinks them.
const BRAND_SIZE = {
  one: "h-[23.741px] w-[130.577px]",
  two: "h-[19.975px] w-[84.396px]",
  three: "h-[34.569px] w-[86.421px]",
  four: "h-[22.045px] w-[97px]",
} as const;

const MOBILE_CELLS: BrandCell[] = [
  { art: "one", size: "h-[17.806px] w-[97.933px]" },
  { art: "two", size: "h-[14.982px] w-[63.297px]" },
  { art: "three", size: "h-[25.926px] w-[64.816px]" },
];

const IPAD_CELLS: BrandCell[] = [
  { art: "one", size: BRAND_SIZE.one },
  { art: "three", size: BRAND_SIZE.three },
  { art: "four", size: BRAND_SIZE.four },
  { art: "two", size: BRAND_SIZE.two },
];

const DESKTOP_CELLS: BrandCell[] = [
  { art: "one", size: BRAND_SIZE.one },
  { art: "two", size: BRAND_SIZE.two },
  { art: "three", size: BRAND_SIZE.three },
  { art: "four", size: BRAND_SIZE.four },
  { art: "two", size: BRAND_SIZE.two },
];

const LogoStrip = ({
  className,
  cells,
  style,
}: {
  className: string;
  cells: BrandCell[];
  style?: CSSProperties;
}) => (
  <div
    className={`${REVEAL} flex items-center border border-solid border-[rgba(255,255,255,0.1)] bg-[#0f0f0f] ${className}`}
    style={style}
  >
    {cells.map((cell, index) => (
      <div
        key={index}
        className={`relative h-full min-w-px flex-[1_0_0] overflow-clip ${
          index < cells.length - 1 ? "border-r border-solid border-[rgba(255,255,255,0.1)]" : ""
        }`}
      >
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip ${cell.size}`}
        >
          {BRAND_ART[cell.art]}
        </div>
      </div>
    ))}
    <Corners />
  </div>
);

export const Sec1Hero = () => {
  return (
    <div className="relative w-full min-h-[760px] lg:min-h-screen bg-[#0F1117] text-white flex flex-col justify-between overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[550px] sm:w-[800px] lg:w-[1000px] h-[550px] sm:h-[800px] lg:h-[1000px] bg-gradient-to-r from-[#FF5A1F]/15 via-[#FF6B35]/10 to-transparent rounded-full blur-[180px]"></div>
      </div>

      {/* Main Hero Container: Perfectly matching navbar width: min(1400px, calc(100% - 80px)) */}
      <div className="relative z-10 w-full pt-32 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 flex-1 flex items-center">
        <div
          style={{
            width: 'min(1400px, calc(100% - 80px))',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
          className="w-full"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-10 items-center">
            
            {/* LEFT Column (48% width): Hero text + buttons */}
            <div className="flex flex-col items-start text-left w-full max-w-[600px]">
              {/* 3. Eyebrow */}
              <div style={delay(0)} className={`${REVEAL} mb-5`}>
                <span
                  style={{ color: '#FF5A1F', letterSpacing: '0.08em' }}
                  className="text-[12px] font-semibold uppercase opacity-90 block"
                >
                  FAST • SAFE • EVERYWHERE
                </span>
              </div>

              {/* 4. Main Heading */}
              <h1
                style={{
                  ...delay(150),
                  color: '#FFFFFF',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.7)',
                  lineHeight: 1.02,
                }}
                className={`${REVEAL} text-[clamp(42px,4.5vw,74px)] font-[800] tracking-[-0.02em] mb-6 text-left`}
              >
                <span style={{ color: '#FFFFFF', display: 'block' }}>WE MOVE YOUR</span>
                <span style={{ color: '#FFFFFF', display: 'block' }}>BUSINESS</span>
                <span
                  style={{
                    color: '#FF5A1F',
                    display: 'block',
                    textShadow: '0 4px 25px rgba(255, 90, 31, 0.45)',
                  }}
                >
                  FORWARD.
                </span>
              </h1>

              {/* 5. Description: max-w 560px, 18px font, 1.6 line-height, 28px bottom margin */}
              <p
                style={{ ...delay(300), color: '#D1D5DB' }}
                className={`${REVEAL} text-[16px] sm:text-[18px] leading-[1.6] max-w-[560px] mb-8 font-normal`}
              >
                Smart, reliable and seamless logistics solutions connecting your cargo to the world with precision and on-time guaranteed delivery.
              </p>

              {/* 6. CTA Buttons: 52px height, 16px gap */}
              <div style={delay(450)} className={`${REVEAL} flex flex-wrap items-center gap-4 w-full sm:w-auto`}>
                <a
                  href="#quote"
                  style={{
                    backgroundColor: '#FF5A1F',
                    color: '#FFFFFF',
                    height: '52px',
                    padding: '0 32px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(255,90,31,0.35)',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:-translate-y-0.5 active:translate-y-0 hover:bg-[#FF6B35] w-full sm:w-auto"
                >
                  <span>GET A QUOTE</span>
                  <span style={{ fontSize: '16px' }}>→</span>
                </a>
                <a
                  href="#services"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                    height: '52px',
                    padding: '0 32px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                >
                  <span>TRACK SHIPMENT</span>
                </a>
              </div>
            </div>

            {/* RIGHT Column (52% width): 8. 3D Globe Canvas */}
            <div className="flex items-center justify-center relative w-full h-[360px] sm:h-[460px] md:h-[520px] lg:h-[580px] xl:h-[640px] overflow-hidden">
              <div className="relative w-full h-full max-w-[620px] aspect-square flex items-center justify-center rounded-full overflow-hidden drop-shadow-[0_20px_60px_rgba(255,90,31,0.2)]">
                <MediaGlobe />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 9 & 10. Hero Statistics Bar (Bottom, Evenly Distributed across 4 Columns in matching centered container) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-gradient-to-t from-[#090C12] via-[#0F1117]/90 to-transparent py-7 sm:py-9">
        <div
          style={{
            width: 'min(1400px, calc(100% - 80px))',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10"
        >
          <div className="text-center py-2 md:py-0 md:px-4">
            <div className="text-[28px] sm:text-[32px] font-bold text-white leading-none">10+</div>
            <div className="text-[13px] text-[#9CA3AF] mt-2 font-medium">Years Experience</div>
          </div>
          <div className="text-center py-2 md:py-0 md:px-4">
            <div className="text-[28px] sm:text-[32px] font-bold text-white leading-none">50K+</div>
            <div className="text-[13px] text-[#9CA3AF] mt-2 font-medium">Shipments Handled</div>
          </div>
          <div className="text-center py-2 md:py-0 md:px-4">
            <div className="text-[28px] sm:text-[32px] font-bold text-white leading-none">98.2%</div>
            <div className="text-[13px] text-[#9CA3AF] mt-2 font-medium">On-Time Delivery</div>
          </div>
          <div className="text-center py-2 md:py-0 md:px-4">
            <div className="text-[28px] sm:text-[32px] font-bold text-white leading-none">24/7</div>
            <div className="text-[13px] text-[#9CA3AF] mt-2 font-medium">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
