"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/lib/admin-auth-context';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft, Eye, EyeOff, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const { user, login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (user) {
      window.location.href = '/admin/dashboard';
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please enter both your email address and password.');
      return;
    }

    setSubmitting(true);

    try {
      const result = await login(cleanEmail, cleanPassword, rememberMe);

      if (result.success) {
        window.location.href = '/admin/dashboard';
      } else {
        setError(result.message || 'Invalid email or password.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail('admin@mslogistics.com');
    setPassword('Admin@MSLogistic2026');
    setError(null);
  };

  return (
    <div className="ms-admin-login-wrapper">
      {/* Top Bar with Return Link */}
      <div className="ms-admin-login-topbar">
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#53627A', textDecoration: 'none' }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          <span>Return to Public Site</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Shield style={{ width: '16px', height: '16px', color: '#FF5428' }} />
          <span>Enterprise Portal</span>
        </div>
      </div>

      {/* Main Centered Login Card Container */}
      <div className="ms-admin-login-container">
        <div className="ms-admin-login-card">
          {/* Logo & Headline */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img
              src="/logo.png"
              alt="MS LOGISTIC"
              className="ms-admin-login-logo"
            />
            <h1 className="ms-admin-login-title">
              ADMIN CONSOLE
            </h1>
            <p className="ms-admin-login-subtitle">
              Secure authorization required to access logistics management
            </p>
          </div>

          {/* Quick Fill Credentials Banner */}
          <div
            onClick={handleFillCredentials}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              backgroundColor: '#FFF7F4',
              border: '1px dashed #FF5428',
              borderRadius: '12px',
              marginBottom: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Click to automatically fill default credentials"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <KeyRound style={{ width: '15px', height: '15px', color: '#FF5428' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#FF5428' }}>
                Default Admin Login
              </span>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FF5428', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Click to Auto-fill
            </span>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="ms-admin-error-box">
              <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontWeight: 500 }}>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="ms-admin-form-group">
              <label className="ms-admin-form-label">
                Work Email
              </label>
              <div className="ms-admin-input-wrapper">
                <Mail className="ms-admin-input-icon" style={{ width: '18px', height: '18px' }} />
                <input
                  type="email"
                  required
                  placeholder="admin@mslogistics.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ms-admin-input"
                />
              </div>
            </div>

            <div className="ms-admin-form-group">
              <label className="ms-admin-form-label">
                Password
              </label>
              <div className="ms-admin-input-wrapper">
                <Lock className="ms-admin-input-icon" style={{ width: '18px', height: '18px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ms-admin-input"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#8A9BB4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <Eye style={{ width: '18px', height: '18px' }} />
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#53627A', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#FF5428', cursor: 'pointer' }}
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="ms-admin-btn-primary"
            >
              {submitting ? (
                <>
                  <div style={{ width: '18px', height: '18px', border: '2px solid #FFFFFF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#8A9BB4' }}>
        &copy; {new Date().getFullYear()} MS LOGISTIC. Internal Operations & Authorized Personnel Only.
      </div>
    </div>
  );
}
