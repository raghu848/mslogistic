// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import TextSphere from "@/components/originkit/ui/hero-09/text-sphere";

function asset(file: string) {
  return `/originkit/hero-09/${file}`;
}

const NAV_ITEMS = ["Home", "Pricing", "About", "Tools"] as const;

/**
 * Editorial word-globe hero from
 * https://github.com/moleeforx-del/word-globe-hero
 */
export function WordGlobeHero() {
  return (
    <div className="h09-hero-shell">
      <header className="h09-top-nav">
        <a className="h09-logo" href="#" aria-label="Origin home">
          <img src={asset("logo-wordglobe.svg")} alt="" width={40} height={28} />
        </a>
        <nav aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a className="h09-button h09-button-dark h09-nav-cta" href="#get-started">
          Get started
        </a>
      </header>

      <div className="h09-content-rails" aria-hidden="true" />
      <div className="h09-wave-pattern" aria-hidden="true" />

      <div className="h09-globe-stage">
        <TextSphere
          word="###"
          color="#d77d84"
          font={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 500,
            fontSize: 15,
          }}
          speed={7}
          rotationSide="counterclockwise"
          twist={50}
          letterSpacing={240}
        />
      </div>

      <section className="h09-hero-content">
        <div className="h09-headline-block">
          <h1>
            Building the Economy
            <br />
            of Tomorrow
          </h1>
          <div className="h09-actions" id="get-started">
            <a className="h09-button h09-button-dark" href="#get-started">
              Get started
            </a>
            <a className="h09-button h09-button-light" href="#book-a-call">
              Book a call
            </a>
          </div>
        </div>

        <div className="h09-details-block">
          <p>
            Empowering governments, & enterprises, with the insights,
            frameworks, and technology needed to build resilient economies.
          </p>
          <div className="h09-stats">
            <div>
              <strong>150+</strong>
              <span>Countries engaged</span>
            </div>
            <div>
              <strong>$4.8T</strong>
              <span>Investment tracked</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
