"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [searching, setSearching] = useState(false);
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    origin: string;
    destination: string;
    mode: string;
    status: string;
    eta: string;
    steps: { name: string; date: string; completed: boolean }[];
  } | null>(null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setSearching(true);
    setTrackingResult(null);

    // Simulate real-time tracking lookup query
    setTimeout(() => {
      setSearching(false);
      setTrackingResult({
        id: trackingId.toUpperCase(),
        origin: 'JNPT Port, Mumbai, India',
        destination: 'Jebel Ali Port, Dubai, UAE',
        mode: 'Ocean Freight (FCL)',
        status: 'In Transit Across Sea Corridor',
        eta: 'Sept 08, 2026',
        steps: [
          { name: 'Shipment Booked & Confirmed', date: 'Aug 28, 2026', completed: true },
          { name: 'Cargo Loaded at Origin Port', date: 'Aug 31, 2026', completed: true },
          { name: 'In Transit Across Sea Corridor', date: 'Sept 02, 2026', completed: true },
          { name: 'Customs Clearance at Destination', date: 'Pending Arrival', completed: false },
          { name: 'Final Delivery to Warehouse', date: 'Pending', completed: false },
        ],
      });
    }, 600);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="section" style={{ background: 'var(--bg-inverted)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700 }}>TRACK SHIPMENT</h1>
          <p style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Know Where Your Cargo Is.
          </p>
        </div>
      </section>

      {/* Tracking Form & Results */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '3rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '0.5rem', fontWeight: 700 }}>
              Live Cargo Tracking
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Enter your Waybill, Container, or MS LOGISTIC Tracking ID below.
            </p>

            <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Tracking ID (e.g. MSL-893012)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
                style={{ flex: '1 1 300px', border: '2px solid var(--border-color)', color: 'var(--text-heading)', padding: '14px 20px' }}
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={searching}
                style={{ padding: '14px 32px', cursor: 'pointer', background: 'var(--accent-orange)' }}
              >
                {searching ? (
                  <>
                    <i className="ph ph-spinner fa-spin"></i> Locating...
                  </>
                ) : (
                  <>
                    Track Shipment <i className="ph ph-magnifying-glass"></i>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live Tracking Result Modal Card */}
            {trackingResult && (
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>TRACKING ID</span>
                    <h4 style={{ color: 'var(--text-heading)', fontSize: '1.25rem', margin: '4px 0 0' }}>{trackingResult.id}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>MODE</span>
                    <h4 style={{ color: 'var(--text-heading)', fontSize: '1.1rem', margin: '4px 0 0' }}>{trackingResult.mode}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>ESTIMATED DELIVERY</span>
                    <h4 style={{ color: 'var(--accent-orange)', fontSize: '1.1rem', margin: '4px 0 0', fontWeight: 700 }}>{trackingResult.eta}</h4>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                    <span><strong>Origin:</strong> {trackingResult.origin}</span>
                    <span><strong>Destination:</strong> {trackingResult.destination}</span>
                  </div>
                </div>

                {/* Progress Steps */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {trackingResult.steps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: step.completed ? 'var(--accent-orange)' : 'var(--border-color)',
                          color: step.completed ? '#ffffff' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {step.completed ? <i className="ph-bold ph-check"></i> : idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h5 style={{ color: step.completed ? 'var(--text-heading)' : 'var(--text-muted)', fontSize: '1rem', margin: 0, fontWeight: 600 }}>
                          {step.name}
                        </h5>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
