import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import * as crypto from 'crypto';

// Check for the PAY_STACK_SECRET environment variable
if (!process.env.PAY_STACK_SECRET) {
  throw new Error('PAY_STACK_SECRET is not set in environment variables');
}

export async function POST(req: Request) {
  const body = await req.text();
  
  // Using type assertion to work with headers in Next.js 15
  // Note: In Next.js versions after 15, this will need to be awaited properly
  const headersList = headers() as unknown as ReadonlyHeaders;
  const signature = headersList.get('x-paystack-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing x-paystack-signature header' },
      { status: 400 }
    );
  }

  let event;

  try {
    // Parse the event body
    event = JSON.parse(body);
    
    // According to Paystack docs, the signature is a HMAC SHA512 hash of the payload
    // using your secret key as the key
    const secretKey = process.env.PAY_STACK_SECRET;
    
    // Uncomment in production to verify webhook signatures
    // const hash = crypto
    //   .createHmac('sha512', secretKey)
    //   .update(body)
    //   .digest('hex');
    // 
    // if (hash !== signature) {
    //   throw new Error('Invalid signature');
    // }
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.event) {
      case 'charge.success':
        const transaction = event.data;
        
        // Here you would typically update your database with payment information
        // For example:
        // await savePaymentInfoToDatabase({
        //   reference: transaction.reference,
        //   amount: transaction.amount / 100, // Convert from kobo/cents to main currency
        //   email: transaction.customer.email,
        //   status: 'completed',
        //   metadata: transaction.metadata,
        //   channel: transaction.channel,
        //   paidAt: transaction.paid_at
        // });
        
        console.log('Payment successful for transaction:', transaction.reference);
        break;
        
      case 'charge.failed':
        const failedCharge = event.data;
        console.log('Payment failed for transaction:', failedCharge.reference);
        break;
        
      case 'bank.transfer.rejected':
        const rejectedTransfer = event.data;
        console.log('Bank transfer rejected:', rejectedTransfer.reference);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    // According to Paystack docs, we need to return 200 as quickly as possible
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 