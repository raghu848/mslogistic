"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface InquiryDetail {
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

export default function InquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInquiry() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/inquiries/${id}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setInquiry(data.inquiry);
        } else {
          setError(data.message || 'Inquiry not found');
        }
      } catch {
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchInquiry();
    }
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      setStatusUpdating(true);
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setInquiry((prev) => (prev ? { ...prev, status: newStatus as InquiryDetail['status'] } : null));
        setSuccessMessage(`Status successfully updated to ${newStatus.toUpperCase()}`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch {
      alert('Network error updating status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/inquiries');
      } else {
        alert('Failed to delete inquiry');
      }
    } catch {
      alert('Network error while deleting inquiry');
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-[#53627A]">
        <div className="w-8 h-8 border-3 border-[#FF5428] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm font-semibold">Loading inquiry details...</p>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="p-8 bg-white rounded-3xl border border-[#E5EAF0] text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h3 className="text-lg font-bold text-[#10182B]">{error || 'Inquiry not found'}</h3>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5428] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#53627A] hover:text-[#FF5428] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries List</span>
        </Link>

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Inquiry</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAF0] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF0] pb-6">
          <div>
            <span className="text-xs font-bold text-[#8A9BB4] uppercase tracking-wider">
              Inquiry ID: {inquiry.id}
            </span>
            <h2 className="text-2xl font-black text-[#10182B] mt-1">{inquiry.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#53627A] uppercase">Status:</span>
            <select
              value={inquiry.status}
              disabled={statusUpdating}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-xs font-bold px-3.5 py-2 rounded-xl border border-[#FF5428] bg-white cursor-pointer hover:border-[#E0431B] focus:outline-none shadow-xs"
            >
              <option value="new">NEW</option>
              <option value="contacted">CONTACTED</option>
              <option value="in-progress">IN PROGRESS</option>
              <option value="resolved">RESOLVED</option>
            </select>
          </div>
        </div>

        {/* Client Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F7F9FB] border border-[#E5EAF0] space-y-1">
            <p className="text-xs font-bold text-[#8A9BB4] uppercase">Email</p>
            <a
              href={`mailto:${inquiry.email}`}
              className="font-semibold text-[#FF5428] hover:underline flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>{inquiry.email}</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F9FB] border border-[#E5EAF0] space-y-1">
            <p className="text-xs font-bold text-[#8A9BB4] uppercase">Mobile Number</p>
            <a
              href={`tel:${inquiry.mobile}`}
              className="font-semibold text-[#10182B] hover:text-[#FF5428] flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{inquiry.mobile}</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F9FB] border border-[#E5EAF0] space-y-1">
            <p className="text-xs font-bold text-[#8A9BB4] uppercase">Organization</p>
            <p className="font-semibold text-[#10182B] flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-[#8A9BB4]" />
              <span>{inquiry.organizationName || 'Individual Contact'}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F9FB] border border-[#E5EAF0] space-y-1">
            <p className="text-xs font-bold text-[#8A9BB4] uppercase">Location / Address</p>
            <p className="font-semibold text-[#10182B] flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[#8A9BB4]" />
              <span>{inquiry.address || 'Not specified'}</span>
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#8A9BB4] uppercase tracking-wider">
            Quote Message Content
          </p>
          <div className="p-5 rounded-2xl bg-[#F7F9FB] border border-[#E5EAF0] text-[#10182B] whitespace-pre-wrap leading-relaxed text-sm">
            {inquiry.message}
          </div>
        </div>

        {/* Timestamps Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A9BB4] pt-4 border-t border-[#E5EAF0] gap-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Submitted on: {new Date(inquiry.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Last Updated: {new Date(inquiry.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
