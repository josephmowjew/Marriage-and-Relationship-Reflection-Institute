'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const trxref = searchParams.get('trxref'); // Paystack also sends this parameter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<any>(null);

  useEffect(() => {
    // Verify the payment with the backend
    const verifyPayment = async () => {
      // Use either reference or trxref (whichever is available)
      const paymentReference = reference || trxref;
      
      if (!paymentReference) {
        setError('No transaction reference provided');
        setLoading(false);
        return;
      }

      try {
        // Call an API route to verify the payment status
        const response = await fetch(`/api/verify-payment?reference=${paymentReference}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Could not verify payment');
        }

        setPaymentInfo(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error verifying payment:', err);
        setError(err.message || 'Could not verify payment. Please contact support.');
        setLoading(false);
      }
    };

    if (reference || trxref) {
      verifyPayment();
    } else {
      setError('No transaction reference provided');
      setLoading(false);
    }
  }, [reference, trxref]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-red-600 mb-4">
              <svg
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-green-500 mb-6">
            <CheckCircle2 className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for registering for our seminar. You will receive a confirmation email shortly with all the details.
          </p>
          {paymentInfo && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="flex flex-col space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seminar:</span>
                  <span className="font-medium">{paymentInfo.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendees:</span>
                  <span className="font-medium">{paymentInfo.attendees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">R{paymentInfo.amount / 100}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{paymentInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference:</span>
                  <span className="font-medium">{paymentInfo.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{paymentInfo.channel}</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <Button className="w-full sm:w-auto" asChild>
              <Link href="/seminars">Browse More Seminars</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 