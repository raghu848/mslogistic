import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services | MS Logistic - International Freight Forwarding',
  description: 'Explore MS Logistic services: Ocean Freight, Air Freight, Road Transport, Customs Clearance, Warehousing, and Project Cargo logistics.',
};

export default function ServicesPage() {
  const serviceItems = [
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
      title: 'Road Transportation',
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

  return (
    <>
      <Navbar />

      {/* Header Banner */}
      <section className="section" style={{ background: 'var(--bg-inverted)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700 }}>OUR SERVICES</h1>
          <p style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Complete Freight & Logistics Solutions
          </p>
        </div>
      </section>

      {/* Services Detailed Grid */}
      <section className="section section-light">
        <div className="container">
          <div className="grid-3" style={{ gap: '2rem' }}>
            {serviceItems.map((item) => (
              <div
                key={item.num}
                className="service-card-new"
                style={{
                  backgroundImage: `linear-gradient(rgba(11,21,40,0.82), rgba(11,21,40,0.96)), url('${item.bg}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '40px 32px',
                  borderRadius: '12px',
                  minHeight: '320px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div>
                  <div className="card-icon" style={{ marginBottom: '1.5rem' }}>
                    <i className={`ph-fill ${item.icon}`} style={{ fontSize: '1.8rem' }}></i>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 700 }}>
                    {item.num} — {item.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.98rem', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <Link href="/contact" style={{ color: 'var(--accent-orange)', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Get Quote For {item.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section" style={{ background: 'var(--bg-main)', textAlign: 'center', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-heading)', marginBottom: '1rem' }}>
            Need a Customized Logistics Solution?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Our logistics experts are ready to analyze your cargo requirements and create a tailored transport plan.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1rem', display: 'inline-flex' }}>
            Contact Our Freight Team <i className="ph ph-arrow-right"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
