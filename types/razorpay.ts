export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayErrorResponse {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

export interface RazorpayOptions {
  key: string;

  amount: number;

  currency: string;

  order_id: string;

  name: string;

  description: string;

  prefill?: {
    email?: string;
  };

  theme?: {
    color?: string;
  };

  handler: (
    response:
      RazorpaySuccessResponse
  ) => void;

  modal?: {
    ondismiss?: () => void;
  };
}

export interface RazorpayInstance {
  open: () => void;

  on: (
    event: string,
    callback: (
      response:
        RazorpayErrorResponse
    ) => void
  ) => void;
}

export interface RazorpayConstructor {
  new (
    options:
      RazorpayOptions
  ): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay?:
      RazorpayConstructor;
  }
}