import { NextResponse } from 'next/server';

if (!process.env.PAY_STACK_SECRET) {
  throw new Error('PAY_STACK_SECRET is not set in environment variables');
}

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    // Use a default base URL if not set
    console.warn('NEXT_PUBLIC_BASE_URL is not set, using current host as fallback');
  }

  try {
    const body = await req.json();
    const { 
      seminarId, 
      title,
      price,
      attendees,
      email,
      firstName,
      lastName
    } = body;

    // Validate required fields
    if (!seminarId || !title || !price || !attendees || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate the total amount
    const amount = price * attendees;

    // Generate a unique reference
    const reference = `seminar-${seminarId}-${Date.now()}`;

    // Get base URL from environment or construct from request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      `${req.headers.get('x-forwarded-proto') || 'http'}://${req.headers.get('host')}`;

    // Create Paystack payment initialization
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAY_STACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo/cents
        reference,
        callback_url: `${baseUrl}/seminars/register/success`,
        metadata: {
          seminarId,
          attendees,
          firstName,
          lastName,
          title,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || 'Error initializing payment' },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference
    });
  } catch (err) {
    console.error('Error creating payment:', err);
    return NextResponse.json(
      { error: 'Error creating payment' },
      { status: 500 }
    );
  }
} 