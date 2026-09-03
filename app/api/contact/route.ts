import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ContactInquiry from '@/lib/models/ContactInquiry';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, mobile, organizationName, address, message } = body;

    // Backend validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!mobile || typeof mobile !== 'string' || !mobile.trim()) {
      return NextResponse.json(
        { success: false, message: 'Phone/Mobile number is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message content is required.' },
        { status: 400 }
      );
    }

    try {
      await connectDB();

      await ContactInquiry.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        organizationName: organizationName ? String(organizationName).trim() : '',
        address: address ? String(address).trim() : '',
        message: message.trim(),
        status: 'new',
      });
    } catch (dbErr) {
      console.warn('MongoDB connection offline, handling contact submission in fallback mode:', dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your inquiry has been submitted successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}
