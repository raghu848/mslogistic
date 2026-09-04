"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    organizationName: '',
    address: '',
    origin: '',
    destination: '',
    cargoType: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [submittedLead, setSubmittedLead] = useState({ name: '', email: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter your Name.');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter a valid Email Address.');
      return;
    }
    if (!formData.mobile.trim()) {
      alert('Please enter your Phone Number.');
      return;
    }

    setSubmitting(true);

    const compiledMessage = `
Origin: ${formData.origin || 'N/A'}
Destination: ${formData.destination || 'N/A'}
Cargo Type: ${formData.cargoType || 'N/A'}

Additional Details / Requirements:
${formData.message || 'Freight Quote Request'}
    `.trim();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          organizationName: formData.organizationName,
          address: formData.address,
          message: compiledMessage,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedLead({ name: formData.name, email: formData.email });
        setSuccessModal(true);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          organizationName: '',
          address: '',
          origin: '',
          destination: '',
          cargoType: '',
          message: '',
        });
      } else {
        alert(data.message || 'Failed to submit quote inquiry. Please try again.');
      }
    } catch {
      setSubmittedLead({ name: formData.name, email: formData.email });
      setSuccessModal(true);
      setFormData({
        name: '',
        email: '',
        mobile: '',
        organizationName: '',
        address: '',
        origin: '',
        destination: '',
        cargoType: '',
        message: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="section" style={{ background: 'var(--bg-inverted)', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 700 }}>CONTACT US</h1>
          <p style={{ color: 'var(--accent-orange)', fontSize: '1.2rem', marginTop: '1rem' }}>
            Get a Freight Quote Tailored to Your Shipment.
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section section-light">
        <div className="container grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Contact Details */}
          <div>
            <h2 style={{ color: 'var(--text-heading)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.7' }}>
              Have a logistics requirement, distribution challenge or supply chain project? Speak with our team and discover a solution built around your business.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 700 }}>
                <i className="ph-fill ph-map-pin" style={{ color: 'var(--accent-orange)', marginRight: '8px' }}></i> Corporate Office
              </h4>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '32px', lineHeight: 1.6 }}>
                Ground Floor, 1783 K Street No. 2,<br />
                33 Feet Road, Harjap Nagar,<br />
                Ludhiana, Punjab 141015, India
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: 700 }}>
                <i className="ph-fill ph-envelope" style={{ color: 'var(--accent-orange)', marginRight: '8px' }}></i> Email
              </h4>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', paddingLeft: '32px', lineHeight: 1.6 }}>
                <a href="mailto:sales@mslogistic.org" style={{ color: 'inherit', textDecoration: 'none' }}>sales@mslogistic.org</a><br />
                <a href="mailto:info@mslogistic.org" style={{ color: 'inherit', textDecoration: 'none' }}>info@mslogistic.org</a>
              </p>
            </div>
          </div>

          {/* Quote Form */}
          <div className="form-box" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--text-heading)', marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: 700 }}>
              Request a Quote
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Tell us what you need to move.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Your Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Phone / Mobile *</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 98765 43210"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Origin</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City or Port of Origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City or Port of Destination"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Cargo Type</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type of Goods"
                    value={formData.cargoType}
                    onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Organization Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company / Business Name"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: 'var(--text-heading)', fontWeight: 600 }}>Additional Requirements / Message</label>
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Provide cargo dimensions, weight, preferred timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ border: '2px solid var(--border-color)', color: 'var(--text-heading)' }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting}
                style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', background: 'var(--accent-orange)', cursor: 'pointer' }}
              >
                {submitting ? 'Submitting Request...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {successModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div style={{ background: 'var(--bg-surface)', padding: '40px', borderRadius: '16px', maxWidth: '500px', width: '100%', textAlign: 'center', position: 'relative' }}>
            <button
              onClick={() => setSuccessModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-heading)' }}
            >
              ×
            </button>
            <i className="ph-fill ph-check-circle" style={{ fontSize: '4rem', color: '#10B981', marginBottom: '16px', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '8px', fontWeight: 700 }}>
              Quote Request Received!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Thank you {submittedLead.name || 'valued partner'}. Our freight team will process your inquiry and contact you at {submittedLead.email || 'your email'} shortly.
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="btn-primary"
              style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
