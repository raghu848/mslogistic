// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import type { MouseEvent } from "react";

import TextSphere from "@/components/originkit/ui/hero-09/text-sphere";

function asset(file: string) {
  return `/originkit/hero-09/${file}`;
}

const blockNav = (event: MouseEvent) => {
  event.preventDefault();
};

const NAV_ITEMS = ["Home", "Pricing", "About", "Tools"] as const;

/**
 * Ported from diip3sh/sections app/section-40 (Tailwind rewrite of the word-globe hero).
 *
 * | source            | here                     | shift |
 * | ----------------- | ------------------------ | ----- |
 * | `max-width: 420`  | base                     | —     |
 * | `421 – 800`       | `iphone-max:` 430        | +10   |
 * | `801 – 1024`      | `ipad-landscape:` 1024   | +223  |
 * | `1025 – 1279`     | `ipad-landscape:`        | +1    |
 * | `min-width: 1280` | `desktop-sm:`            | —     |
 *
 * The row tier therefore starts at 1024 rather than at the source's 801, which
 * hands the whole `ipad:` band — 768 to 1023 — back to the stacked composition:
 * globe on top, copy centred under it.
 *
 * Action CTAs stay visible at every tier (the shared source `BUTTON` token had
 * `hidden desktop-sm:inline-flex`, which hid the hero pair on phones — only the
 * nav CTA is desktop-only).
 */

const PAGE =
  "w-full bg-[#f2f2f2] font-[family-name:Arial,Helvetica,sans-serif] text-[#080808] antialiased [color-scheme:light]";

const SHELL =
  "relative mx-auto w-full max-w-[1710px] overflow-hidden bg-[#f2f2f2] min-h-[100svh] h-[max(100svh,calc(620px+min(500px,100vw)))] ipad-landscape:h-[max(62.5vw,100svh)] desktop-sm:h-[max(800px,100svh)]";

const NAV_BAR =
  "relative z-10 grid grid-cols-[1fr_auto] items-center border-b border-black/10 h-[76px] px-[32px] ipad-landscape:grid-cols-[1fr_auto_1fr] ipad-landscape:h-[5.78125vw] ipad-landscape:px-[4.53125vw] desktop-sm:h-[74px] desktop-sm:px-[58px]";

const NAV_LINK =
  "transition-opacity duration-[160ms] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080808] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-50";

/** Shared button chrome — visible by default (nav CTA adds its own `hidden`). */
const BUTTON =
  "inline-flex items-center justify-center whitespace-nowrap tracking-[-0.02em] text-[16px] transition-colors duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#080808] ipad-landscape:text-[1.25vw] desktop-sm:text-[16px]";

const BUTTON_DARK =
  "bg-[#080808] text-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#323232]";
const BUTTON_LIGHT =
  "border border-black/10 bg-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#e8e8e8]";

const NAV_CTA_BOX = "min-h-[48px] px-[16px] py-[12px]";

const ACTION_BOX =
  "min-h-[48px] min-w-[100px] px-[24px] py-[16px] ipad-landscape:min-h-[3.75vw] ipad-landscape:min-w-[7.8125vw] ipad-landscape:px-[1.875vw] ipad-landscape:py-[1.25vw] desktop-sm:min-h-[48px] desktop-sm:min-w-[clamp(100px,7.8125vw,125px)] desktop-sm:px-[clamp(24px,1.875vw,30px)] desktop-sm:py-[clamp(16px,1.25vw,20px)]";

const STAT_CELL =
  "flex flex-col gap-[8px] border-l border-black/10 px-[16px] py-[16px] text-center first:border-l-0 iphone-max:px-[20px] ipad:border-y ipad:border-r ipad:first:border-l ipad-landscape:border-y-0 ipad-landscape:border-r-0 ipad-landscape:first:border-l-0 ipad-landscape:gap-[0.625vw] ipad-landscape:px-[1.25vw] ipad-landscape:py-[0.9375vw] ipad-landscape:text-left desktop-sm:gap-[clamp(8px,0.625vw,10px)] desktop-sm:px-[clamp(16px,1.25vw,20px)] desktop-sm:py-[clamp(12px,0.9375vw,15px)]";

export const SectionHero = () => (
  <main className={PAGE}>
    <div className={SHELL}>
      <header className={NAV_BAR}>
        <a
          className="relative block h-[28px] w-[40px] ipad-landscape:h-[2.1875vw] ipad-landscape:w-[3.125vw] desktop-sm:h-[28px] desktop-sm:w-[40px]"
          href="#"
          aria-label="Origin home"
          onClick={blockNav}
        >
          <img
            src={asset("logo-wordglobe.svg")}
            alt=""
            width={40}
            height={28}
            className="block h-full w-full"
          />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden tracking-[-0.02em] ipad-landscape:flex ipad-landscape:gap-[1.875vw] ipad-landscape:text-[1.25vw] desktop-sm:gap-[24px] desktop-sm:text-[16px]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={blockNav}
              className={NAV_LINK}
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className={`flex min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-end justify-self-end ipad-landscape:hidden ${NAV_LINK}`}
        >
          <span
            aria-hidden
            className="flex h-[14px] w-[22px] flex-col justify-between"
          >
            <span className="block h-px w-full bg-[#080808]" />
            <span className="block h-px w-full bg-[#080808]" />
            <span className="block h-px w-full bg-[#080808]" />
          </span>
        </button>

        <a
          className={`hidden justify-self-end desktop-sm:inline-flex ${BUTTON} ${NAV_CTA_BOX} ${BUTTON_DARK}`}
          href="#"
          onClick={blockNav}
        >
          Get started
        </a>
      </header>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-[3] inset-x-[20px] border-x border-black/10 ipad-landscape:inset-x-[3.75vw] desktop-sm:inset-x-[48px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute z-0 top-[76px] right-[20px] bottom-0 left-[20px] bg-top bg-repeat-y bg-[length:100%_auto] ipad-landscape:top-[5.78125vw] ipad-landscape:right-[3.75vw] ipad-landscape:left-[3.75vw] desktop-sm:top-[74px] desktop-sm:right-[48px] desktop-sm:left-[48px]"
        style={{ backgroundImage: `url(${asset("word-globe-background.svg")})` }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-full max-h-[1192px]">
        <div className="pointer-events-auto absolute z-[2] left-1/2 -translate-x-1/2 top-[80px] h-[min(500px,100vw)] w-[min(500px,100vw)] ipad-landscape:top-[1.5625vw] ipad-landscape:h-[56.25vw] ipad-landscape:w-[56.25vw] desktop-sm:top-[20px] desktop-sm:h-[clamp(720px,calc(100svh-60px),900px)] desktop-sm:w-[clamp(720px,calc(100svh-60px),900px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:top-[clamp(20px,12svh,200px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:h-[clamp(720px,72vw,1100px)] ipad-landscape:[@media(max-aspect-ratio:4/3)]:w-[clamp(720px,72vw,1100px)]">
          <TextSphere
            word="###"
            color="#d77d84"
            font={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 500,
              fontSize: 15,
            }}
            speed={7}
            rotationSide="clockwise"
            twist={50}
            letterSpacing={240}
          />
        </div>

        <section className="pointer-events-auto absolute z-[5] left-1/2 flex -translate-x-1/2 justify-between top-[calc(96px+min(500px,100vw))] w-[calc(100%-48px)] flex-col items-stretch gap-[36px] iphone-max:w-[calc(100%-64px)] ipad-landscape:top-auto ipad-landscape:bottom-[3.75vw] ipad-landscape:w-[90.9375vw] ipad-landscape:flex-row ipad-landscape:items-end ipad-landscape:gap-0 desktop-sm:bottom-[48px] desktop-sm:w-[calc(100%-116px)]">
          <div className="w-full ipad-landscape:w-[35.78125vw] desktop-sm:w-[clamp(500px,38vw,608px)]">
            <h1 className="m-0 text-center font-normal leading-[0.97] tracking-[-0.04em] text-[clamp(40px,11vw,42px)] ipad:text-[48px] ipad-landscape:text-[3.75vw] ipad-landscape:text-left desktop-sm:text-[clamp(53px,4.1vw,66px)] text-balance ipad:max-w-[461px] ipad:mx-auto desktop-sm:max-w-none">
              Building the Economy of Tomorrow
            </h1>

            <div
              id="get-started"
              className="flex flex-col justify-center gap-[8px] mt-[16px] ipad:flex-row ipad:gap-[16px] ipad-landscape:gap-[1.25vw] ipad-landscape:mt-[1.25vw] ipad-landscape:justify-start desktop-sm:gap-[clamp(16px,1.25vw,20px)] desktop-sm:mt-[clamp(16px,1.25vw,20px)]"
            >
              <a
                className={`w-full ipad:w-auto ${BUTTON} ${ACTION_BOX} ${BUTTON_DARK}`}
                href="#"
                onClick={blockNav}
              >
                Get started
              </a>
              <a
                className={`w-full ipad:w-auto ${BUTTON} ${ACTION_BOX} ${BUTTON_LIGHT}`}
                href="#"
                onClick={blockNav}
              >
                Book a call
              </a>
            </div>
          </div>

          <div className="w-full ipad-landscape:w-[29.375vw] desktop-sm:w-[clamp(406px,31.5vw,504px)]">
            <p className="mx-auto max-w-[461px] text-center leading-[1.4] text-black/60 mb-[16px] text-[14px] iphone-max:text-[16px] ipad-landscape:mx-0 ipad-landscape:mb-[1.25vw] ipad-landscape:max-w-none ipad-landscape:text-[1.25vw] ipad-landscape:text-left desktop-sm:mb-[clamp(16px,1.25vw,20px)] desktop-sm:text-[clamp(17px,1.35vw,21.5px)]">
              Empowering governments, & enterprises, with the insights,
              frameworks, and technology needed to build resilient economies.
            </p>

            <div className="grid grid-cols-2 border border-black/10 ipad:mx-auto ipad:max-w-[461px] ipad:gap-[8px] ipad:border-0 ipad-landscape:mx-0 ipad-landscape:max-w-none ipad-landscape:gap-0 ipad-landscape:border">
              <div className={STAT_CELL}>
                <strong className="font-normal leading-none tracking-[-0.02em] text-[24px] iphone-max:text-[28px] ipad-landscape:text-[2.1875vw] desktop-sm:text-[clamp(30px,2.35vw,38px)]">
                  150+
                </strong>
                <span className="text-black/60 text-[14px] ipad-landscape:text-[1.09375vw] desktop-sm:text-[clamp(15px,1.18vw,19px)]">
                  Countries engaged
                </span>
              </div>
              <div className={STAT_CELL}>
                <strong className="font-normal leading-none tracking-[-0.02em] text-[24px] iphone-max:text-[28px] ipad-landscape:text-[2.1875vw] desktop-sm:text-[clamp(30px,2.35vw,38px)]">
                  $4.8T
                </strong>
                <span className="text-black/60 text-[14px] ipad-landscape:text-[1.09375vw] desktop-sm:text-[clamp(15px,1.18vw,19px)]">
                  Investment tracked
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
);
