"use client";

import React, { useState } from 'react';
import { useAdminAuth } from '@/lib/admin-auth-context';
import {
  Shield,
  Key,
  Database,
  Server,
  CheckCircle2,
  AlertCircle,
  Mail,
  User,
  Lock,
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (!user) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: newPassword,
          currentPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Your password has been updated successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Failed to update password.');
      }
    } catch {
      setError('Network error. Could not reach server.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="ms-admin-card-header">
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#10182B', margin: 0 }}>System & Account Settings</h2>
        <p style={{ fontSize: '13px', color: '#53627A', margin: '4px 0 0 0' }}>
          Manage your operator profile, security credentials, and view system health
        </p>
      </div>

      {success && (
        <div style={{ padding: '14px 18px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0 }} />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="ms-admin-error-box">
          <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Operator Profile Card */}
      <div className="ms-table-container-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5EAF0', paddingBottom: '16px', marginBottom: '20px' }}>
          <Shield style={{ width: '20px', height: '20px', color: '#FF5428' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#10182B', margin: 0 }}>Operator Account Profile</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <label className="ms-admin-form-label">Full Name</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E5EAF0', borderRadius: '10px', marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#10182B' }}>
              <User style={{ width: '16px', height: '16px', color: '#8A9BB4' }} />
              <span>{user?.name}</span>
            </div>
          </div>

          <div>
            <label className="ms-admin-form-label">Email Address</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E5EAF0', borderRadius: '10px', marginTop: '6px', fontSize: '14px', fontWeight: 600, color: '#10182B' }}>
              <Mail style={{ width: '16px', height: '16px', color: '#8A9BB4' }} />
              <span>{user?.email}</span>
            </div>
          </div>

          <div>
            <label className="ms-admin-form-label">Role Tier</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E5EAF0', borderRadius: '10px', marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#FF5428' }}>
              <Shield style={{ width: '16px', height: '16px', color: '#FF5428' }} />
              <span style={{ textTransform: 'uppercase' }}>{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Password Change Form Card */}
      <div className="ms-table-container-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5EAF0', paddingBottom: '16px', marginBottom: '20px' }}>
          <Key style={{ width: '20px', height: '20px', color: '#FF5428' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#10182B', margin: 0 }}>Update Security Password</h3>
        </div>

        <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label className="ms-admin-form-label">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="ms-admin-input"
              style={{ paddingLeft: '16px', marginTop: '6px' }}
            />
          </div>

          <div>
            <label className="ms-admin-form-label">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="ms-admin-input"
              style={{ paddingLeft: '16px', marginTop: '6px' }}
            />
          </div>

          <div style={{ paddingTop: '8px' }}>
            <button
              type="submit"
              disabled={updating}
              className="ms-admin-btn-primary"
              style={{ width: 'auto', padding: '0 28px', height: '48px', margin: 0 }}
            >
              {updating ? 'Saving...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. System Infrastructure Info Card */}
      <div className="ms-table-container-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5EAF0', paddingBottom: '16px', marginBottom: '20px' }}>
          <Server style={{ width: '20px', height: '20px', color: '#FF5428' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#10182B', margin: 0 }}>System & Database Health</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }}></div>
              <span>Database Online</span>
            </div>
            <p style={{ fontSize: '12px', color: '#53627A', margin: '4px 0 0 0' }}>MongoDB Production Clustered</p>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }}></div>
              <span>Auth Engine Active</span>
            </div>
            <p style={{ fontSize: '12px', color: '#53627A', margin: '4px 0 0 0' }}>JWT + HTTP-Only Cookie</p>
          </div>

          <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }}></div>
              <span>Lead Submissions API</span>
            </div>
            <p style={{ fontSize: '12px', color: '#53627A', margin: '4px 0 0 0' }}>POST /api/contact Healthy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
