"use client";

import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/lib/admin-auth-context';
import {
  Users,
  UserPlus,
  Shield,
  ShieldAlert,
  Trash2,
  AlertCircle,
  X,
  Lock,
  Mail,
  User,
  CheckCircle2,
  Power,
  RefreshCw,
} from 'lucide-react';

interface AdminAccount {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export default function AdminsPage() {
  const { user: currentUser } = useAdminAuth();

  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin');
  const [submitting, setSubmitting] = useState(false);

  // Delete State
  const [adminToDelete, setAdminToDelete] = useState<AdminAccount | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/users', { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setAdmins(data.users);
      } else {
        setError(data.message || 'Failed to fetch admin users.');
      }
    } catch {
      setError('Network error fetching admin users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          password: newPassword,
          role: newRole,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage('New administrator account created successfully.');
        setTimeout(() => setSuccessMessage(null), 3000);
        setCreateModalOpen(false);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        setNewRole('admin');
        fetchAdmins();
      } else {
        setError(data.message || 'Failed to create administrator.');
      }
    } catch {
      setError('Network error creating administrator.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (admin: AdminAccount) => {
    if (admin.id === currentUser?.id) {
      alert('You cannot deactivate your own administrative account.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${admin.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !admin.isActive }),
      });

      if (res.ok) {
        setAdmins((prev) =>
          prev.map((item) =>
            item.id === admin.id ? { ...item, isActive: !admin.isActive } : item
          )
        );
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update account status.');
      }
    } catch {
      alert('Network error updating status.');
    }
  };

  const handleRoleChange = async (admin: AdminAccount, newRole: string) => {
    if (admin.id === currentUser?.id) {
      alert('You cannot change your own administrative role.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${admin.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setAdmins((prev) =>
          prev.map((item) =>
            item.id === admin.id ? { ...item, role: newRole as AdminAccount['role'] } : item
          )
        );
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update role.');
      }
    } catch {
      alert('Network error updating role.');
    }
  };

  const confirmDeleteAdmin = async () => {
    if (!adminToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/users/${adminToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAdminToDelete(null);
        fetchAdmins();
        setSuccessMessage('Administrator account removed.');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete admin.');
      }
    } catch {
      alert('Network error deleting admin.');
    } finally {
      setDeleting(false);
    }
  };

  if (currentUser?.role !== 'superadmin') {
    return (
      <div className="ms-table-container-card" style={{ padding: '48px 24px', textAlign: 'center' }}>
        <ShieldAlert style={{ width: '48px', height: '48px', color: '#D97706', margin: '0 auto 16px auto' }} />
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#10182B', margin: 0 }}>Superadmin Access Required</h3>
        <p style={{ fontSize: '13px', color: '#53627A', margin: '8px 0 0 0' }}>
          Only administrators with the Superadmin role have privileges to manage system accounts.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Provision Button Card */}
      <div className="ms-admin-card-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#10182B', margin: 0 }}>Admin Personnel Management</h2>
            <p style={{ fontSize: '13px', color: '#53627A', margin: '4px 0 0 0' }}>
              Control operator permissions, provision new administrators, and enforce security policies
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => fetchAdmins()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '10px', fontSize: '12px', fontWeight: 700, color: '#10182B', cursor: 'pointer' }}
              title="Refresh List"
            >
              <RefreshCw style={{ width: '13px', height: '13px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="ms-btn-view-all"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}
            >
              <UserPlus style={{ width: '15px', height: '15px' }} />
              <span>Create New Admin</span>
            </button>
          </div>
        </div>
      </div>

      {successMessage && (
        <div style={{ padding: '14px 18px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 style={{ width: '18px', height: '18px', color: '#059669', flexShrink: 0 }} />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="ms-admin-error-box">
          <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Admins Table Card */}
      <div className="ms-table-container-card">
        {loading ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#53627A' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #FF5428', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px auto' }}></div>
            <p style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Loading administrators...</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="ms-inquiries-table">
              <thead>
                <tr>
                  <th>Administrator</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => {
                  const isSelf = admin.id === currentUser?.id;

                  return (
                    <tr key={admin.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div className="ms-admin-avatar" style={{ width: '38px', height: '38px' }}>
                            {admin.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#10182B', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span>{admin.name}</span>
                              {isSelf && (
                                <span style={{ fontSize: '10px', fontWeight: 800, background: '#FFF0EB', color: '#FF5428', border: '1px solid rgba(255, 183, 163, 0.6)', padding: '2px 6px', borderRadius: '4px' }}>
                                  You
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '12px', color: '#53627A', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <Mail style={{ width: '11px', height: '11px', color: '#8A9BB4' }} />
                              <span>{admin.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {isSelf ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '9999px', background: '#FFF0EB', color: '#FF5428', border: '1px solid rgba(255, 183, 163, 0.6)' }}>
                            <Shield style={{ width: '11px', height: '11px' }} />
                            {admin.role}
                          </span>
                        ) : (
                          <select
                            value={admin.role}
                            onChange={(e) => handleRoleChange(admin, e.target.value)}
                            className="ms-status-dropdown"
                          >
                            <option value="admin">ADMIN</option>
                            <option value="superadmin">SUPERADMIN</option>
                          </select>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleStatus(admin)}
                          disabled={isSelf}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            border: admin.isActive ? '1px solid #A7F3D0' : '1px solid #FCA5A5',
                            background: admin.isActive ? '#ECFDF5' : '#FEF2F2',
                            color: admin.isActive ? '#059669' : '#DC2626',
                            cursor: isSelf ? 'default' : 'pointer',
                            opacity: isSelf ? 0.7 : 1,
                          }}
                        >
                          <Power style={{ width: '11px', height: '11px' }} />
                          <span>{admin.isActive ? 'Active' : 'Disabled'}</span>
                        </button>
                      </td>
                      <td style={{ fontSize: '13px', color: '#53627A' }}>
                        {admin.lastLogin
                          ? new Date(admin.lastLogin).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Never'}
                      </td>
                      <td style={{ fontSize: '13px', color: '#53627A' }}>
                        {new Date(admin.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {!isSelf && (
                          <button
                            onClick={() => setAdminToDelete(admin)}
                            style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 10px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', cursor: 'pointer' }}
                            title="Delete Admin"
                          >
                            <Trash2 style={{ width: '14px', height: '14px' }} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Provision New Admin Modal */}
      {createModalOpen && (
        <div className="ms-modal-overlay" onClick={() => setCreateModalOpen(false)}>
          <div className="ms-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ms-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#10182B', margin: 0 }}>Provision New Administrator</h3>
                <p style={{ fontSize: '12px', color: '#53627A', margin: '3px 0 0 0' }}>Assign role and login credentials</p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{ background: 'transparent', border: 'none', padding: '6px', color: '#53627A', cursor: 'pointer' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin}>
              <div className="ms-modal-body">
                <div>
                  <label className="ms-admin-form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="ms-admin-input"
                    style={{ paddingLeft: '16px' }}
                  />
                </div>

                <div>
                  <label className="ms-admin-form-label">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="operator@mslogistics.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="ms-admin-input"
                    style={{ paddingLeft: '16px' }}
                  />
                </div>

                <div>
                  <label className="ms-admin-form-label">Initial Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="ms-admin-input"
                    style={{ paddingLeft: '16px' }}
                  />
                </div>

                <div>
                  <label className="ms-admin-form-label">Administrative Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as 'admin' | 'superadmin')}
                    className="ms-admin-input"
                    style={{ paddingLeft: '16px', cursor: 'pointer' }}
                  >
                    <option value="admin">Standard Admin (View & Manage Inquiries)</option>
                    <option value="superadmin">Super Admin (Full System Privileges)</option>
                  </select>
                </div>
              </div>

              <div className="ms-modal-footer">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  style={{ padding: '10px 18px', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E5EAF0', fontWeight: 700, fontSize: '13px', color: '#53627A', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="ms-admin-btn-primary"
                  style={{ width: 'auto', padding: '0 24px', height: '44px', margin: 0 }}
                >
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Admin Modal */}
      {adminToDelete && (
        <div className="ms-modal-overlay" onClick={() => setAdminToDelete(null)}>
          <div className="ms-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="ms-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#DC2626', margin: 0 }}>Delete Administrator</h3>
              <button
                onClick={() => setAdminToDelete(null)}
                style={{ background: 'transparent', border: 'none', padding: '6px', color: '#53627A', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div className="ms-modal-body">
              <p style={{ fontSize: '14px', color: '#10182B', margin: 0 }}>
                Are you sure you want to delete administrator <strong>{adminToDelete.name}</strong> ({adminToDelete.email})?
              </p>
              <p style={{ fontSize: '12px', color: '#DC2626', margin: '4px 0 0 0' }}>
                They will immediately lose all access to the admin portal.
              </p>
            </div>
            <div className="ms-modal-footer">
              <button
                onClick={() => setAdminToDelete(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E5EAF0', fontWeight: 700, fontSize: '13px', color: '#53627A', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAdmin}
                disabled={deleting}
                style={{ padding: '8px 18px', borderRadius: '8px', background: '#DC2626', border: 'none', fontWeight: 700, fontSize: '13px', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {deleting ? 'Deleting...' : 'Delete Admin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
