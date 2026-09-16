export interface CreatePaymentOrderResponse {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
}

export type PaymentStatus =
  | "CREATED"
  | "PAID"
  | "FAILED";

export interface PaymentResponse {
  paymentId: string;

  razorpayOrderId: string;

  razorpayPaymentId: string | null;

  amount: number;

  currency: string;

  status: PaymentStatus;

  createdAt: string;

  paidAt: string | null;
}

export interface VerifyPaymentRequest {
  razorpayOrderId: string;

  razorpayPaymentId: string;

  razorpaySignature: string;
}