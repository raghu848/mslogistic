import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, authorizeRoles } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user } = auth;
  if (!authorizeRoles(user, 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Superadmin role required to manage users.' },
      { status: 403 }
    );
  }

  try {
    await connectDB();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select('-password -__v')
      .lean();

    return NextResponse.json({
      success: true,
      users: users.map((u) => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role,
        isActive: u.isActive,
        lastLogin: u.lastLogin,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve admin users.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user } = auth;
  if (!authorizeRoles(user, 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Superadmin role required to create new admins.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const assignedRole = role === 'superadmin' ? 'superadmin' : 'admin';

    await connectDB();

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      role: assignedRole,
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admin account created successfully.',
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          isActive: newUser.isActive,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create admin account.' },
      { status: 500 }
    );
  }
}
