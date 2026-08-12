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
  className,
  href,
}: {
  label: string;
  className: string;
  href: string;
}) => (
  <a
    href={href}
    className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-[6px] bg-gradient-to-r from-[#FF5722] to-[#F4511E] shadow-[0_4px_20px_rgba(255,87,34,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(255,87,34,0.6)] ${className}`}
  >
    <p className="relative shrink-0 whitespace-nowrap text-[15px] font-bold leading-normal tracking-[0.02em] text-white">
      {label}
    </p>
  </a>
);

const DarkButton = ({
  label,
  className,
  href,
}: {
  label: string;
  className: string;
  href: string;
}) => (
  <a
    href={href}
    className={`relative flex shrink-0 cursor-pointer items-center justify-center rounded-[6px] border border-white/20 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)] ${className}`}
  >
    <p className="relative shrink-0 whitespace-nowrap text-[15px] font-bold leading-normal tracking-[0.02em] text-white">
      {label}
    </p>
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
        className="relative shrink-0 flex items-center justify-center rounded-full bg-[#2563EB] text-white border border-white/20 overflow-hidden"
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
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = trackInput.trim() || 'MS-884920';
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ms-track-shipment', { detail: code }));
    }
  };

  return (
    <div className="relative w-full min-h-[92vh] bg-gradient-to-b from-[#0F0F0F] via-[#0B1220] to-[#060B16] overflow-hidden text-white pt-36 sm:pt-44 lg:pt-48 pb-16 lg:pb-24 px-4 sm:px-8 lg:px-12 flex items-center justify-center">
      {/* Centered Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[800px] lg:w-[1000px] h-[550px] sm:h-[800px] lg:h-[1000px] bg-gradient-to-r from-[#2563EB]/20 via-[#FF5722]/15 to-transparent rounded-full blur-[170px]"></div>
      </div>

      {/* Centered Moving 3D Earth Globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[650px] lg:w-[750px] h-[340px] sm:h-[540px] md:h-[650px] lg:h-[750px] pointer-events-none rounded-full overflow-hidden opacity-90 z-0 shadow-[0_20px_80px_rgba(37,99,235,0.2)]">
        <MediaGlobe />
      </div>

      {/* Centered Hero Content Container (Foreground Overlay Layer) */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center gap-6 sm:gap-7">
        <Badge step={80} />

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <span className="text-white drop-shadow-md">WE MOVE YOUR </span>
          <br className="hidden sm:inline" />
          <span className="text-white drop-shadow-md">BUSINESS </span>
          <span
            style={{
              color: '#FF5722',
              backgroundImage: 'linear-gradient(135deg, #FF6E40 0%, #FF3D00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(255, 87, 34, 0.4))',
            }}
          >
            FORWARD.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-bold px-2 text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Smart, reliable and seamless logistics solutions connecting your cargo to the world with precision and on-time guaranteed delivery.
        </p>
      </div>
    </div>
  );
};
