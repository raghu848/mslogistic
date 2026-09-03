import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, authorizeRoles } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(_req);
  if (!auth.success) {
    return auth.response;
  }

  const { user } = auth;
  if (!authorizeRoles(user, 'admin', 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Insufficient permissions.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid inquiry ID format.' },
        { status: 400 }
      );
    }

    await connectDB();
    const inquiry = await ContactInquiry.findById(id).lean();

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      inquiry: {
        id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        mobile: inquiry.mobile,
        organizationName: inquiry.organizationName || '',
        address: inquiry.address || '',
        message: inquiry.message,
        status: inquiry.status,
        createdAt: inquiry.createdAt,
        updatedAt: inquiry.updatedAt,
      },
    });
  } catch (error) {
    console.error('Fetch inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve inquiry.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user } = auth;
  if (!authorizeRoles(user, 'admin', 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Insufficient permissions.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ['new', 'contacted', 'in-progress', 'resolved'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided.' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid inquiry ID format.' },
        { status: 400 }
      );
    }

    await connectDB();
    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      inquiry: {
        id: inquiry._id.toString(),
        status: inquiry.status,
        updatedAt: inquiry.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update inquiry status error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user } = auth;
  if (!authorizeRoles(user, 'admin', 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Insufficient permissions.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid inquiry ID format.' },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedInquiry = await ContactInquiry.findByIdAndDelete(id);

    if (!deletedInquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}
