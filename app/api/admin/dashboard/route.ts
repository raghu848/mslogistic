import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, authorizeRoles } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';

export async function GET(req: NextRequest) {
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
    await connectDB();

    const [
      totalInquiries,
      newInquiries,
      contactedInquiries,
      inProgressInquiries,
      resolvedInquiries,
      recentInquiries,
    ] = await Promise.all([
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ status: 'new' }),
      ContactInquiry.countDocuments({ status: 'contacted' }),
      ContactInquiry.countDocuments({ status: 'in-progress' }),
      ContactInquiry.countDocuments({ status: 'resolved' }),
      ContactInquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total: totalInquiries,
        new: newInquiries,
        contacted: contactedInquiries,
        inProgress: inProgressInquiries,
        resolved: resolvedInquiries,
      },
      recentInquiries: recentInquiries.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        organizationName: item.organizationName,
        status: item.status,
        createdAt: item.createdAt,
      })),
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve dashboard metrics.' },
      { status: 500 }
    );
  }
}
