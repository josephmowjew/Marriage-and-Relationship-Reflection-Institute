import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'zar',
            product_data: {
              name: title,
              description: `Registration for ${attendees} ${attendees === 1 ? 'person' : 'people'}`,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: attendees,
        },
      ],
      customer_email: email,
      metadata: {
        seminarId,
        attendees,
        firstName,
        lastName,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/seminars/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/seminars/register/${seminarId}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 