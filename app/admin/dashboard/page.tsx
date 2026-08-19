"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Clock,
  CheckCircle2,
  PhoneCall,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Eye,
  TrendingUp,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';

interface Stats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  resolved: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  organizationName?: string;
  status: 'new' | 'contacted' | 'in-progress' | 'resolved';
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setStats(data.stats);
        setRecentInquiries(data.recentInquiries || []);
      } else {
        setError(data.message || 'Failed to load dashboard metrics');
      }
    } catch {
      setError('Network error connecting to API');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setRecentInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as RecentInquiry['status'] } : item
          )
        );
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: '110px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5EAF0' }}></div>
          ))}
        </div>
        <div style={{ height: '360px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5EAF0' }}></div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Top Section Banner & Actions */}
      <div className="ms-adm-dash-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#10182B', margin: 0, letterSpacing: '-0.01em' }}>
            System Performance Overview
          </h2>
          <p style={{ fontSize: '13px', color: '#53627A', margin: '4px 0 0 0' }}>
            Real-time lead capture and customer inquiry tracking
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: '#FFFFFF',
              border: '1px solid #E5EAF0',
              color: '#10182B',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            <RefreshCw style={{ width: '14px', height: '14px', animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/inquiries"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#FF5428',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              borderRadius: '10px',
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 84, 40, 0.25)',
            }}
          >
            <span>View All Inquiries</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </Link>
        </div>
      </div>

      {error && (
        <div className="ms-admin-error-box">
          <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. 4 Primary Metric Stat Cards */}
      <div className="ms-adm-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
        {/* Total Inquiries */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '16px', padding: '22px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              Total Inquiries
            </p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#10182B', margin: '8px 0 4px 0', lineHeight: 1 }}>
              {stats.total}
            </p>
            <p style={{ fontSize: '12px', color: '#53627A', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp style={{ width: '13px', height: '13px', color: '#FF5428' }} />
              <span>All recorded submissions</span>
            </p>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#10182B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Inbox style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* New Inquiries */}
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(255, 183, 163, 0.8)', borderRadius: '16px', padding: '22px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: '#FF5428' }}></div>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: '#FF5428', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              New Inquiries
            </p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#FF5428', margin: '8px 0 4px 0', lineHeight: 1 }}>
              {stats.new}
            </p>
            <p style={{ fontSize: '12px', color: '#53627A', margin: 0 }}>
              Awaiting initial contact
            </p>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FFF0EB', color: '#FF5428', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <PhoneCall style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* In Progress */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '16px', padding: '22px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              In Progress
            </p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#10182B', margin: '8px 0 4px 0', lineHeight: 1 }}>
              {stats.inProgress}
            </p>
            <p style={{ fontSize: '12px', color: '#53627A', margin: 0 }}>
              Quotes & routing in review
            </p>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Resolved */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '16px', padding: '22px 24px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              Resolved
            </p>
            <p style={{ fontSize: '32px', fontWeight: 900, color: '#10182B', margin: '8px 0 4px 0', lineHeight: 1 }}>
              {stats.resolved}
            </p>
            <p style={{ fontSize: '12px', color: '#53627A', margin: 0 }}>
              Quotes booked & closed
            </p>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* 3. Recent Inquiries Card Table */}
      <div className="ms-table-container-card" style={{ background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5EAF0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#10182B', margin: 0 }}>
              Recent Contact Inquiries
            </h3>
            <p style={{ fontSize: '12px', color: '#53627A', margin: '4px 0 0 0' }}>
              Latest quote submissions from the public website
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            style={{ fontSize: '13px', fontWeight: 700, color: '#FF5428', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: '#8A9BB4' }}>
            <Inbox style={{ width: '40px', height: '40px', margin: '0 auto 12px auto', opacity: 0.4 }} />
            <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>No inquiries recorded yet</p>
            <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>
              Submissions through the public Contact form will appear here in real-time.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="ms-inquiries-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5EAF0' }}>
                  <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Client / Contact</th>
                  <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Organization</th>
                  <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date Received</th>
                  <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</th>
                  <th style={{ padding: '14px 24px', fontSize: '11px', fontWeight: 800, color: '#8A9BB4', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} style={{ borderBottom: '1px solid #E5EAF0' }}>
                    <td style={{ padding: '18px 24px' }}>
                      <div style={{ fontWeight: 800, color: '#10182B', fontSize: '14px' }}>{inquiry.name}</div>
                      <div style={{ fontSize: '12px', color: '#53627A', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail style={{ width: '12px', height: '12px', color: '#8A9BB4' }} />
                          {inquiry.email}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Phone style={{ width: '12px', height: '12px', color: '#8A9BB4' }} />
                          {inquiry.mobile}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '18px 24px' }}>
                      {inquiry.organizationName ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#10182B', fontSize: '13px' }}>
                          <Building2 style={{ width: '14px', height: '14px', color: '#8A9BB4' }} />
                          {inquiry.organizationName}
                        </span>
                      ) : (
                        <span style={{ color: '#8A9BB4', fontStyle: 'italic', fontSize: '13px' }}>Individual</span>
                      )}
                    </td>
                    <td style={{ padding: '18px 24px', fontSize: '13px', color: '#53627A' }}>
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={{ padding: '18px 24px' }}>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          background: '#FFFFFF',
                          color: '#10182B',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in-progress">IN PROGRESS</option>
                        <option value="resolved">RESOLVED</option>
                      </select>
                    </td>
                    <td style={{ padding: '18px 24px', textAlign: 'right' }}>
                      <Link
                        href={`/admin/inquiries?id=${inquiry.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          background: '#F1F5F9',
                          border: '1px solid #E2E8F0',
                          color: '#10182B',
                          textDecoration: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <Eye style={{ width: '14px', height: '14px' }} />
                        <span>Inspect</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
