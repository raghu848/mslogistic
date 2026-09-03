import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | MS Logistic - International Freight Forwarding',
  description: 'Learn about MS Logistic, our mission, vision, global network, and 15+ years of experience in international freight forwarding and supply chain solutions.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Header Banner */}
      <section className="section" style={{ background: 'var(--bg-inverted)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700 }}>ABOUT MS LOGISTIC</h1>
          <p style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Logistics That Keeps Business Moving
          </p>
        </div>
      </section>

      {/* Who We Are, Mission & Vision */}
      <section className="section section-light">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <img
              src="/assets/vertical_truck_1787800304566.jpg"
              alt="Logistics Network"
              className="split-img"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h2 style={{ color: 'var(--text-heading)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Who We Are</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
              MS Logistic is an international freight forwarding and logistics company helping businesses move cargo efficiently across borders. We coordinate the complete journey of your shipment — from origin pickup and documentation to international transportation, customs clearance and final delivery.
            </p>

            <h3 style={{ color: 'var(--text-heading)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
              Our Mission
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
              To simplify complex supply chains by providing reliable, visible and well-coordinated logistics solutions that allow our clients to focus on growing their business.
            </p>

            <h3 style={{ color: 'var(--text-heading)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700 }}>
              Our Vision
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
              To be the most trusted logistics partner for businesses navigating international trade, recognized for our operational discipline and commitment to client success.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Timeline */}
      <section className="section" style={{ background: 'var(--bg-surface)', padding: '5rem 0' }}>
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

      <Footer />
    </>
  );
}
