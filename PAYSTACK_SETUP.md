# Paystack Integration Setup Guide

This guide provides instructions for setting up and configuring Paystack payments in this application.

## Prerequisites

1. Create a [Paystack account](https://dashboard.paystack.com/#/signup)
2. Get your API keys from the [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer)

## Environment Variables

Add the following environment variables to your `.env.local` file:

```
# Paystack API Keys
PAY_STACK_SECRET=sk_test_...
NEXT_PUBLIC_PAY_STACK_PUBLIC_KEY=pk_test_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

- `PAY_STACK_SECRET`: Your Paystack secret key (starts with `sk_test_` for test mode)
- `NEXT_PUBLIC_PAY_STACK_PUBLIC_KEY`: Your Paystack public key (starts with `pk_test_` for test mode)
- `NEXT_PUBLIC_BASE_URL`: Your application URL (used for callback URLs)

## Setting up Paystack Webhooks

Webhooks are essential for receiving payment confirmations and other events from Paystack.

### Setting Up Webhooks

1. Go to the [Paystack Dashboard > Settings > API Keys & Webhooks](https://dashboard.paystack.com/#/settings/developer)
2. Enter your webhook URL: `https://yourdomain.com/api/webhooks`
3. Save your changes

For security, Paystack will send a signature header (`x-paystack-signature`) with each webhook event. This signature is created using your secret key, so you can verify it to ensure the webhook is legitimately from Paystack.

### Important Webhook Events

According to Paystack documentation, the main events to listen for are:

- `charge.success` - This is sent when the customer's payment is successful
- `charge.failed` - This is sent when a payment attempt fails
- `bank.transfer.rejected` - This is sent when a bank transfer is rejected

## Testing Payments

1. Use Paystack's test cards to simulate payments:
   - `4084 0840 8408 4081` - Successful transaction
   - `5060 6666 6666 6666 66` - Successful transaction
   - `4111 1111 1111 1111` - Failed transaction
   - `5105 1051 0510 5100` - Failed transaction

2. For testing, use:
   - Any future expiration date (MM/YY format)
   - Any 3-digit CVV

## Key Files

The Paystack integration consists of the following files:

- `src/lib/paystack.ts` - Client-side Paystack initialization
- `src/app/api/create-checkout-session/route.ts` - Creates a Paystack payment session
- `src/app/api/webhooks/route.ts` - Handles Paystack webhook events
- `src/app/api/verify-payment/route.ts` - Verifies payment status
- `src/app/seminars/register/[id]/page.tsx` - Contains the checkout flow
- `src/app/seminars/register/success/page.tsx` - Success page after payment

## Paystack Dashboard

After implementing Paystack, monitor payments and events through the [Paystack Dashboard](https://dashboard.paystack.com/). Key sections:

- **Transactions** - View all payment attempts
- **Customers** - See customer information
- **Transfers** - Manage transfers (if used)
- **Settings > API Keys & Webhooks** - Manage your API keys and webhook settings

## Webhook Implementation Notes

According to Paystack documentation:

1. Ensure your webhook URL is publicly available (localhost URLs cannot receive events)
2. If using `.htaccess` kindly remember to add the trailing `/` to the URL
3. Test your webhook to ensure you're getting the JSON body and returning a `200 OK` HTTP response
4. For long-running tasks, first acknowledge by returning a `200 OK` before proceeding
5. Failed webhook attempts are retried (every 3 minutes for the first 4 tries in live mode)

## Going to Production

1. Use your live API keys from the Paystack Dashboard
2. Set up production webhooks as described above
3. Update all URLs to your production domain
4. Test the entire payment flow in live mode
5. Uncomment the signature verification code in the webhook handler
6. Ensure your webhook URL is using HTTPS

## Supported Payment Methods

Paystack supports various payment methods depending on your country:

- Card payments (Visa, Mastercard, Verve)
- Bank transfers
- USSD
- Mobile money (in supported countries)
- Bank accounts (direct debit)

## Resources

- [Paystack Documentation](https://paystack.com/docs)
- [Paystack API Reference](https://paystack.com/docs/api)
- [Paystack Testing Guide](https://paystack.com/docs/payments/test-payments)
- [Paystack Integration Samples](https://github.com/PaystackHQ)

## Known Issues

1. **Headers TypeScript Error**: In Next.js routes, you may encounter TypeScript errors regarding the headers() function returning a Promise. This is due to Next.js transitioning the headers() API to be asynchronous. While the synchronous usage still works in Next.js 15, it will be deprecated in future versions. 

   If you encounter linter errors like:
   ```
   Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'
   ```

   There are three ways to handle this:
   - Temporary solution 1: Ignore the TypeScript error if you're using Next.js 15
   - Temporary solution 2: Use type assertion (implemented in our code):
     ```typescript
     import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
     
     const headersList = headers() as unknown as ReadonlyHeaders;
     const signature = headersList.get('x-paystack-signature');
     ```
   - Future-proof solution: Use the async/await syntax for headers when Next.js fully transitions to async headers:
     ```typescript
     const headersList = await headers();
     const signature = headersList.get('x-paystack-signature');
     ```

2. **Payment not going through**: Check that you're using valid test card numbers for testing
3. **Webhooks not receiving**: Ensure your webhook URL is publicly accessible and properly configured
4. **Verification failing**: Make sure you're using the correct verification endpoint and parameters 