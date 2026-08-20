import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, rememberMe } = body;

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    await connectDB();

    // Find user with password selected
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user) {
      // Do not expose whether the email exists
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Account is deactivated. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify password with bcrypt
    const isMatch = await user.comparePassword(String(password));
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Update lastLogin timestamp safely
    try {
      await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
    } catch (updateErr) {
      console.warn('Failed to update lastLogin:', updateErr);
    }

    // Generate JWT
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    setAuthCookie(response, token, Boolean(rememberMe));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
    return NextResponse.json(
      { success: false, message: msg },
      { status: 500 }
    );
  }
}
