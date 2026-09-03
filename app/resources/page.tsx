"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What regions do you service?',
      a: 'We provide global logistics solutions, connecting India to over 150 countries through our established network of international partners and carriers.',
    },
    {
      q: 'Do you handle customs clearance?',
      a: 'Yes. Our team manages customs clearance and related documentation to ensure your cargo complies with local and international regulations.',
    },
    {
      q: 'Can I track my shipment?',
      a: 'Absolutely. We provide shipment visibility and tracking, keeping you informed of your cargo status from origin to destination.',
    },
    {
      q: 'What types of cargo do you handle?',
      a: 'We manage a wide range of shipments including general commercial cargo, industrial equipment, temperature-sensitive goods and project cargo.',
    },
  ];

  const blogs = [
    {
      category: 'SUPPLY CHAIN',
      title: 'Optimizing Last-Mile Delivery for Modern E-commerce',
      desc: 'Discover strategies to improve delivery times and reduce costs in final-mile logistics.',
      img: '/assets/hero_logistics_truck_1787799951828.jpg',
    },
    {
      category: 'FREIGHT FORWARDING',
      title: 'Navigating Global Ocean Freight Capacity in 2024',
      desc: 'An analysis of current trends in container shipping and capacity management.',
      img: '/assets/srv_ocean_1787802085277.jpg',
    },
    {
      category: 'TECHNOLOGY',
      title: 'The Role of Digital Visibility in Supply Chains',
      desc: 'How real-time tracking and data analytics are transforming logistics operations.',
      img: '/assets/logistics_tech_1787799979723.jpg',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="section" style={{ background: 'var(--bg-inverted)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700 }}>RESOURCES</h1>
          <p style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Insights & Frequently Asked Questions
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-light" id="faq">
        <div className="container">
          <div className="header-centered">
            <div className="section-subtitle">FAQ</div>
            <h2 style={{ fontWeight: 600 }}>Frequently Asked Questions</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: 'var(--text-heading)', margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                      {faq.q}
                    </h4>
                    <i className={`ph-bold ${isOpen ? 'ph-caret-up' : 'ph-caret-down'}`} style={{ color: 'var(--accent-orange)' }}></i>
                  </div>
                  {isOpen && (
                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section" style={{ background: 'var(--bg-main)' }} id="blog">
        <div className="container">
          <div className="header-centered">
            <div className="section-subtitle">LATEST INSIGHTS</div>
            <h2 style={{ fontWeight: 600 }}>Logistics & Supply Chain Blog</h2>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {blogs.map((b, idx) => (
              <div key={idx} style={{ background: 'var(--bg-surface)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '200px', backgroundImage: `url('${b.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '2rem' }}>
                  <span style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 700 }}>{b.category}</span>
                  <h4 style={{ margin: '0.5rem 0', color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.3 }}>
                    {b.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {b.desc}
                  </p>
                  <a href="#blog" style={{ color: 'var(--accent-orange)', fontWeight: 600, textDecoration: 'none' }}>
                    Read Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
