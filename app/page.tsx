"use client";

import React, { useState, useEffect } from 'react';
import { PerspectiveBackground } from '@/components/originkit/ui/hero-03/perspective-background';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('MS-884920');
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Form states
  const [trackInput, setTrackInput] = useState('');
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'air',
    weight: '',
    origin: '',
    destination: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = trackInput.trim() || 'MS-884920';
    setTrackingCode(code);
    setTrackingModalOpen(true);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
  };

  return (
    <div className="ms-app-wrapper">
      {/* 1. FUTURISTIC STICKY NAVBAR (FLOATING HUD PILL DESIGN) */}
      <nav className={`ms-navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="ms-nav-container">
          <a href="#hero" className="ms-logo" id="navLogo">
            <img src="/images/ms_logo.png" alt="MS LOGISTIC - Fast Safe Everywhere" className="ms-logo-img" />
          </a>

          <ul className="ms-nav-menu" id="navMenu">
            <li><a href="#hero" className="ms-nav-link active">HOME</a></li>
            <li><a href="#about" className="ms-nav-link">ABOUT</a></li>
            <li><a href="#services" className="ms-nav-link">SERVICES</a></li>
            <li><a href="#howitworks" className="ms-nav-link">PROCESS</a></li>
            <li><a href="#network" className="ms-nav-link">NETWORK</a></li>
            <li><a href="#whyus" className="ms-nav-link">WHY US</a></li>
            <li><a href="#faq" className="ms-nav-link">FAQ</a></li>
            <li><a href="#contact" className="ms-nav-link">CONTACT</a></li>
          </ul>

          <div className="ms-nav-actions">
            <a href="#quote" className="ms-btn-minimal-quote" id="navQuoteBtn">
              <span>GET A QUOTE</span>
              <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
            </a>
            <button
              className="ms-mobile-toggle"
              id="mobileToggle"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileDrawerOpen(true)}
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`ms-overlay ${mobileDrawerOpen ? 'active' : ''}`}
        onClick={() => setMobileDrawerOpen(false)}
      ></div>
      <div className={`ms-mobile-drawer ${mobileDrawerOpen ? 'active' : ''}`}>
        <button
          className="ms-mobile-close"
          aria-label="Close Navigation Menu"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div style={{ marginBottom: '24px' }}>
          <img src="/images/ms_logo.png" alt="MS LOGISTIC" style={{ height: '48px', width: 'auto' }} />
        </div>
        <ul className="ms-mobile-links">
          <li><a href="#hero" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>HOME</a></li>
          <li><a href="#about" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>ABOUT</a></li>
          <li><a href="#services" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>SERVICES</a></li>
          <li><a href="#howitworks" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>PROCESS</a></li>
          <li><a href="#network" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>GLOBAL NETWORK</a></li>
          <li><a href="#whyus" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>WHY US</a></li>
          <li><a href="#industries" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>INDUSTRIES</a></li>
          <li><a href="#faq" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>FAQ</a></li>
          <li><a href="#contact" className="ms-mobile-link" onClick={() => setMobileDrawerOpen(false)}>CONTACT</a></li>
        </ul>
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="#tracking" className="ms-btn ms-btn-blue" style={{ width: '100%' }} onClick={() => setMobileDrawerOpen(false)}>
            <i className="fa-solid fa-magnifying-glass-location"></i> <span>TRACK SHIPMENT</span>
          </a>
          <a href="#quote" className="ms-btn ms-btn-orange" style={{ width: '100%' }} onClick={() => setMobileDrawerOpen(false)}>
            <span>GET A QUOTE</span>
          </a>
        </div>
      </div>

      {/* 2. HERO SECTION (OriginKit Hero 03 3D Perspective Tunnel Background) */}
      <section className="ms-hero" id="hero">
        <PerspectiveBackground />
        <div className="ms-container ms-hero-grid">
          <div className="ms-hero-content">
            <div className="ms-badge">
              <i className="fa-solid fa-earth-americas"></i> FAST • SAFE • EVERYWHERE
            </div>
            <h1 className="ms-hero-headline">
              WE MOVE YOUR <br />
              <span>BUSINESS</span> <span className="highlight-orange">FORWARD.</span>
            </h1>
            <p className="ms-hero-subtext">
              Smart, reliable and seamless logistics solutions connecting your cargo to the world with precision and on-time guaranteed delivery.
            </p>

            <div className="ms-hero-btns">
              <a href="#quote" className="ms-btn ms-btn-orange" id="heroQuoteBtn">
                <span>GET A QUOTE</span>
                <i className="fa-solid fa-paper-plane"></i>
              </a>
              <a href="#services" className="ms-btn ms-btn-outline" id="heroExploreBtn">
                <span>EXPLORE SERVICES</span>
                <i className="fa-solid fa-arrow-down-long"></i>
              </a>
            </div>

            {/* Track Shipment Bar */}
            <form onSubmit={handleTrackSubmit} className="ms-hero-track-bar">
              <i className="fa-solid fa-magnifying-glass-location" style={{ color: 'var(--vibrant-orange)', fontSize: '1.2rem' }}></i>
              <input
                type="text"
                className="ms-hero-track-input"
                placeholder="Enter Tracking Number (e.g. MS-884920)..."
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
              />
              <button type="submit" className="ms-btn ms-btn-blue ms-btn-track" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                <span>TRACK SHIPMENT</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. TRUST / STATS SECTION */}
      <section className="ms-stats-bar" id="stats">
        <div className="ms-container">
          <div className="ms-stats-grid">
            <div className="ms-stat-item">
              <div className="ms-stat-number">10+</div>
              <div className="ms-stat-label">Years Industry Experience</div>
            </div>
            <div className="ms-stat-item">
              <div className="ms-stat-number">50+</div>
              <div className="ms-stat-label">Countries Globally Served</div>
            </div>
            <div className="ms-stat-item">
              <div className="ms-stat-number">10K+</div>
              <div className="ms-stat-label">Shipments Delivered</div>
            </div>
            <div className="ms-stat-item">
              <div className="ms-stat-number">99%</div>
              <div className="ms-stat-label">On-Time Delivery Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT MS LOGISTICS */}
      <section className="ms-section" id="about">
        <div className="ms-container">
          <div className="ms-about-grid">
            <div className="ms-about-img-wrapper">
              <img src="/images/about_logistics.png" alt="MS LOGISTIC Infrastructure" className="ms-about-img" />
              <div className="ms-about-badge-overlay">
                <div className="ms-about-badge-num">24/7</div>
                <div className="ms-about-badge-text">Continuous Cargo Tracking & Dedicated Operations Command</div>
              </div>
            </div>

            <div>
              <div className="ms-badge ms-badge-blue">ABOUT MS LOGISTIC</div>
              <h2 className="ms-section-title" style={{ textAlign: 'left' }}>
                LOGISTICS THAT MOVES <span>BUSINESS FORWARD</span>
              </h2>
              <p className="ms-section-desc" style={{ textAlign: 'left', marginBottom: '24px' }}>
                MS LOGISTIC is an international logistics and freight forwarding powerhouse engineered for enterprise supply chains. We streamline complex cargo movements across air, sea, and land with uncompromised precision and full visibility.
              </p>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem' }}>
                Whether managing urgent express shipments, multi-modal container freight, specialized customs compliance, or end-to-end contract warehousing, our global network ensures your cargo reaches its destination fast, safe, and everywhere.
              </p>

              <div className="ms-about-features">
                <div className="ms-about-feature-item">
                  <div className="ms-about-feature-icon"><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text">Air & Ocean Freight Forwarding</div>
                </div>
                <div className="ms-about-feature-item">
                  <div className="ms-about-feature-icon"><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text">Domestic & Cross-Border Road Transit</div>
                </div>
                <div className="ms-about-feature-item">
                  <div className="ms-about-feature-icon"><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text">Automated Warehousing & Fulfillment</div>
                </div>
                <div className="ms-about-feature-item">
                  <div className="ms-about-feature-icon"><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text">Customs Brokerage & Compliance</div>
                </div>
              </div>

              <a href="#quote" className="ms-btn ms-btn-orange">
                <span>DISCOVER OUR CAPABILITIES</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="ms-section ms-section-dark" id="services" style={{ background: 'var(--navy-dark)' }}>
        <div className="ms-container">
          <div className="ms-section-header">
            <div className="ms-badge">LOGISTICS SERVICES</div>
            <h2 className="ms-section-title">ENGINEERED FOR <span>GLOBAL SPEED</span></h2>
            <p className="ms-section-desc">Comprehensive freight forwarding and logistics solutions tailored for enterprise reliability.</p>
          </div>

          <div className="ms-services-grid">
            {/* 1. AIR FREIGHT */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(37,99,235,0.15)', color: 'var(--electric-blue)' }}>
                  <i className="fa-solid fa-plane"></i>
                </div>
                <h3 className="ms-service-title">AIR FREIGHT</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Fast international air cargo solutions for time-sensitive enterprise shipments with airport-to-airport express handling.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 2. OCEAN FREIGHT */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,87,34,0.15)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-ship"></i>
                </div>
                <h3 className="ms-service-title">OCEAN FREIGHT</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Reliable FCL and LCL container sea freight solutions for high-volume global cargo movement across major sea lanes.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 3. ROAD TRANSPORTATION */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>
                  <i className="fa-solid fa-truck-front"></i>
                </div>
                <h3 className="ms-service-title">ROAD TRANSPORTATION</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Flexible and dependable road transportation for domestic and regional deliveries using GPS-tracked fleets.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 4. WAREHOUSING */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(168,85,247,0.15)', color: '#A855F7' }}>
                  <i className="fa-solid fa-warehouse"></i>
                </div>
                <h3 className="ms-service-title">WAREHOUSING</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Secure climate-controlled storage, inventory handling, picking, packing, and automated fulfillment support.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 5. CUSTOMS CLEARANCE */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(236,72,153,0.15)', color: '#EC4899' }}>
                  <i className="fa-solid fa-file-contract"></i>
                </div>
                <h3 className="ms-service-title">CUSTOMS CLEARANCE</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Professional documentation, import/export compliance, tariff classification, and smooth customs coordination.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 6. PROJECT LOGISTICS */}
            <div className="ms-service-card" style={{ background: 'var(--navy-card)', borderColor: 'var(--border-dark)', color: 'white' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
                  <i className="fa-solid fa-boxes-packing"></i>
                </div>
                <h3 className="ms-service-title">PROJECT LOGISTICS</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-light)' }}>Specialized logistics planning for oversized, heavy-lift, complex, and high-value industrial equipment.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section className="ms-section ms-section-dark" id="howitworks" style={{ background: 'var(--navy-main)' }}>
        <div className="ms-container">
          <div className="ms-section-header">
            <div className="ms-badge">THE LOGISTICS JOURNEY</div>
            <h2 className="ms-section-title">HOW IT <span>WORKS</span></h2>
            <p className="ms-section-desc">A seamless, 5-step operational workflow powering every MS LOGISTIC shipment.</p>
          </div>

          <div className="ms-process-timeline">
            <div className="ms-process-line"></div>
            <div className="ms-process-step">
              <div className="ms-step-number-box">01</div>
              <h3 className="ms-step-title">REQUEST</h3>
              <p className="ms-step-desc">Tell us what you need to move, including cargo dimensions, origin, and destination.</p>
            </div>
            <div className="ms-process-step">
              <div className="ms-step-number-box">02</div>
              <h3 className="ms-step-title">PLAN</h3>
              <p className="ms-step-desc">Our logistics experts design the optimal multimodal carrier route and pricing.</p>
            </div>
            <div className="ms-process-step">
              <div className="ms-step-number-box">03</div>
              <h3 className="ms-step-title">MOVE</h3>
              <p className="ms-step-desc">Your cargo travels safely through our air, ocean, or road transportation network.</p>
            </div>
            <div className="ms-process-step">
              <div className="ms-step-number-box">04</div>
              <h3 className="ms-step-title">TRACK</h3>
              <p className="ms-step-desc">Monitor real-time shipment milestones with digital GPS updates.</p>
            </div>
            <div className="ms-process-step">
              <div className="ms-step-number-box">05</div>
              <h3 className="ms-step-title">DELIVER</h3>
              <p className="ms-step-desc">Your cargo arrives safely, inspected, and verified on time at its destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL NETWORK SECTION */}
      <section className="ms-section ms-section-dark" id="network" style={{ background: 'var(--navy-dark)' }}>
        <div className="ms-container">
          <div className="ms-network-container">
            <div className="ms-section-header" style={{ marginBottom: '20px' }}>
              <div className="ms-badge"><i className="fa-solid fa-satellite-dish"></i> GLOBAL COVERAGE & HUB NETWORK</div>
              <h2 className="ms-section-title">CONNECTED TO THE <span>WORLD</span></h2>
              <p className="ms-section-desc">
                Wherever your cargo needs to go, MS LOGISTIC connects the right route, carrier and solution.
              </p>
            </div>

            {/* Main World Map Visual with Dual Responsive Video */}
            <div className="ms-map-visual">
              <video className="ms-map-video ms-desktop-video" autoPlay loop muted playsInline poster="/images/global_world_map.png">
                <source src="/images/make_animated_video_of_this_Ci.mp4" type="video/mp4" />
              </video>
              <video className="ms-map-video ms-mobile-video" autoPlay loop muted playsInline poster="/images/global_world_map.png">
                <source src="/images/make_this_video_in_mobile_scre.mp4" type="video/mp4" />
              </video>
              <div className="ms-map-overlay-layer"></div>

              {/* Animated SVG Flight & Shipping Lines */}
              <svg className="ms-world-map-svg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 240 170 Q 380 90 510 150" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                <path d="M 510 150 Q 560 180 610 215" stroke="#FF5722" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                <path d="M 610 215 Q 660 220 710 240" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                <path d="M 710 240 Q 780 230 850 230" stroke="#FF5722" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                <path d="M 610 215 Q 570 260 530 290" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>

              {/* Interactive Glowing Map Nodes */}
              <div className="ms-map-node ms-node-india" data-region="india">
                <div className="ms-node-label"><i className="fa-solid fa-plane-arrival"></i> India</div>
              </div>
              <div className="ms-map-node ms-node-middleeast" data-region="middleeast">
                <div className="ms-node-label"><i className="fa-solid fa-ship"></i> Middle East</div>
              </div>
              <div className="ms-map-node ms-node-europe" data-region="europe">
                <div className="ms-node-label"><i className="fa-solid fa-plane"></i> Europe</div>
              </div>
              <div className="ms-map-node ms-node-northamerica" data-region="northamerica">
                <div className="ms-node-label"><i className="fa-solid fa-box-open"></i> North America</div>
              </div>
              <div className="ms-map-node ms-node-asia" data-region="asia">
                <div className="ms-node-label"><i className="fa-solid fa-city"></i> Asia Pacific</div>
              </div>
              <div className="ms-map-node ms-node-africa" data-region="africa">
                <div className="ms-node-label"><i className="fa-solid fa-truck"></i> Africa</div>
              </div>

              {/* Live HUD Bar */}
              <div className="ms-map-hud-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-white)' }}>GLOBAL NETWORK OPERATIONS: <span style={{ color: '#10B981' }}>100% ONLINE</span></div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  Direct Connections across 50+ Countries | 24/7 Monitoring
                </div>
              </div>
            </div>

            {/* 6 Regional Gateway Hub Cards Grid */}
            <div className="ms-hubs-grid">
              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> SOUTH ASIA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">India Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> JNPT & Mumbai Seaport</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Delhi (DEL) Cargo Terminal</div>
              </div>

              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> MIDDLE EAST</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Middle East Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> Jebel Ali Port, Dubai</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> DXB Express Cargo City</div>
              </div>

              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> EUROPEAN UNION</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Europe Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> Port of Rotterdam</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Frankfurt (FRA) Air Hub</div>
              </div>

              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> NORTH AMERICA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">North America Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> Port of Long Beach & LA</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> New York (JFK) Freight Hub</div>
              </div>

              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> EAST ASIA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Asia Pacific Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> Port of Singapore & Shanghai</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Hong Kong (HKG) Air Express</div>
              </div>

              <div className="ms-hub-card">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> AFRICA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Africa Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--electric-blue)' }}></i> Port of Durban & Mombasa</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Cairo Cargo Air Facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE MS LOGISTICS */}
      <section className="ms-section" id="whyus">
        <div className="ms-container">
          <div className="ms-section-header">
            <div className="ms-badge ms-badge-blue">OUR ADVANTAGES</div>
            <h2 className="ms-section-title">WHY BUSINESSES CHOOSE <span>MS LOGISTIC</span></h2>
            <p className="ms-section-desc">Enterprise-grade capabilities engineered for security, speed, and cost efficiency.</p>
          </div>

          <div className="ms-why-grid">
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="ms-why-title">Reliable Operations</h3>
              <p className="ms-why-desc">Standardized operating procedures guaranteeing safe cargo handling and strict schedules.</p>
            </div>
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-sliders"></i></div>
              <h3 className="ms-why-title">Customized Solutions</h3>
              <p className="ms-why-desc">Logistics contracts designed specifically around your industry and volume requirements.</p>
            </div>
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-globe"></i></div>
              <h3 className="ms-why-title">Global Connectivity</h3>
              <p className="ms-why-desc">Direct partnerships with major ocean liners, cargo airlines, and trucking networks worldwide.</p>
            </div>
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-comments-dollar"></i></div>
              <h3 className="ms-why-title">Transparent Communication</h3>
              <p className="ms-why-desc">Clear pricing structures with no hidden fees and dedicated single-point account managers.</p>
            </div>
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-user-gear"></i></div>
              <h3 className="ms-why-title">Experienced Professionals</h3>
              <p className="ms-why-desc">Seasoned freight experts managing customs clearance, permits, and complex trade routes.</p>
            </div>
            <div className="ms-why-card">
              <div className="ms-why-icon"><i className="fa-solid fa-chart-line"></i></div>
              <h3 className="ms-why-title">Cost-Efficient Planning</h3>
              <p className="ms-why-desc">Route optimization algorithms to reduce transit costs while maintaining fast delivery times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INDUSTRIES WE SERVE */}
      <section className="ms-section" id="industries" style={{ background: 'var(--bg-white)' }}>
        <div className="ms-container">
          <div className="ms-section-header">
            <div className="ms-badge">SECTOR EXPERTISE</div>
            <h2 className="ms-section-title">INDUSTRIES WE <span>SERVE</span></h2>
            <p className="ms-section-desc">Tailored supply chain execution for specialized industry verticals.</p>
          </div>

          <div className="ms-industries-grid">
            <div className="ms-industry-card">
              <img src="/images/hero_logistics_bg.png" alt="Manufacturing Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>HEAVY INDUSTRY</div>
                <h3 className="ms-industry-title">Manufacturing</h3>
              </div>
            </div>
            <div className="ms-industry-card">
              <img src="/images/road_transport.png" alt="Automotive Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>AUTO PARTS</div>
                <h3 className="ms-industry-title">Automotive</h3>
              </div>
            </div>
            <div className="ms-industry-card">
              <img src="/images/about_logistics.png" alt="Retail Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>CONSUMER GOODS</div>
                <h3 className="ms-industry-title">Retail & E-Commerce</h3>
              </div>
            </div>
            <div className="ms-industry-card">
              <img src="/images/air_freight.png" alt="Pharma Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>COLD CHAIN</div>
                <h3 className="ms-industry-title">Pharmaceuticals</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SHIPMENT TRACKING CTA */}
      <section className="ms-section ms-section-dark" id="tracking" style={{ background: 'var(--navy-main)' }}>
        <div className="ms-container">
          <div className="ms-tracking-box">
            <div className="ms-badge ms-badge-blue">LIVE LOGISTICS VISIBILITY</div>
            <h2 className="ms-section-title" style={{ fontSize: '2.4rem' }}>WHERE IS YOUR <span>SHIPMENT?</span></h2>
            <p className="ms-section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Stay informed from origin to destination with simple, transparent shipment tracking.
            </p>

            <form onSubmit={handleTrackSubmit} className="ms-tracking-form">
              <input
                type="text"
                className="ms-tracking-input"
                placeholder="Enter Waybill or Tracking Code (e.g. MS-109823)..."
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
              />
              <button type="submit" className="ms-btn ms-btn-orange ms-btn-track">
                <span>TRACK SHIPMENT</span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Tracking Result Modal */}
      {trackingModalOpen && (
        <div className="ms-modal active" id="trackingModal">
          <div className="ms-modal-content">
            <button className="ms-modal-close" aria-label="Close Tracking Modal" onClick={() => setTrackingModalOpen(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="ms-badge">LIVE TRACKING STATUS</div>
            <h3 style={{ fontSize: '1.5rem', marginTop: '10px' }}>Shipment <span style={{ color: 'var(--vibrant-orange)' }}>{trackingCode}</span></h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Carrier: MS Express Freight | Origin: Dubai, UAE → Destination: Hamburg, Germany</p>

            <div className="ms-tracking-steps">
              <div className="ms-track-step done">
                <i className="fa-solid fa-circle-check" style={{ color: '#10B981', fontSize: '1.2rem' }}></i>
                <div>
                  <div style={{ fontWeight: 700 }}>Order Picked Up & Manifested</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Dubai International Logistics Center - 08:30 AM</div>
                </div>
              </div>

              <div className="ms-track-step done">
                <i className="fa-solid fa-circle-check" style={{ color: '#10B981', fontSize: '1.2rem' }}></i>
                <div>
                  <div style={{ fontWeight: 700 }}>Customs Export Clearance Completed</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Jebel Ali Port Terminal - 02:15 PM</div>
                </div>
              </div>

              <div className="ms-track-step active">
                <i className="fa-solid fa-compass" style={{ color: 'var(--vibrant-orange)', fontSize: '1.2rem' }}></i>
                <div>
                  <div style={{ fontWeight: 700 }}>In International Transit (Air / Sea Flight MS-902)</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Estimated Arrival: Tomorrow 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. REQUEST A QUOTE SECTION */}
      <section className="ms-section" id="quote" style={{ background: 'var(--navy-dark)' }}>
        <div className="ms-container">
          <div className="ms-quote-grid">
            <div>
              <div className="ms-badge ms-badge-orange">INSTANT FREIGHT ESTIMATE</div>
              <h2 className="ms-section-title" style={{ textAlign: 'left' }}>
                REQUEST A CUSTOM <span>LOGISTICS QUOTE</span>
              </h2>
              <p className="ms-section-desc" style={{ textAlign: 'left' }}>
                Fill out the quick freight details below and our logistics specialists will return a competitive custom quote within 1 hour.
              </p>
            </div>

            <div className="ms-quote-card">
              <form onSubmit={handleQuoteSubmit}>
                <div className="ms-form-group">
                  <label className="ms-form-label">YOUR FULL NAME</label>
                  <input
                    type="text"
                    className="ms-form-input"
                    placeholder="Enter your name..."
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  />
                </div>

                <div className="ms-form-row">
                  <div className="ms-form-group">
                    <label className="ms-form-label">BUSINESS EMAIL</label>
                    <input
                      type="email"
                      className="ms-form-input"
                      placeholder="name@company.com"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    />
                  </div>
                  <div className="ms-form-group">
                    <label className="ms-form-label">PHONE NUMBER</label>
                    <input
                      type="tel"
                      className="ms-form-input"
                      placeholder="+91 98765 43210"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="ms-btn ms-btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>SUBMIT QUOTE REQUEST</span>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Success Modal */}
      {quoteSuccess && (
        <div className="ms-modal active">
          <div className="ms-modal-content" style={{ textAlign: 'center' }}>
            <button className="ms-modal-close" onClick={() => setQuoteSuccess(false)}><i className="fa-solid fa-xmark"></i></button>
            <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10B981', marginBottom: '16px' }}></i>
            <h3>QUOTE REQUEST RECEIVED!</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
              Thank you {quoteForm.name || 'Valued Partner'}. Our enterprise freight team will contact you at {quoteForm.email || 'your email'} within 60 minutes with a custom quote.
            </p>
          </div>
        </div>
      )}

      {/* 12. FAQ ACCORDION */}
      <section className="ms-section" id="faq" style={{ background: 'var(--navy-main)' }}>
        <div className="ms-container" style={{ maxWidth: '860px' }}>
          <div className="ms-section-header">
            <div className="ms-badge">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="ms-section-title">GOT QUESTIONS? <span>WE HAVE ANSWERS</span></h2>
          </div>

          <div className="ms-faq-container">
            {[
              {
                q: 'What shipping modes does MS LOGISTIC offer?',
                a: 'We provide full multi-modal freight services including air freight forwarding, ocean container shipping (FCL/LCL), express road transportation, temperature-controlled cold chain logistics, and specialized heavy-lift project cargo solutions.',
              },
              {
                q: 'How fast can I get a freight quote for my cargo?',
                a: 'You can submit your shipment details via our online quote request form or call our 24/7 desk. Our logistics specialists calculate optimal routing and respond within 60 minutes.',
              },
              {
                q: 'Do you handle customs clearance and import/export documentation?',
                a: 'Yes, MS LOGISTIC provides end-to-end customs brokerage services. Our team handles tariff classification, duty calculations, port filings, permits, and regulatory compliance.',
              },
            ].map((item, idx) => (
              <div key={idx} className={`ms-faq-item ${activeFaq === idx ? 'active' : ''}`}>
                <button className="ms-faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <i className="fa-solid fa-chevron-down ms-faq-icon"></i>
                </button>
                {activeFaq === idx && (
                  <div className="ms-faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="ms-footer" id="contact">
        <div className="ms-container">
          <div className="ms-footer-grid">
            <div className="ms-footer-col">
              <img src="/images/ms_logo.png" alt="MS LOGISTIC" style={{ height: '54px', width: 'auto', marginBottom: '16px' }} />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '20px' }}>
                MS LOGISTIC is a global logistics and freight forwarding leader providing dependable air, ocean, and road freight transportation connecting your cargo to the world.
              </p>
            </div>

            <div className="ms-footer-col">
              <h4>QUICK LINKS</h4>
              <ul className="ms-footer-links">
                <li><a href="#hero" className="ms-footer-link">Home</a></li>
                <li><a href="#about" className="ms-footer-link">About Us</a></li>
                <li><a href="#services" className="ms-footer-link">Our Services</a></li>
                <li><a href="#network" className="ms-footer-link">Global Network</a></li>
                <li><a href="#quote" className="ms-footer-link">Request Quote</a></li>
              </ul>
            </div>

            <div className="ms-footer-col">
              <h4>SERVICES</h4>
              <ul className="ms-footer-links">
                <li><a href="#services" className="ms-footer-link">Air Freight</a></li>
                <li><a href="#services" className="ms-footer-link">Ocean Freight</a></li>
                <li><a href="#services" className="ms-footer-link">Road Transport</a></li>
                <li><a href="#services" className="ms-footer-link">Warehousing</a></li>
                <li><a href="#services" className="ms-footer-link">Customs Clearance</a></li>
              </ul>
            </div>

            <div className="ms-footer-col">
              <h4>CONTACT US</h4>
              <ul className="ms-footer-links">
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--vibrant-orange)', marginTop: '4px' }}></i>
                  <span>Corporate HQ: Logistics Tower, Express Highway Hub, India</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--vibrant-orange)' }}></i>
                  <a href="tel:+919876543210" className="ms-footer-link">+91 98765 43210</a>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--vibrant-orange)' }}></i>
                  <a href="mailto:info@mslogistics.com" className="ms-footer-link">info@mslogistics.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="ms-footer-bottom">
            <div>&copy; 2026 MS LOGISTIC. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" className="ms-footer-link">Privacy Policy</a>
              <a href="#" className="ms-footer-link">Terms of Service</a>
              <a href="#" className="ms-footer-link">Security Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
