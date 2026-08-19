"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  AlertCircle,
  X,
  Building2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  organizationName?: string;
  address?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function InquiriesPage() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter,
        search: searchQuery,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      const res = await fetch(`/api/admin/inquiries?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();

      if (res.ok && data.success) {
        setInquiries(data.inquiries);
        setPagination(data.pagination);

        // If an initial id was requested via query param, open that inspection modal
        if (initialId && !selectedInquiry) {
          const match = data.inquiries.find((item: Inquiry) => item.id === initialId);
          if (match) setSelectedInquiry(match);
        }
      } else {
        setError(data.message || 'Failed to load inquiries.');
      }
    } catch {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter, searchQuery, initialId]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus as Inquiry['status'] } : item
          )
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) =>
            prev ? { ...prev, status: newStatus as Inquiry['status'] } : null
          );
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryToDelete.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setInquiryToDelete(null);
        if (selectedInquiry?.id === inquiryToDelete.id) {
          setSelectedInquiry(null);
        }
        fetchInquiries();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete inquiry.');
      }
    } catch {
      alert('Network error while deleting inquiry.');
    } finally {
      setIsDeleting(false);
    }
  };

  const startRecord = (pagination.currentPage - 1) * pagination.limit + 1;
  const endRecord = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalCount
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header & Filter Card */}
      <div className="ms-admin-card-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#10182B', margin: 0 }}>Customer Quote Inquiries</h2>
            <p style={{ fontSize: '13px', color: '#53627A', margin: '4px 0 0 0' }}>
              Filter, track, update status, and manage incoming logistics leads
            </p>
          </div>

          <button
            onClick={() => fetchInquiries()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#FFFFFF', border: '1px solid #E5EAF0', borderRadius: '10px', fontSize: '12px', fontWeight: 700, color: '#10182B', cursor: 'pointer' }}
          >
            <RefreshCw style={{ width: '13px', height: '13px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Search & Filter Row */}
        <div className="ms-admin-filter-row">
          <div className="ms-admin-search-box">
            <Search style={{ width: '16px', height: '16px', color: '#8A9BB4', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by client name, email, phone, organization..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="ms-admin-search-input"
            />
          </div>

          <div className="ms-admin-select-box">
            <Filter style={{ width: '16px', height: '16px', color: '#8A9BB4', position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="ms-admin-select-input"
            >
              <option value="all">All Statuses</option>
              <option value="new">Status: New Only</option>
              <option value="contacted">Status: Contacted</option>
              <option value="in-progress">Status: In Progress</option>
              <option value="resolved">Status: Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="ms-admin-error-box">
          <AlertCircle style={{ width: '18px', height: '18px', flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 2. Main Data Table Card */}
      <div className="ms-table-container-card">
        {loading ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#53627A' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #FF5428', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px auto' }}></div>
            <p style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center', color: '#8A9BB4' }}>
            <p style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>No inquiries found</p>
            <p style={{ fontSize: '13px', margin: '6px 0 0 0' }}>Try adjusting your search keywords or status filter.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="ms-inquiries-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email & Phone</th>
                  <th>Organization</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: '#10182B', fontSize: '14px' }}>{inquiry.name}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '12px', color: '#53627A', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Mail style={{ width: '12px', height: '12px', color: '#8A9BB4' }} />
                          {inquiry.email}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Phone style={{ width: '12px', height: '12px', color: '#8A9BB4' }} />
                          {inquiry.mobile}
                        </span>
                      </div>
                    </td>
                    <td>
                      {inquiry.organizationName ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: '#10182B', fontSize: '13px' }}>
                          <Building2 style={{ width: '14px', height: '14px', color: '#8A9BB4' }} />
                          {inquiry.organizationName}
                        </span>
                      ) : (
                        <span style={{ color: '#8A9BB4', fontStyle: 'italic', fontSize: '13px' }}>Individual</span>
                      )}
                    </td>
                    <td>
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                        className="ms-status-dropdown"
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="in-progress">IN PROGRESS</option>
                        <option value="resolved">RESOLVED</option>
                      </select>
                    </td>
                    <td style={{ fontSize: '13px', color: '#53627A' }}>
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="ms-btn-inspect"
                          title="Inspect Inquiry"
                        >
                          <Eye style={{ width: '14px', height: '14px' }} />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => setInquiryToDelete(inquiry)}
                          style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 10px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 style={{ width: '14px', height: '14px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div
              style={{
                padding: '16px 24px',
                borderTop: '1px solid #E5EAF0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                background: '#FFFFFF',
                fontSize: '13px',
                color: '#53627A',
              }}
            >
              <div>
                Showing <strong style={{ color: '#10182B' }}>{pagination.totalCount > 0 ? startRecord : 0}</strong> to <strong style={{ color: '#10182B' }}>{endRecord}</strong> of <strong style={{ color: '#10182B' }}>{pagination.totalCount}</strong> inquiries
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrevPage}
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: '#FFFFFF',
                    border: '1px solid #E5EAF0',
                    color: '#10182B',
                    cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed',
                    opacity: pagination.hasPrevPage ? 1 : 0.4,
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                  }}
                >
                  <ChevronLeft style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                  <span style={{ display: 'inline', verticalAlign: 'middle' }}>Prev</span>
                </button>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#10182B', padding: '0 8px', whiteSpace: 'nowrap' }}>
                  Page {pagination.currentPage} of {pagination.totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={!pagination.hasNextPage}
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    background: '#FFFFFF',
                    border: '1px solid #E5EAF0',
                    color: '#10182B',
                    cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed',
                    opacity: pagination.hasNextPage ? 1 : 0.4,
                    whiteSpace: 'nowrap',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ display: 'inline', verticalAlign: 'middle' }}>Next</span>
                  <ChevronRight style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Detail Inspection Modal */}
      {selectedInquiry && (
        <div className="ms-modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="ms-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ms-modal-header">
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#10182B', margin: 0 }}>Inquiry Details</h3>
                <p style={{ fontSize: '12px', color: '#53627A', margin: '3px 0 0 0' }}>Reference ID: {selectedInquiry.id}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                style={{ background: 'transparent', border: 'none', padding: '6px', color: '#53627A', cursor: 'pointer' }}
              >
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div className="ms-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Client Name</p>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#10182B', margin: '4px 0 0 0' }}>{selectedInquiry.name}</p>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Organization</p>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#10182B', margin: '4px 0 0 0' }}>{selectedInquiry.organizationName || 'Individual'}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Email</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#10182B', margin: '4px 0 0 0' }}>{selectedInquiry.email}</p>
                </div>
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Phone</p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#10182B', margin: '4px 0 0 0' }}>{selectedInquiry.mobile}</p>
                </div>
              </div>

              {selectedInquiry.address && (
                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Location / Address</p>
                  <p style={{ fontSize: '13px', color: '#10182B', margin: '4px 0 0 0' }}>{selectedInquiry.address}</p>
                </div>
              )}

              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E5EAF0' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#8A9BB4', textTransform: 'uppercase', margin: 0 }}>Customer Message / Quote Request</p>
                <p style={{ fontSize: '13px', color: '#10182B', margin: '8px 0 0 0', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{selectedInquiry.message}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#FFF0EB', borderRadius: '12px', border: '1px solid rgba(255, 183, 163, 0.6)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#FF5428' }}>Current Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value)}
                  className="ms-status-dropdown"
                >
                  <option value="new">NEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="in-progress">IN PROGRESS</option>
                  <option value="resolved">RESOLVED</option>
                </select>
              </div>
            </div>

            <div className="ms-modal-footer">
              <button
                onClick={() => setSelectedInquiry(null)}
                style={{ padding: '8px 18px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E5EAF0', fontWeight: 700, fontSize: '13px', color: '#53627A', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {inquiryToDelete && (
        <div className="ms-modal-overlay" onClick={() => setInquiryToDelete(null)}>
          <div className="ms-modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="ms-modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#DC2626', margin: 0 }}>Confirm Delete</h3>
              <button
                onClick={() => setInquiryToDelete(null)}
                style={{ background: 'transparent', border: 'none', padding: '6px', color: '#53627A', cursor: 'pointer' }}
              >
                <X style={{ width: '18px', height: '18px' }} />
              </button>
            </div>
            <div className="ms-modal-body">
              <p style={{ fontSize: '14px', color: '#10182B', margin: 0 }}>
                Are you sure you want to permanently delete the inquiry from <strong>{inquiryToDelete.name}</strong>?
              </p>
              <p style={{ fontSize: '12px', color: '#DC2626', margin: '4px 0 0 0' }}>
                This action cannot be undone.
              </p>
            </div>
            <div className="ms-modal-footer">
              <button
                onClick={() => setInquiryToDelete(null)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E5EAF0', fontWeight: 700, fontSize: '13px', color: '#53627A', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{ padding: '8px 18px', borderRadius: '8px', background: '#DC2626', border: 'none', fontWeight: 700, fontSize: '13px', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {isDeleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
