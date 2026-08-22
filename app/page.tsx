"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const Hero23 = dynamic(
  () => import('@/components/originkit/hero-23'),
  { ssr: false }
);
const MediaGlobe = dynamic(
  () => import('@/components/originkit/ui/hero-23/media-globe').then((mod) => mod.MediaGlobe),
  { ssr: false }
);

const PerspectiveBackground = dynamic(
  () => import('@/components/originkit/ui/hero-03/perspective-background').then((mod) => mod.PerspectiveBackground),
  { ssr: false }
);

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('hero');

  // Single-run animated counter for statistics
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [counters, setCounters] = useState({ exp: 0, countries: 0, shipments: 0, onTime: 0 });

  // Form states
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    orgName: '',
    message: '',
    service: 'air',
    weight: '',
    origin: '',
    destination: '',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Check if scrolled to the absolute bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('quote');
        return;
      }

      // Scroll spy logic
      const sections = ['hero', 'about', 'services', 'howitworks', 'network', 'whyus', 'faq', 'quote'];
      const scrollPosition = window.scrollY + 150; // offset for sticky navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Single-run stats counter observer
  useEffect(() => {
    const statsEl = document.getElementById('stats');
    if (!statsEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            const duration = 1400;
            const startTime = performance.now();

            const animateCount = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic curve
              const easeProgress = 1 - Math.pow(1 - progress, 3);

              setCounters({
                exp: Math.floor(easeProgress * 10),
                countries: Math.floor(easeProgress * 50),
                shipments: Math.floor(easeProgress * 10),
                onTime: Math.floor(easeProgress * 99),
              });

              if (progress < 1) {
                requestAnimationFrame(animateCount);
              } else {
                setCounters({ exp: 10, countries: 50, shipments: 10, onTime: 99 });
              }
            };

            requestAnimationFrame(animateCount);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(statsEl);
    return () => observer.disconnect();
  }, [statsAnimated]);

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.ms-reveal, .ms-reveal-left, .ms-reveal-right');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ms-revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ name: string; email: string }>({ name: '', email: '' });

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          mobile: quoteForm.phone,
          organizationName: quoteForm.orgName,
          address: quoteForm.address,
          message: quoteForm.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedLead({ name: quoteForm.name, email: quoteForm.email });
        setQuoteSuccess(true);
        setQuoteForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          orgName: '',
          message: '',
          service: 'air',
          weight: '',
          origin: '',
          destination: '',
        });
      } else {
        alert(data.message || 'Failed to submit quote inquiry. Please try again.');
      }
    } catch {
      alert('Network error connecting to quote service. Please try again.');
    } finally {
      setQuoteSubmitting(false);
    }
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
            <li><a href="#hero" className={`ms-nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={() => setActiveSection('hero')}>HOME</a></li>
            <li><a href="#about" className={`ms-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setActiveSection('about')}>ABOUT</a></li>
            <li><a href="#services" className={`ms-nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={() => setActiveSection('services')}>SERVICES</a></li>
            <li><a href="#howitworks" className={`ms-nav-link ${activeSection === 'howitworks' ? 'active' : ''}`} onClick={() => setActiveSection('howitworks')}>PROCESS</a></li>
            <li><a href="#network" className={`ms-nav-link ${activeSection === 'network' ? 'active' : ''}`} onClick={() => setActiveSection('network')}>NETWORK</a></li>
            <li><a href="#quote" className={`ms-nav-link ${activeSection === 'quote' ? 'active' : ''}`} onClick={() => setActiveSection('quote')}>CONTACT</a></li>
          </ul>

          <div className="ms-nav-actions">
            <a href="/admin/login" className="ms-btn-admin-pill" id="navAdminBtn">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Admin Login</span>
            </a>
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
          <li><a href="/admin/login" className="ms-mobile-link" style={{ color: 'var(--vibrant-orange)', fontWeight: 700 }} onClick={() => setMobileDrawerOpen(false)}>ADMIN PORTAL</a></li>
        </ul>
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="#quote" className="ms-btn ms-btn-orange" style={{ width: '100%' }} onClick={() => setMobileDrawerOpen(false)}>
            <span>GET A QUOTE</span>
          </a>
        </div>
      </div>

      {/* 2. HERO SECTION (Redesigned Enterprise Hero with 3D Globe, Tracking & Stats) */}
      <section id="hero" className="w-full relative overflow-hidden bg-[#0F1117]">
        <Hero23 />
      </section>

      {/* 4. ABOUT MS LOGISTICS */}
      <section className="ms-section" id="about" style={{ background: 'var(--bg-white)' }}>
        <div className="ms-container">
          <div className="ms-about-grid">
            <div className="ms-about-img-wrapper ms-reveal-left">
              <img src="/images/about_logistics.png" alt="MS LOGISTIC Infrastructure" className="ms-about-img" />
              <div className="ms-about-badge-overlay" style={{ background: 'var(--navy-dark)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="ms-about-badge-num">24/7</div>
                <div className="ms-about-badge-text" style={{ color: '#D1D5DB' }}>Continuous Cargo Tracking & Dedicated Operations Command</div>
              </div>
            </div>

            <div className="ms-reveal-right">
              <div className="ms-badge">ABOUT MS LOGISTIC</div>
              <h2 className="ms-section-title" style={{ textAlign: 'left', color: 'var(--text-dark)' }}>
                LOGISTICS THAT MOVES <span>BUSINESS FORWARD</span>
              </h2>
              <p className="ms-section-desc" style={{ textAlign: 'left', marginBottom: '24px', color: 'var(--text-medium)' }}>
                MS LOGISTIC is an international logistics and freight forwarding powerhouse engineered for enterprise supply chains. We streamline complex cargo movements across air, sea, and land with uncompromised precision and full visibility.
              </p>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', marginBottom: '32px' }}>
                Whether managing urgent express shipments, multi-modal container freight, specialized customs compliance, or end-to-end contract warehousing, our global network ensures your cargo reaches its destination fast, safe, and everywhere.
              </p>

              <div className="ms-about-features">
                <div className="ms-about-feature-item ms-reveal ms-delay-100">
                  <div className="ms-about-feature-icon" style={{ background: 'var(--orange-light)', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text" style={{ color: 'var(--text-dark)' }}>Air & Ocean Freight Forwarding</div>
                </div>
                <div className="ms-about-feature-item ms-reveal ms-delay-150">
                  <div className="ms-about-feature-icon" style={{ background: 'var(--orange-light)', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text" style={{ color: 'var(--text-dark)' }}>Domestic & Cross-Border Road Transit</div>
                </div>
                <div className="ms-about-feature-item ms-reveal ms-delay-200">
                  <div className="ms-about-feature-icon" style={{ background: 'var(--orange-light)', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text" style={{ color: 'var(--text-dark)' }}>Automated Warehousing & Fulfillment</div>
                </div>
                <div className="ms-about-feature-item ms-reveal ms-delay-250">
                  <div className="ms-about-feature-icon" style={{ background: 'var(--orange-light)', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-check"></i></div>
                  <div className="ms-about-feature-text" style={{ color: 'var(--text-dark)' }}>Customs Brokerage & Compliance</div>
                </div>
              </div>

              <a href="#quote" className="ms-btn ms-btn-orange ms-reveal ms-delay-300" style={{ textShadow: 'none' }}>
                <span>DISCOVER OUR CAPABILITIES</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="ms-section" id="services" style={{ background: 'var(--bg-light)' }}>
        <div className="ms-container">
          <div className="ms-section-header ms-reveal">
            <div className="ms-badge">LOGISTICS SERVICES</div>
            <h2 className="ms-section-title">ENGINEERED FOR <span>GLOBAL SPEED</span></h2>
            <p className="ms-section-desc">Comprehensive freight forwarding and logistics solutions tailored for enterprise reliability.</p>
          </div>
 
          <div className="ms-services-grid">
            {/* 1. AIR FREIGHT */}
            <div className="ms-service-card ms-reveal ms-delay-100" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-plane"></i>
                </div>
                <h3 className="ms-service-title">AIR FREIGHT</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Fast international air cargo solutions for time-sensitive enterprise shipments with airport-to-airport express handling.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
 
            {/* 2. OCEAN FREIGHT */}
            <div className="ms-service-card ms-reveal ms-delay-150" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-ship"></i>
                </div>
                <h3 className="ms-service-title">OCEAN FREIGHT</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Reliable FCL and LCL container sea freight solutions for high-volume global cargo movement across major sea lanes.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
 
            {/* 3. ROAD TRANSPORTATION */}
            <div className="ms-service-card ms-reveal ms-delay-200" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-truck-front"></i>
                </div>
                <h3 className="ms-service-title">ROAD TRANSPORTATION</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Flexible and dependable road transportation for domestic and regional deliveries using GPS-tracked fleets.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
 
            {/* 4. WAREHOUSING */}
            <div className="ms-service-card ms-reveal ms-delay-250" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-warehouse"></i>
                </div>
                <h3 className="ms-service-title">WAREHOUSING</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Secure climate-controlled storage, inventory handling, picking, packing, and automated fulfillment support.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
 
            {/* 5. CUSTOMS CLEARANCE */}
            <div className="ms-service-card ms-reveal ms-delay-300" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-file-contract"></i>
                </div>
                <h3 className="ms-service-title">CUSTOMS CLEARANCE</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Professional documentation, import/export compliance, tariff classification, and smooth customs coordination.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* 6. PROJECT LOGISTICS */}
            <div className="ms-service-card ms-reveal ms-delay-350" style={{ background: 'var(--bg-white)', borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <div>
                <div className="ms-service-icon-box" style={{ background: 'rgba(255,84,40,0.1)', color: 'var(--vibrant-orange)' }}>
                  <i className="fa-solid fa-boxes-packing"></i>
                </div>
                <h3 className="ms-service-title">PROJECT LOGISTICS</h3>
                <p className="ms-service-desc" style={{ color: 'var(--text-medium)' }}>Specialized logistics planning for oversized, heavy-lift, complex, and high-value industrial equipment.</p>
              </div>
              <a href="#quote" className="ms-service-link">
                <span>LEARN MORE</span> <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section className="ms-section" id="howitworks" style={{ background: 'var(--bg-white)' }}>
        <div className="ms-container">
          <div className="ms-section-header ms-reveal">
            <div className="ms-badge">THE LOGISTICS JOURNEY</div>
            <h2 className="ms-section-title">HOW IT <span>WORKS</span></h2>
            <p className="ms-section-desc">A seamless, 5-step operational workflow powering every MS LOGISTIC shipment.</p>
          </div>

          <div className="ms-process-timeline">
            <div className="ms-process-line"></div>
            <div className="ms-process-step ms-reveal ms-delay-100">
              <div className="ms-step-number-box">01</div>
              <h3 className="ms-step-title">REQUEST</h3>
              <p className="ms-step-desc">Tell us what you need to move, including cargo dimensions, origin, and destination.</p>
            </div>
            <div className="ms-process-step ms-reveal ms-delay-200">
              <div className="ms-step-number-box">02</div>
              <h3 className="ms-step-title">PLAN</h3>
              <p className="ms-step-desc">Our logistics experts design the optimal multimodal carrier route and pricing.</p>
            </div>
            <div className="ms-process-step ms-reveal ms-delay-300">
              <div className="ms-step-number-box">03</div>
              <h3 className="ms-step-title">MOVE</h3>
              <p className="ms-step-desc">Your cargo travels safely through our air, ocean, or road transportation network.</p>
            </div>
            <div className="ms-process-step ms-reveal ms-delay-400">
              <div className="ms-step-number-box">04</div>
              <h3 className="ms-step-title">TRACK</h3>
              <p className="ms-step-desc">Monitor real-time shipment milestones with digital GPS updates.</p>
            </div>
            <div className="ms-process-step ms-reveal ms-delay-500">
              <div className="ms-step-number-box">05</div>
              <h3 className="ms-step-title">DELIVER</h3>
              <p className="ms-step-desc">Your cargo arrives safely, inspected, and verified on time at its destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL NETWORK SECTION */}
      <section className="ms-section" id="network" style={{ background: '#FFFFFF' }}>
        <div className="ms-container">
          <div className="ms-network-container ms-reveal">
            <div className="ms-section-header" style={{ marginBottom: '20px' }}>
              <div className="ms-badge"><i className="fa-solid fa-satellite-dish"></i> GLOBAL COVERAGE & HUB NETWORK</div>
              <h2 className="ms-section-title">CONNECTED TO THE <span>WORLD</span></h2>
              <p className="ms-section-desc">
                Wherever your cargo needs to go, MS LOGISTIC connects the right route, carrier and solution.
              </p>
            </div>

            {/* Main World Map Visual with 3D Globe */}
            <div className="ms-map-visual ms-reveal" style={{ overflow: 'hidden', position: 'relative', height: '550px', borderRadius: '20px' }}>
              <img src="/images/network_port.jpg" alt="Global Logistics Network" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Live HUD Bar */}
              <div className="ms-map-hud-banner" style={{ zIndex: 10, position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
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
              <div className="ms-hub-card ms-reveal ms-delay-100">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> SOUTH ASIA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">India Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> JNPT & Mumbai Seaport</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Delhi (DEL) Cargo Terminal</div>
              </div>

              <div className="ms-hub-card ms-reveal ms-delay-200">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> MIDDLE EAST</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Middle East Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> Jebel Ali Port, Dubai</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> DXB Express Cargo City</div>
              </div>

              <div className="ms-hub-card ms-reveal ms-delay-300">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> EUROPEAN UNION</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Europe Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> Port of Rotterdam</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Frankfurt (FRA) Air Hub</div>
              </div>

              <div className="ms-hub-card ms-reveal ms-delay-400">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> NORTH AMERICA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">North America Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> Port of Long Beach & LA</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> New York (JFK) Freight Hub</div>
              </div>

              <div className="ms-hub-card ms-reveal ms-delay-450">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> EAST ASIA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Asia Pacific Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> Port of Singapore & Shanghai</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Hong Kong (HKG) Air Express</div>
              </div>

              <div className="ms-hub-card ms-reveal ms-delay-500">
                <div className="ms-hub-header">
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--vibrant-orange)' }}><i className="fa-solid fa-location-dot"></i> AFRICA</div>
                  <div className="ms-hub-tag">24/7 OPERATIONAL</div>
                </div>
                <h3 className="ms-hub-title">Africa Gateway</h3>
                <div className="ms-hub-detail"><i className="fa-solid fa-anchor" style={{ color: 'var(--vibrant-orange)' }}></i> Port of Durban & Mombasa</div>
                <div className="ms-hub-detail"><i className="fa-solid fa-plane-up" style={{ color: 'var(--vibrant-orange)' }}></i> Cairo Cargo Air Facility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE MS LOGISTICS */}
      <section className="ms-section" id="whyus">
        <div className="ms-container">
          <div className="ms-section-header ms-reveal">
            <div className="ms-badge">OUR ADVANTAGES</div>
            <h2 className="ms-section-title">WHY BUSINESSES CHOOSE <span>MS LOGISTIC</span></h2>
            <p className="ms-section-desc">Enterprise-grade capabilities engineered for security, speed, and cost efficiency.</p>
          </div>

          <div className="ms-why-grid">
            <div className="ms-why-card ms-reveal ms-delay-100">
              <div className="ms-why-icon"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="ms-why-title">Reliable Operations</h3>
              <p className="ms-why-desc">Standardized operating procedures guaranteeing safe cargo handling and strict schedules.</p>
            </div>
            <div className="ms-why-card ms-reveal ms-delay-150">
              <div className="ms-why-icon"><i className="fa-solid fa-sliders"></i></div>
              <h3 className="ms-why-title">Customized Solutions</h3>
              <p className="ms-why-desc">Logistics contracts designed specifically around your industry and volume requirements.</p>
            </div>
            <div className="ms-why-card ms-reveal ms-delay-200">
              <div className="ms-why-icon"><i className="fa-solid fa-globe"></i></div>
              <h3 className="ms-why-title">Global Connectivity</h3>
              <p className="ms-why-desc">Direct partnerships with major ocean liners, cargo airlines, and trucking networks worldwide.</p>
            </div>
            <div className="ms-why-card ms-reveal ms-delay-250">
              <div className="ms-why-icon"><i className="fa-solid fa-comments-dollar"></i></div>
              <h3 className="ms-why-title">Transparent Communication</h3>
              <p className="ms-why-desc">Clear pricing structures with no hidden fees and dedicated single-point account managers.</p>
            </div>
            <div className="ms-why-card ms-reveal ms-delay-300">
              <div className="ms-why-icon"><i className="fa-solid fa-user-gear"></i></div>
              <h3 className="ms-why-title">Experienced Professionals</h3>
              <p className="ms-why-desc">Seasoned freight experts managing customs clearance, permits, and complex trade routes.</p>
            </div>
            <div className="ms-why-card ms-reveal ms-delay-350">
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
          <div className="ms-section-header ms-reveal">
            <div className="ms-badge">SECTOR EXPERTISE</div>
            <h2 className="ms-section-title">INDUSTRIES WE <span>SERVE</span></h2>
            <p className="ms-section-desc">Tailored supply chain execution for specialized industry verticals.</p>
          </div>

          <div className="ms-industries-grid">
            <div className="ms-industry-card ms-reveal ms-delay-100">
              <img src="/images/hero_logistics_bg.png" alt="Manufacturing Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>HEAVY INDUSTRY</div>
                <h3 className="ms-industry-title">Manufacturing</h3>
              </div>
            </div>
            <div className="ms-industry-card ms-reveal ms-delay-200">
              <img src="/images/road_transport.png" alt="Automotive Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>AUTO PARTS</div>
                <h3 className="ms-industry-title">Automotive</h3>
              </div>
            </div>
            <div className="ms-industry-card ms-reveal ms-delay-300">
              <img src="/images/about_logistics.png" alt="Retail Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>CONSUMER GOODS</div>
                <h3 className="ms-industry-title">Retail & E-Commerce</h3>
              </div>
            </div>
            <div className="ms-industry-card ms-reveal ms-delay-400">
              <img src="/images/air_freight.png" alt="Pharma Logistics" className="ms-industry-bg" />
              <div className="ms-industry-overlay">
                <div className="ms-badge" style={{ width: 'max-content', padding: '4px 10px', fontSize: '0.7rem' }}>COLD CHAIN</div>
                <h3 className="ms-industry-title">Pharmaceuticals</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. REQUEST A QUOTE SECTION */}
      <section className="ms-section" id="quote" style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="ms-container">
          <div className="ms-quote-grid">
            <div className="ms-reveal-left">
              <h2 className="ms-section-title" style={{ textAlign: 'left' }}>
                GET IN <span>TOUCH</span>
              </h2>
              <p className="ms-section-desc" style={{ textAlign: 'left', marginBottom: '45px', maxWidth: '430px' }}>
                Speak directly to our team for immediate support or inquiries.
              </p>

              <div className="ms-reveal ms-delay-100" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--vibrant-orange)', fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>Location</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', margin: 0, lineHeight: 1.6 }}>Corporate HQ: Logistics Tower,<br />Express Highway Hub, India</p>
                </div>
              </div>

              <div className="ms-reveal ms-delay-200" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-phone" style={{ color: 'var(--vibrant-orange)', fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>Phone</h4>
                  <a href="tel:+919876543210" style={{ fontSize: '0.9rem', color: 'var(--vibrant-orange)', textDecoration: 'none' }}>+91 98765 43210</a>
                </div>
              </div>

              {/* Email */}
              <div className="ms-reveal ms-delay-300" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--orange-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-envelope" style={{ color: 'var(--vibrant-orange)', fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>Email</h4>
                  <a href="mailto:info@mslogistics.com" style={{ fontSize: '0.9rem', color: 'var(--vibrant-orange)', textDecoration: 'none' }}>info@mslogistics.com</a>
                </div>
              </div>
            </div>

            <div className="ms-custom-quote-card ms-reveal-right">
              <form onSubmit={handleQuoteSubmit}>
                <div className="ms-custom-form-group">
                  <label className="ms-custom-form-label">NAME</label>
                  <input
                    type="text"
                    className="ms-custom-form-input"
                    placeholder="Full Name"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                  />
                </div>

                <div className="ms-custom-form-row">
                  <div className="ms-custom-form-group">
                    <label className="ms-custom-form-label">MOBILE</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px' }}>
                      <select 
                        className="ms-custom-form-input" 
                        style={{ padding: '0 10px', height: '64px', cursor: 'pointer' }}
                        aria-label="Country Code"
                      >
                        <option value="+91">+91</option>
                      </select>
                      <input
                        type="tel"
                        className="ms-custom-form-input"
                        placeholder="XXX - XXX - XXXX"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        inputMode="numeric"
                        value={quoteForm.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setQuoteForm({ ...quoteForm, phone: val });
                        }}
                      />
                    </div>
                  </div>
                  <div className="ms-custom-form-group">
                    <label className="ms-custom-form-label">EMAIL</label>
                    <input
                      type="email"
                      className="ms-custom-form-input"
                      placeholder="email@cglindia.net"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ms-custom-form-row">
                  <div className="ms-custom-form-group">
                    <label className="ms-custom-form-label">ORGANIZATION NAME</label>
                    <input
                      type="text"
                      className="ms-custom-form-input"
                      placeholder="Organization Name"
                      required
                      value={quoteForm.orgName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, orgName: e.target.value })}
                    />
                  </div>
                  <div className="ms-custom-form-group">
                    <label className="ms-custom-form-label">ADDRESS</label>
                    <input
                      type="text"
                      className="ms-custom-form-input"
                      placeholder="Street, City, State, ZIP Code"
                      required
                      value={quoteForm.address}
                      onChange={(e) => setQuoteForm({ ...quoteForm, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="ms-custom-form-group">
                  <label className="ms-custom-form-label">MESSAGE</label>
                  <textarea
                    className="ms-custom-form-textarea"
                    placeholder="Provide details about your cargo volume, origin, destination, or timeline..."
                    required
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="ms-custom-btn-submit"
                  disabled={quoteSubmitting}
                >
                  {quoteSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      <span>SUBMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT QUOTE INQUIRY</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Inquiry Success Modal */}
      {quoteSuccess && (
        <div className="ms-modal active">
          <div className="ms-modal-content" style={{ textAlign: 'center' }}>
            <button className="ms-modal-close" onClick={() => setQuoteSuccess(false)}><i className="fa-solid fa-xmark"></i></button>
            <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10B981', marginBottom: '16px' }}></i>
            <h3>QUOTE REQUEST RECEIVED!</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
              Thank you {submittedLead.name || 'Valued Partner'}. Our enterprise freight team will contact you at {submittedLead.email || 'your email'} within 60 minutes with a custom quote.
            </p>
          </div>
        </div>
      )}

      {/* 12. FAQ ACCORDION */}
      <section id="faq" className="ms-pfaq-section">
        <div className="ms-pfaq-container">
          <div className="ms-pfaq-header ms-reveal">
            <div className="ms-pfaq-badge">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="ms-pfaq-title">WE HAVE ANSWERS</h2>
          </div>

          <div className="ms-pfaq-list">
            {[
              {
                q: 'What shipping modes does MS LOGISTIC offer?',
                a: 'We provide full multi-modal freight services including air freight forwarding, ocean container shipping (FCL/LCL), express road transportation, temperature-controlled cold chain logistics, and specialized heavy-lift project cargo solutions.',
              },
              {
                q: 'How fast can I get a freight quote for my cargo?',
                a: 'You can submit your shipment details via our online quote request form or call our 24/7 desk. Our logistics specialists calculate optimal routing and respond within 60 minutes with a competitive custom quote.',
              },
              {
                q: 'Do you handle customs clearance and import/export documentation?',
                a: 'Yes, MS LOGISTIC provides end-to-end customs brokerage services. Our team handles tariff classification, duty calculations, port filings, permits, and regulatory compliance across all major trade corridors.',
              },
              {
                q: 'Can you provide end-to-end warehousing and fulfillment?',
                a: 'Absolutely. We operate strategically located warehousing facilities with full inventory management, order fulfillment, pick-and-pack services, and last-mile distribution capabilities to streamline your supply chain.',
              },
              {
                q: 'Do you provide real-time shipment tracking?',
                a: 'Yes. Every shipment is assigned a unique tracking code that gives you full visibility from origin to destination. Our tracking system provides real-time status updates, ETA notifications, and milestone alerts.',
              },
              {
                q: 'Which countries and regions do you serve?',
                a: 'MS LOGISTIC operates a global logistics network spanning major trade routes across Asia, Europe, the Americas, the Middle East, and Africa. Our partner network ensures reliable coverage to virtually any destination worldwide.',
              },
            ].map((item, idx) => (
              <div key={idx} className={`ms-pfaq-item ms-reveal ms-delay-${Math.min(idx * 50 + 100, 400)} ${activeFaq === idx ? 'ms-pfaq-active' : ''}`}>
                <button className="ms-pfaq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <i className={`fa-solid fa-chevron-${activeFaq === idx ? 'up' : 'down'} ms-pfaq-arrow`}></i>
                </button>
                <div className="ms-pfaq-answer-wrap">
                  <p className="ms-pfaq-answer">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="ms-footer" id="contact">
        <div className="ms-container">
          <div className="ms-footer-grid">
            <div className="ms-footer-col ms-reveal">
              <img src="/images/ms_logo.png" alt="MS LOGISTIC" style={{ height: '54px', width: 'auto', marginBottom: '16px' }} />
              <p style={{ fontSize: '0.9rem', color: '#53627A', marginBottom: '20px' }}>
                MS LOGISTIC is a global logistics and freight forwarding leader providing dependable air, ocean, and road freight transportation connecting your cargo to the world.
              </p>
            </div>

            <div className="ms-footer-col ms-reveal ms-delay-100">
              <h4>QUICK LINKS</h4>
              <ul className="ms-footer-links">
                <li><a href="#hero" className="ms-footer-link">Home</a></li>
                <li><a href="#about" className="ms-footer-link">About Us</a></li>
                <li><a href="#services" className="ms-footer-link">Our Services</a></li>
                <li><a href="#network" className="ms-footer-link">Global Network</a></li>
                <li><a href="#quote" className="ms-footer-link">Request Quote</a></li>
              </ul>
            </div>

            <div className="ms-footer-col ms-reveal ms-delay-200">
              <h4>SERVICES</h4>
              <ul className="ms-footer-links">
                <li><a href="#services" className="ms-footer-link">Air Freight</a></li>
                <li><a href="#services" className="ms-footer-link">Ocean Freight</a></li>
                <li><a href="#services" className="ms-footer-link">Road Transport</a></li>
                <li><a href="#services" className="ms-footer-link">Warehousing</a></li>
                <li><a href="#services" className="ms-footer-link">Customs Clearance</a></li>
                <li><a href="#services" className="ms-footer-link">Project Logistics</a></li>
              </ul>
            </div>

            <div className="ms-footer-col ms-reveal ms-delay-300">
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
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="#" className="ms-footer-link">Privacy Policy</a>
              <a href="#" className="ms-footer-link">Terms of Service</a>
              <a href="/admin/login" className="ms-footer-link" style={{ color: 'var(--vibrant-orange)', fontWeight: 600 }}>Admin Portal →</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
