// This is a client-side utility file for Paystack

interface PaystackPopupInterface {
  newTransaction: (options: {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    metadata?: Record<string, any>;
    currency?: string;
    callback?: (response: any) => void;
    onClose?: () => void;
  }) => void;
  
  resumeTransaction: (accessCode: string, callback?: (response: any) => void, onClose?: () => void) => void;
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => { openIframe: () => void };
    };
  }
}

// Load Paystack script
const loadPaystackScript = () => {
  return new Promise<void>((resolve) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

let paystackPromise: Promise<PaystackPopupInterface | null>;

export const getPaystack = async (): Promise<PaystackPopupInterface | null> => {
  if (!paystackPromise) {
    paystackPromise = new Promise(async (resolve) => {
      if (typeof window === 'undefined') {
        // Server-side rendering
        resolve(null);
        return;
      }
      
      await loadPaystackScript();
      
      // Create a simple wrapper around PaystackPop for consistency
      const paystackPopup: PaystackPopupInterface = {
        newTransaction: (options) => {
          const handler = window.PaystackPop.setup({
            key: options.key,
            email: options.email,
            amount: options.amount,
            ref: options.ref,
            metadata: options.metadata,
            currency: options.currency || 'ZAR',
            callback: options.callback,
            onClose: options.onClose,
          });
          handler.openIframe();
        },
        resumeTransaction: (accessCode, callback, onClose) => {
          const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAY_STACK_PUBLIC_KEY,
            access_code: accessCode,
            callback,
            onClose,
          });
          handler.openIframe();
        },
      };
      
      resolve(paystackPopup);
    });
  }
  
  return paystackPromise;
};

// Helper function to verify transaction
export const verifyTransaction = async (reference: string) => {
  try {
    const response = await fetch(`/api/verify-payment?reference=${reference}`);
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw error;
  }
}; 