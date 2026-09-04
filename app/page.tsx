"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [activeAccItem, setActiveAccItem] = useState<number>(0);
  const [activeServiceBg, setActiveServiceBg] = useState<number>(0);

  // Accordion items for Industries section
  const industries = [
    {
      title: 'Manufacturing',
      desc: 'Reliable movement of raw materials, components and finished goods.',
      bg: '/assets/ind_mfg_1787801541656.jpg',
    },
    {
      title: 'Automotive',
      desc: 'Coordinated transportation for automotive parts, equipment and industrial cargo.',
      bg: '/assets/ind_auto_1787801416271.jpg',
    },
    {
      title: 'Textiles & Apparel',
      desc: 'Flexible freight solutions for time-sensitive and international textile shipments.',
      bg: '/assets/ind_fmcg_1787801515151.jpg',
    },
    {
      title: 'Engineering',
      desc: 'Specialized coordination for machinery, equipment and project cargo.',
      bg: '/assets/ind_pharma_1787801531751.jpg',
    },
    {
      title: 'Retail & Trading',
      desc: 'Import and export logistics designed around inventory and market demand.',
      bg: '/assets/modern_warehouse_1787799964731.jpg',
    },
    {
      title: 'General Cargo',
      desc: 'Secure handling and time-sensitive delivery networks.',
      bg: '/assets/ind_tech_1787801555640.jpg',
    },
    {
      title: 'E-commerce',
      desc: 'Scalable fulfillment, distribution, and last-mile logistics.',
      bg: '/assets/ind_ecom_1787801569427.jpg',
    },
  ];

  // Service stacked cards
  const services = [
    {
      num: '01',
      title: 'Ocean Freight',
      desc: 'Move your cargo efficiently across international trade routes with flexible FCL and LCL ocean freight solutions.',
      icon: 'ph-boat',
      bg: '/assets/srv_ocean_1787802085277.jpg',
    },
    {
      num: '02',
      title: 'Air Freight',
      desc: 'Fast, dependable air freight solutions for urgent, time-sensitive and high-value shipments worldwide.',
      icon: 'ph-airplane-tilt',
      bg: '/assets/srv_air_1787802099035.jpg',
    },
    {
      num: '03',
      title: 'Road Transport',
      desc: 'Connect ports, airports, warehouses and final destinations through dependable road transportation solutions.',
      icon: 'ph-truck',
      bg: '/assets/hero_logistics_truck_1787799951828.jpg',
    },
    {
      num: '04',
      title: 'Customs Clearance',
      desc: 'Professional customs clearance support to help your import and export shipments move smoothly.',
      icon: 'ph-file-text',
      bg: '/assets/ind_tech_1787801555640.jpg',
    },
    {
      num: '05',
      title: 'Warehousing',
      desc: 'Flexible warehousing solutions designed to keep your inventory secure, accessible and ready.',
      icon: 'ph-warehouse',
      bg: '/assets/modern_warehouse_1787799964731.jpg',
    },
    {
      num: '06',
      title: 'Project Cargo',
      desc: 'Our project cargo solutions are designed around the specific requirements of complex shipments.',
      icon: 'ph-crane',
      bg: '/assets/ind_mfg_1787801541656.jpg',
    },
  ];

  // Dynamic scroll listener for stacked service cards
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.stack-card');
      let activeIndex = 0;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < 350) {
          activeIndex = index;
        }
      });
      setActiveServiceBg(activeIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* 1. Hero Section */}
      <section className="hero">
        <img src="/assets/hero_sunset.jpg" alt="Truck at sunset" className="hero-bg" />
        <div className="hero-overlay"></div>

        <div className="container relative">
          <div className="hero-content">
            <h1 style={{ fontSize: '66px', lineHeight: '1.1' }}>Moving Your Business Across Borders.</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', marginBottom: '1rem' }}>
              Reliable international freight forwarding and logistics solutions — connecting your cargo to markets worldwide.
            </p>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem' }}>
              From ocean and air freight to customs clearance, road transportation and warehousing, MS Logistic manages every critical step of your shipment with precision, transparency and care.
            </p>
            <div className="hero-buttons">
              <Link href="/contact" className="btn-primary">
                Get a Quote <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro / About (3 Cards) */}
      <section className="section fade-up" style={{ padding: '120px 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                ABOUT MS LOGISTIC
              </span>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
            </div>

            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '1.5rem', lineHeight: 1.2, fontWeight: 600 }}>
              Logistics That Keeps Business Moving.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
              MS Logistic is an international freight forwarding and logistics company. We coordinate the complete journey of your shipment — from origin pickup to final delivery.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            {/* Card 1 */}
            <div
              style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', transition: 'all 0.3s ease' }}
            >
              <div style={{ width: '64px', height: '64px', background: 'var(--bg-surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <i className="ph-fill ph-globe-hemisphere-west" style={{ fontSize: '2rem', color: 'var(--accent-orange)' }}></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', marginBottom: '1rem', fontWeight: 700 }}>
                Global Network
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Our international network enables efficient movement across major trade routes, connecting your cargo to markets worldwide.
              </p>
            </div>

            {/* Card 2 (Highlight Card) */}
            <div
              style={{ background: 'var(--bg-inverted)', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(11,21,40,0.15)' }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(249,116,21,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <i className="ph-fill ph-check-circle" style={{ fontSize: '2rem', color: 'var(--accent-orange)' }}></i>
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem', fontWeight: 700 }}>
                  Reliable Operations
                </h3>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
                  Every shipment is coordinated with strict attention to timelines, documentation, and specific cargo handling requirements.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', transition: 'all 0.3s ease' }}
            >
              <div style={{ width: '64px', height: '64px', background: 'var(--bg-surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <i className="ph-fill ph-handshake" style={{ fontSize: '2rem', color: 'var(--accent-orange)' }}></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', marginBottom: '1rem', fontWeight: 700 }}>
                Client-Focused
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                We build solutions designed around your specific business needs, providing transparency and dependability at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust / Credentials (Timeline Design) */}
      <section className="section" style={{ background: 'var(--bg-surface)', padding: '120px 0' }}>
        <div className="container">
          <div className="section-header-left" style={{ marginBottom: '5rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '0.5rem' }}>Trust, Reliability and Scale</p>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: 0, position: 'relative', display: 'inline-block' }}>
              The Answer is MS Logistic
              <span style={{ position: 'absolute', left: 0, bottom: '-8px', width: '80px', height: '3px', background: '#f97415' }}></span>
            </h2>
          </div>

          <div className="wavy-timeline-wrapper" style={{ position: 'relative', width: '100%', height: '240px', marginTop: '3rem' }}>
            <svg viewBox="0 0 1000 240" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
              <path d="M 0,120 C 37.5,120 37.5,180 75,180 L 175,180 C 250,180 250,60 325,60 L 425,60 C 500,60 500,180 575,180 L 675,180 C 750,180 750,60 825,60 L 925,60 C 962.5,60 962.5,120 1000,120" fill="none" stroke="#cbd5e1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 90,180 L 160,180" stroke="#f97415" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <path d="M 340,60 L 410,60" stroke="#f97415" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <path d="M 590,180 L 660,180" stroke="#f97415" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <path d="M 840,60 L 910,60" stroke="#f97415" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <polygon points="0,116 8,120 0,124" fill="#cbd5e1" />
              <polygon points="1000,116 992,120 1000,124" fill="#cbd5e1" />
            </svg>

            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', zIndex: 2 }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '75px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
                  <div style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    <i className="ph-fill ph-medal" style={{ color: '#f97415' }}></i>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>15+</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>Years<br />Experience</p>
                </div>
              </div>

              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '75px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
                  <div style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    <i className="ph-fill ph-globe-hemisphere-west" style={{ color: '#f97415' }}></i>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>150+</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>Countries<br />Served</p>
                </div>
              </div>

              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '75px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
                  <div style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    <i className="ph-fill ph-package" style={{ color: '#f97415' }}></i>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>10,000+</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>Shipments<br />Handled</p>
                </div>
              </div>

              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '75px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
                  <div style={{ color: 'var(--text-main)', fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    <i className="ph-fill ph-users-three" style={{ color: '#f97415' }}></i>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '0.2rem' }}>500+</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>Clients<br />Worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section (Stacked Sticky Cards) */}
      <section className="section" style={{ padding: 0, background: 'var(--bg-surface)' }}>
        <div className="services-stacked-section">
          {/* Left Sticky Title Card */}
          <div className="services-left-col">
            <div className="sticky-title-card" id="services-sticky-card">
              {services.map((srv, idx) => (
                <div
                  key={srv.num}
                  className={`service-bg-img ${activeServiceBg === idx ? 'active' : ''}`}
                  style={{ backgroundImage: `url('${srv.bg}')` }}
                ></div>
              ))}

              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(11,21,40,0.6), rgba(11,21,40,0.9))', zIndex: 1 }}></div>
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      WHAT WE DO
                    </span>
                  </div>
                  <h2>Our<br />Services</h2>
                </div>
                <div style={{ width: '40px', height: '4px', background: 'var(--accent-orange)' }}></div>
              </div>
            </div>
          </div>

          {/* Right Column: Stacking Cards */}
          <div className="services-right-col">
            {services.map((srv, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div
                  key={srv.num}
                  className={`stack-card ${isEven ? 'even' : 'odd'}`}
                  style={{ top: `${120 + idx * 20}px`, zIndex: idx + 1 }}
                  data-index={idx}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="card-number">{srv.num}</div>
                    <div className="card-content">
                      <h3>{srv.title}</h3>
                      <p>{srv.desc}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <i className={`ph-fill ${srv.icon}`} style={{ fontSize: '3rem', color: isEven ? '#ffffff' : 'var(--text-heading)', opacity: 0.2 }}></i>
                    <Link href="/services" className="card-btn">
                      <i className="ph-bold ph-arrow-right" style={{ fontSize: '1.5rem' }}></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Process Section (Auto Sliding Timeline) */}
      <section className="section fade-up" style={{ padding: '120px 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="header-centered" style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                HOW IT WORKS
              </span>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '1rem', lineHeight: 1.2, fontWeight: 600 }}>
              From Origin to Destination.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
              We manage the movement of goods across every critical stage of the supply chain.
            </p>
          </div>

          <div className="process-slider" style={{ marginTop: '4rem', overflow: 'hidden', position: 'relative' }}>
            <div className="process-track" id="process-track" style={{ display: 'flex', gap: '2rem', width: 'max-content', animation: 'process-scroll 24s linear infinite' }}>
              {[
                { step: '01', title: 'Share Requirement', text: 'Tell us your origin, destination and timeline.', icon: 'ph-clipboard-text' },
                { step: '02', title: 'Plan Shipment', text: 'We evaluate and recommend the best logistics solution.', icon: 'ph-map-trifold' },
                { step: '03', title: 'Move & Monitor', text: 'Coordinating transportation while keeping you informed.', icon: 'ph-boat' },
                { step: '04', title: 'Clear & Deliver', text: 'Customs clearance and onward transport to destination.', icon: 'ph-file-text' },
                { step: '05', title: 'Complete', text: 'Safe delivery achieved with transparent communication.', icon: 'ph-flag-checkered' },
                // Duplicate for smooth loop
                { step: '01', title: 'Share Requirement', text: 'Tell us your origin, destination and timeline.', icon: 'ph-clipboard-text' },
                { step: '02', title: 'Plan Shipment', text: 'We evaluate and recommend the best logistics solution.', icon: 'ph-map-trifold' },
                { step: '03', title: 'Move & Monitor', text: 'Coordinating transportation while keeping you informed.', icon: 'ph-boat' },
                { step: '04', title: 'Clear & Deliver', text: 'Customs clearance and onward transport to destination.', icon: 'ph-file-text' },
                { step: '05', title: 'Complete', text: 'Safe delivery achieved with transparent communication.', icon: 'ph-flag-checkered' },
              ].map((item, idx) => (
                <div key={idx} className="process-slide" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '48px 32px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '4rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1, zIndex: 0, fontFamily: 'Raleway, sans-serif' }}>
                    {item.step}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <i className={`ph-fill ${item.icon}`} style={{ fontSize: '2.5rem', color: 'var(--accent-orange)', marginBottom: '1.5rem', display: 'block' }}></i>
                    <h4 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.75rem', fontWeight: 800 }}>{item.title}</h4>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Industries Section (Horizontal Accordion) */}
      <section className="section section-light fade-up" id="industries">
        <div className="container">
          <div className="header-centered">
            <div className="section-subtitle">INDUSTRIES</div>
            <h2 style={{ fontWeight: 600 }}>Logistics Built Around Your Business</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              Different industries have different cargo requirements. Our logistics solutions can be adapted to the needs of businesses across multiple sectors.
            </p>
          </div>

          <div className="accordion-gallery">
            {industries.map((ind, idx) => (
              <div
                key={ind.title}
                className={`acc-item ${activeAccItem === idx ? 'active' : ''}`}
                style={{ backgroundImage: `url('${ind.bg}')` }}
                onClick={() => setActiveAccItem(idx)}
              >
                <div className="acc-overlay"></div>
                <div className="acc-content">
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Global Network Section */}
      <section
        className="section"
        style={{
          position: 'relative',
          padding: '120px 0',
          backgroundImage: "url('/assets/srv_air_1787802099035.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(11,21,40,0.85), rgba(11,21,40,0.95))', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="header-centered" style={{ marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                GLOBAL NETWORK
              </span>
              <div style={{ width: '30px', height: '2px', background: 'var(--accent-orange)' }}></div>
            </div>
            <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: 600 }}>
              Connecting India <br />to the World
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              From India to international markets, MS Logistic helps businesses move cargo across major global trade routes efficiently and securely.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '48px 32px' }}>
              <i className="ph-fill ph-globe-hemisphere-west" style={{ fontSize: '3.5rem', color: 'var(--accent-orange)', marginBottom: '1.5rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>150+ Countries</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
                Our international network connects exporters and importers with destinations across key global markets.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '48px 32px' }}>
              <i className="ph-fill ph-boat" style={{ fontSize: '3.5rem', color: 'var(--accent-orange)', marginBottom: '1.5rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>Major Sea Lanes</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
                Full container load (FCL) and less than container load (LCL) coverage across primary trade corridors.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '48px 32px' }}>
              <i className="ph-fill ph-airplane-tilt" style={{ fontSize: '3.5rem', color: 'var(--accent-orange)', marginBottom: '1.5rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>Air Cargo Hubs</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
                Airport-to-airport and door-to-door express routing through major international aviation gateways.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '48px 32px' }}>
              <i className="ph-fill ph-shield-check" style={{ fontSize: '3.5rem', color: 'var(--accent-orange)', marginBottom: '1.5rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>Compliant Clearance</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
                Experienced customs brokerage teams ensuring smooth documentation and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="section" style={{ background: 'var(--bg-main)', textAlign: 'center', padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>Ready to Move Your Cargo?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Speak with our logistics specialists and get a competitive freight quotation tailored to your business needs.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '18px 36px', fontSize: '1.1rem' }}>
              Request a Freight Quote <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
