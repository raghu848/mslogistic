import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <img src="/logo.png" alt="MS Logistic" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              International Freight Forwarding & Logistics
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '1rem', lineHeight: '1.6' }}>
              MS Logistic provides professional freight forwarding and logistics solutions for businesses moving cargo across India and international markets.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-heading)', marginBottom: '1.5rem' }}>Our Services</h4>
            <ul className="footer-links">
              <li><Link href="/services">Ocean Freight</Link></li>
              <li><Link href="/services">Air Freight</Link></li>
              <li><Link href="/services">Road Transport</Link></li>
              <li><Link href="/services">Customs Clearance</Link></li>
              <li><Link href="/services">Warehousing</Link></li>
              <li><Link href="/services">Project Cargo</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-heading)', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/tracking">Track Shipment</Link></li>
              <li><Link href="/contact">Get a Quote</Link></li>
              <li><Link href="/resources#faq">FAQ</Link></li>
              <li><Link href="/resources#blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li>
                <Link href="/admin/login" style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>
                  Admin Portal →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-heading)', marginBottom: '1.5rem' }}>Contact</h4>
            <ul className="footer-links">
              <li style={{ marginBottom: '12px' }}>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <i className="ph ph-map-pin" style={{ color: 'var(--accent-orange)', marginTop: '4px', flexShrink: 0 }}></i>
                  <span>Ground Floor, 1783 K Street No. 2, 33 Feet Road, Harjap Nagar, Ludhiana, Punjab 141015</span>
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:info@mslogistic.org">
                  <i className="ph ph-envelope-simple" style={{ color: 'var(--accent-orange)' }}></i> info@mslogistic.org
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="mailto:contact.mslogistic@gmail.com">
                  <i className="ph ph-envelope-simple" style={{ color: 'var(--accent-orange)' }}></i> contact.mslogistic@gmail.com
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="tel:+919056513656">
                  <i className="ph ph-phone" style={{ color: 'var(--accent-orange)' }}></i> +91 90565 13656
                </a>
              </li>
              <li>
                <a href="tel:+919876543210">
                  <i className="ph ph-phone" style={{ color: 'var(--accent-orange)' }}></i> +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 MS Logistic. All rights reserved.</p>
          <div className="social-icons" style={{ color: 'var(--text-muted)' }}>
            <i className="ph-fill ph-facebook-logo"></i>
            <i className="ph-fill ph-twitter-logo"></i>
            <i className="ph-fill ph-linkedin-logo"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
