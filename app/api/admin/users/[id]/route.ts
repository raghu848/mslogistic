import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, authorizeRoles } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import mongoose from 'mongoose';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user: currentUser } = auth;
  if (!authorizeRoles(currentUser, 'superadmin') && currentUser._id.toString() !== (await context.params).id) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Superadmin role required.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID format.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, role, isActive, password } = body;

    await connectDB();
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }

    // Safety: Prevent self-deactivation of the logged in superadmin
    if (targetUser._id.toString() === currentUser._id.toString()) {
      if (isActive === false) {
        return NextResponse.json(
          { success: false, message: 'You cannot deactivate your own superadmin account.' },
          { status: 400 }
        );
      }
      if (role && role !== 'superadmin') {
        return NextResponse.json(
          { success: false, message: 'You cannot remove your own superadmin role.' },
          { status: 400 }
        );
      }
    }

    if (name && typeof name === 'string') {
      targetUser.name = name.trim();
    }

    if (role && ['admin', 'superadmin'].includes(role) && currentUser.role === 'superadmin') {
      targetUser.role = role;
    }

    if (typeof isActive === 'boolean' && currentUser.role === 'superadmin') {
      targetUser.isActive = isActive;
    }

    if (password && typeof password === 'string' && password.length >= 6) {
      targetUser.password = password; // pre-save hook will hash it
    }

    await targetUser.save();

    return NextResponse.json({
      success: true,
      message: 'Admin account updated successfully.',
      user: {
        id: targetUser._id.toString(),
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role,
        isActive: targetUser.isActive,
        updatedAt: targetUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update admin account.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const auth = await authenticateRequest(req);
  if (!auth.success) {
    return auth.response;
  }

  const { user: currentUser } = auth;
  if (!authorizeRoles(currentUser, 'superadmin')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden. Superadmin role required.' },
      { status: 403 }
    );
  }

  try {
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID format.' },
        { status: 400 }
      );
    }

    // Prevent deleting own account
    if (id === currentUser._id.toString()) {
      return NextResponse.json(
        { success: false, message: 'You cannot delete your own account.' },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account deleted successfully.',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete admin account.' },
      { status: 500 }
    );
  }
}
