import { NextResponse } from 'next/server';

if (!process.env.PAY_STACK_SECRET) {
  throw new Error('PAY_STACK_SECRET is not set in environment variables');
}

export async function GET(request: Request) {
  // Safely extract the search parameters
  const url = new URL(request.url);
  const reference = url.searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { error: 'Missing reference parameter' },
      { status: 400 }
    );
  }

  try {
    // Verify the transaction using Paystack API
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAY_STACK_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || 'Could not verify transaction' },
        { status: 400 }
      );
    }

    // Check if the payment was successful
    if (data.data.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }

    const transaction = data.data;
    
    // Extract relevant information from transaction and metadata
    const metadata = transaction.metadata || {};
    
    // Extract relevant information to send back to the client
    const paymentInfo = {
      id: transaction.id,
      reference: transaction.reference,
      status: transaction.status,
      amount: transaction.amount, // Amount in kobo/cents
      currency: transaction.currency,
      email: transaction.customer.email,
      title: metadata.title || 'Seminar Registration',
      attendees: metadata.attendees || 1,
      firstName: metadata.firstName,
      lastName: metadata.lastName,
      created: transaction.paid_at,
      channel: transaction.channel,
    };

    return NextResponse.json(paymentInfo);
  } catch (err: any) {
    console.error('Error verifying payment:', err);
    return NextResponse.json(
      { error: `Error verifying payment: ${err.message}` },
      { status: 500 }
    );
  }
} 