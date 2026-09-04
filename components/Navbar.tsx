"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavChild = {
  label: string;
  href: string;
  icon: string;
  desc: string;
};

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

const SERVICE_LINKS: NavChild[] = [
  { label: 'Ocean Freight', href: '/services', icon: 'ph-boat', desc: 'Flexible FCL & LCL across global trade routes' },
  { label: 'Air Freight', href: '/services', icon: 'ph-airplane-tilt', desc: 'Fast handling for time-critical cargo' },
  { label: 'Road Transportation', href: '/services', icon: 'ph-truck', desc: 'Ports, airports and final-mile delivery' },
  { label: 'Customs Clearance', href: '/services', icon: 'ph-file-text', desc: 'Documentation and compliance support' },
  { label: 'Warehousing', href: '/services', icon: 'ph-warehouse', desc: 'Secure storage and inventory handling' },
  { label: 'Project Cargo', href: '/services', icon: 'ph-crane', desc: 'Oversized and out-of-gauge movements' },
];

const RESOURCE_LINKS: NavChild[] = [
  { label: 'FAQ', href: '/resources#faq', icon: 'ph-question', desc: 'Answers to common shipping questions' },
  { label: 'Blog & Insights', href: '/resources#blog', icon: 'ph-article', desc: 'Industry updates from our team' },
];

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services', children: SERVICE_LINKS },
  { label: 'Resources', href: '/resources', children: RESOURCE_LINKS },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSection, setDrawerSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sticky shrink + reading-progress indicator
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  // Escape closes whichever layer is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Any route change closes the menus
  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
    setDrawerSection(null);
  }, [pathname]);

  const isActive = useCallback(
    (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0])),
    [pathname]
  );

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        {/* Utility strip — contact details and secondary destinations */}
        <div className="header-utility">
          <div className="header-utility-inner">
            <div className="utility-group">
              <a className="utility-item" href="mailto:sales@mslogistic.org">
                <i className="ph ph-envelope-simple" aria-hidden="true"></i>
                <span>sales@mslogistic.org</span>
              </a>
              <span className="utility-sep" aria-hidden="true"></span>
              <span className="utility-item utility-item-static">
                <i className="ph ph-map-pin" aria-hidden="true"></i>
                <span>Harjap Nagar, Ludhiana, Punjab</span>
              </span>
            </div>

            <div className="utility-group">
              <span className="utility-tag">
                <i className="ph-fill ph-globe-hemisphere-east" aria-hidden="true"></i>
                International Freight Forwarding
              </span>
              <span className="utility-sep" aria-hidden="true"></span>
              <Link className="utility-item" href="/admin/login">
                <i className="ph ph-lock-simple" aria-hidden="true"></i>
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Primary bar */}
        <div className="header-main">
          <div className="header-main-inner">
            <Link href="/" className="brand" aria-label="MS Logistic — home">
              <img src="/logo.png" alt="MS Logistic" />
            </Link>

            <nav className="primary-nav" aria-label="Primary">
              <ul>
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item.href);
                  const expanded = openMenu === item.label;
                  return (
                    <li
                      key={item.label}
                      className={item.children ? 'has-menu' : undefined}
                      onMouseEnter={item.children ? () => hoverOpen(item.label) : undefined}
                      onMouseLeave={item.children ? hoverClose : undefined}
                    >
                      <Link
                        href={item.href}
                        className={`nav-link${active ? ' is-active' : ''}`}
                        aria-haspopup={item.children ? 'true' : undefined}
                        aria-expanded={item.children ? expanded : undefined}
                        onClick={
                          item.children
                            ? (e) => {
                                // On touch devices the first tap reveals the panel instead of navigating
                                if (window.matchMedia('(hover: none)').matches && !expanded) {
                                  e.preventDefault();
                                  setOpenMenu(item.label);
                                }
                              }
                            : undefined
                        }
                      >
                        {item.label}
                        {item.children && <i className="ph-bold ph-caret-down nav-caret" aria-hidden="true"></i>}
                      </Link>

                      {item.children && (
                        <div className={`nav-panel${expanded ? ' is-open' : ''}`}>
                          <div className="nav-panel-grid">
                            {item.children.map((child) => (
                              <Link key={child.label} href={child.href} className="nav-panel-item">
                                <span className="nav-panel-icon">
                                  <i className={`ph ${child.icon}`} aria-hidden="true"></i>
                                </span>
                                <span className="nav-panel-copy">
                                  <strong>{child.label}</strong>
                                  <em>{child.desc}</em>
                                </span>
                              </Link>
                            ))}
                          </div>
                          <Link href={item.href} className="nav-panel-foot">
                            View all {item.label.toLowerCase()}
                            <i className="ph-bold ph-arrow-right" aria-hidden="true"></i>
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="header-actions">
              <Link href="/contact" className="header-cta">
                <span>Get a Quote</span>
                <i className="ph-bold ph-arrow-up-right" aria-hidden="true"></i>
              </Link>
              <button
                type="button"
                className="header-burger"
                aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen((v) => !v)}
              >
                <span className={`burger-box${drawerOpen ? ' is-open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
            </div>
          </div>

          <span className="header-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`drawer-backdrop${drawerOpen ? ' is-open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`drawer${drawerOpen ? ' is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <Link href="/" className="drawer-brand" onClick={() => setDrawerOpen(false)}>
            <img src="/logo-dark.png" alt="MS Logistic" />
          </Link>
          <button type="button" className="drawer-close" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <i className="ph-bold ph-x" aria-hidden="true"></i>
          </button>
        </div>

        <nav className="drawer-nav" aria-label="Mobile">
          <ul>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const expanded = drawerSection === item.label;
              return (
                <li key={item.label}>
                  <div className="drawer-row">
                    <Link
                      href={item.href}
                      className={`drawer-link${active ? ' is-active' : ''}`}
                      onClick={() => setDrawerOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        className={`drawer-expand${expanded ? ' is-open' : ''}`}
                        aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
                        aria-expanded={expanded}
                        onClick={() => setDrawerSection(expanded ? null : item.label)}
                      >
                        <i className="ph-bold ph-caret-down" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>

                  {item.children && (
                    // Single-child wrapper so the 0fr -> 1fr grid collapse animates the whole list
                    <div className={`drawer-sub${expanded ? ' is-open' : ''}`}>
                      <ul className="drawer-sub-list">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} onClick={() => setDrawerOpen(false)}>
                              <i className={`ph ${child.icon}`} aria-hidden="true"></i>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="drawer-foot">
          <Link href="/contact" className="drawer-cta" onClick={() => setDrawerOpen(false)}>
            Get a Quote
            <i className="ph-bold ph-arrow-up-right" aria-hidden="true"></i>
          </Link>
          <a className="drawer-contact" href="mailto:sales@mslogistic.org">
            <i className="ph ph-envelope-simple" aria-hidden="true"></i>
            sales@mslogistic.org
          </a>
          <p className="drawer-address">
            <i className="ph ph-map-pin" aria-hidden="true"></i>
            Ground Floor, 1783 K Street No. 2, 33 Feet Road, Harjap Nagar, Ludhiana, Punjab 141015
          </p>
        </div>
      </aside>
    </>
  );
}
