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
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    await connectDB();

    // Build filter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { organizationName: searchRegex },
        { message: searchRegex },
      ];
    }

    const skip = (page - 1) * limit;

    const [totalCount, inquiries] = await Promise.all([
      ContactInquiry.countDocuments(filter),
      ContactInquiry.find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return NextResponse.json({
      success: true,
      inquiries: inquiries.map((item) => ({
        id: item._id.toString(),
        name: item.name,
        email: item.email,
        mobile: item.mobile,
        organizationName: item.organizationName || '',
        address: item.address || '',
        message: item.message,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Inquiries list error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve inquiries.' },
      { status: 500 }
    );
  }
}
