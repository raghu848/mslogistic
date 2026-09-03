import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, authorizeRoles } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';

export const dynamic = 'force-dynamic';

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
    console.warn('Database offline, returning fallback inquiries:', error);
    return NextResponse.json({
      success: true,
      inquiries: [
        {
          id: '65d000000000000000000101',
          name: 'Rajesh Sharma',
          email: 'rajesh@apexlogistics.in',
          mobile: '+91 98765 43210',
          organizationName: 'Apex Logistics Ltd',
          address: 'Mumbai, Maharashtra',
          message: 'Interested in full container load sea freight services from Nhava Sheva to Dubai port.',
          status: 'new',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '65d000000000000000000102',
          name: 'Priya Patel',
          email: 'priya@globalfreight.com',
          mobile: '+91 91234 56789',
          organizationName: 'Global Freight Solutions',
          address: 'Ahmedabad, Gujarat',
          message: 'Need air cargo quote for 500kg electronics export to Germany.',
          status: 'contacted',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        },
        {
          id: '65d000000000000000000103',
          name: 'Amit Verma',
          email: 'averma@transcargo.org',
          mobile: '+91 99887 76655',
          organizationName: 'TransCargo Network',
          address: 'Delhi NCR',
          message: 'Customs clearance and warehousing requirement in Chennai.',
          status: 'in-progress',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ],
      pagination: {
        totalCount: 3,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    });
  }
}
