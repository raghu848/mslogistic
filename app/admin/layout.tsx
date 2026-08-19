"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/lib/admin-auth-context';
import './admin.css';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ExternalLink,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // If on login page, render clean container without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Auth Guard
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/admin/login';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F7F9FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #FF5428', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#53627A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Loading Admin Portal...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'superadmin'],
    },
    {
      label: 'Inquiries',
      href: '/admin/inquiries',
      icon: Inbox,
      roles: ['admin', 'superadmin'],
    },
    {
      label: 'Admins',
      href: '/admin/admins',
      icon: Users,
      roles: ['superadmin'],
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      roles: ['admin', 'superadmin'],
    },
  ];

  const visibleNavItems = navItems.filter((item) => item.roles.includes(user.role));

  const getPageTitle = () => {
    if (pathname.includes('/admin/dashboard')) return 'Dashboard Overview';
    if (pathname.includes('/admin/inquiries')) return 'Contact Inquiries';
    if (pathname.includes('/admin/admins')) return 'Admin User Management';
    if (pathname.includes('/admin/settings')) return 'Portal Settings';
    return 'Admin Portal';
  };

  return (
    <div className="ms-admin-shell">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45, backdropFilter: 'blur(2px)' }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 1. Left Fixed Sidebar (280px wide) */}
      <aside className={`ms-admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div>
          {/* Brand Header */}
          <div className="ms-admin-brand-box">
            <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <img
                src="/images/ms_logo.png"
                alt="MS LOGISTIC"
                className="ms-admin-logo-img"
              />
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 8px', borderRadius: '6px', background: '#FFF0EB', color: '#FF5428', border: '1px solid rgba(255, 183, 163, 0.6)' }}>
                Admin
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden"
              style={{ background: 'transparent', border: 'none', padding: '6px', color: '#53627A', cursor: 'pointer' }}
              aria-label="Close sidebar"
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="ms-admin-nav-list">
            <div className="ms-admin-nav-header">
              Management
            </div>
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ms-admin-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon style={{ width: '18px', height: '18px', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <ChevronRight style={{ width: '16px', height: '16px', opacity: 0.8 }} />}
                </Link>
              );
            })}

            <div className="ms-admin-nav-header" style={{ marginTop: '16px' }}>
              Quick Links
            </div>
            <Link
              href="/"
              target="_blank"
              className="ms-admin-nav-item"
              style={{ color: '#53627A' }}
            >
              <ExternalLink style={{ width: '16px', height: '16px', color: '#8A9BB4' }} />
              <span>Public Website</span>
            </Link>
          </nav>
        </div>

        {/* User Profile Card & Logout in Sidebar */}
        <div className="ms-admin-user-box">
          <div className="ms-admin-user-profile">
            <div className="ms-admin-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#10182B', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    background: user.role === 'superadmin' ? '#FFF0EB' : '#EFF6FF',
                    color: user.role === 'superadmin' ? '#FF5428' : '#1D4ED8',
                  }}
                >
                  <Shield style={{ width: '10px', height: '10px' }} />
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="ms-admin-btn-logout"
          >
            <LogOut style={{ width: '15px', height: '15px' }} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Right Main Content Column (Starts after Sidebar) */}
      <div className="ms-admin-main">
        {/* Top Header */}
        <header className="ms-admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
              style={{ background: 'transparent', border: 'none', padding: '6px', color: '#10182B', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Open sidebar menu"
            >
              <Menu style={{ width: '22px', height: '22px' }} />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#10182B', margin: 0, letterSpacing: '-0.01em' }}>
                  {getPageTitle()}
                </h1>
                <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 8px', borderRadius: '6px', background: '#FFF0EB', color: '#FF5428', border: '1px solid rgba(255, 183, 163, 0.6)' }}>
                  ADMIN
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#53627A', margin: '3px 0 0 0' }}>
                MS LOGISTIC Enterprise Management Console
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: '#FFF0EB', border: '1px solid rgba(255, 183, 163, 0.6)', fontSize: '12px', fontWeight: 600, color: '#FF5428' }}>
              <UserCheck style={{ width: '14px', height: '14px' }} />
              <span>Logged in as {user.name}</span>
            </div>
          </div>
        </header>

        {/* Main Canvas Area */}
        <main className="ms-admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
