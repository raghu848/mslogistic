import React from 'react';
import Link from 'next/link';

const SERVICES = [
  'Ocean Freight',
  'Air Freight',
  'Road Transportation',
  'Customs Clearance',
  'Warehousing',
  'Project Cargo',
];

const COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'FAQ', href: '/resources#faq' },
  { label: 'Blog & Insights', href: '/resources#blog' },
  { label: 'Contact Us', href: '/contact' },
];

// TODO: replace with the real MS Logistic profile URLs once they are available.
const SOCIALS = [
  { label: 'Facebook', icon: 'ph-facebook-logo' },
  { label: 'X (Twitter)', icon: 'ph-x-logo' },
  { label: 'LinkedIn', icon: 'ph-linkedin-logo' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Conversion band that straddles the page and the footer */}
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <span className="footer-cta-eyebrow">
              <i className="ph-fill ph-lightning" aria-hidden="true"></i>
              Ready when you are
            </span>
            <h3>Let&rsquo;s move your cargo forward.</h3>
            <p>Tell us your route and cargo type — we&rsquo;ll come back with a clear, competitive quote.</p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/contact" className="footer-cta-primary">
              Get a Quote
              <i className="ph-bold ph-arrow-up-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="footer-logo" aria-label="MS Logistic — home">
                <img src="/logo-dark.png" alt="MS Logistic" />
              </Link>
              <p className="footer-eyebrow">International Freight Forwarding &amp; Logistics</p>
              <p className="footer-tagline">Moving possibilities, delivering trust.</p>
              <p className="footer-about">
                MS Logistic provides professional freight forwarding and logistics solutions for businesses moving cargo
                across India and international markets.
              </p>

              <ul className="footer-social" aria-label="Social media">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <span title={s.label} aria-label={s.label} role="img">
                      <i className={`ph-fill ${s.icon}`} aria-hidden="true"></i>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul className="footer-links">
                {SERVICES.map((label) => (
                  <li key={label}>
                    <Link href="/services">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul className="footer-links">
                {COMPANY.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col footer-contact">
              <h4>Get in Touch</h4>

              <a
                className="footer-contact-item"
                href="https://maps.google.com/?q=Harjap+Nagar+Ludhiana+Punjab+141015"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="footer-contact-icon">
                  <i className="ph ph-map-pin" aria-hidden="true"></i>
                </span>
                <span>
                  <strong>Head Office</strong>
                  Ground Floor, 1783 K Street No.&nbsp;2, 33 Feet Road, Harjap Nagar, Ludhiana, Punjab 141015
                </span>
              </a>

              <a className="footer-contact-item" href="mailto:info@mslogistic.org">
                <span className="footer-contact-icon">
                  <i className="ph ph-envelope-simple" aria-hidden="true"></i>
                </span>
                <span>
                  <strong>General enquiries</strong>
                  info@mslogistic.org
                </span>
              </a>

              <a className="footer-contact-item" href="mailto:contact.mslogistic@gmail.com">
                <span className="footer-contact-icon">
                  <i className="ph ph-paper-plane-tilt" aria-hidden="true"></i>
                </span>
                <span>
                  <strong>Quotes &amp; bookings</strong>
                  contact.mslogistic@gmail.com
                </span>
              </a>

              <Link href="/admin/login" className="footer-admin">
                <i className="ph ph-lock-simple" aria-hidden="true"></i>
                Admin Portal
                <i className="ph-bold ph-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} MS Logistic. All rights reserved.</p>
            <ul className="footer-legal">
              <li><Link href="/resources#faq">FAQ</Link></li>
              <li><Link href="/contact">Support</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
