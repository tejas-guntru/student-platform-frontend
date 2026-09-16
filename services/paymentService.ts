import { api } from "@/lib/api";

import type {
  CreatePaymentOrderResponse,
  PaymentResponse,
  VerifyPaymentRequest,
} from "@/types/payment";


export const createPaymentOrder =
  async (): Promise<CreatePaymentOrderResponse> => {

    const response =
      await api.post<CreatePaymentOrderResponse>(
        "/api/v1/payments/order"
      );

    return response.data;
  };


export const verifyPayment =
  async (
    request: VerifyPaymentRequest
  ): Promise<PaymentResponse> => {

    const response =
      await api.post<PaymentResponse>(
        "/api/v1/payments/verify",
        request
      );

    return response.data;
  };


export const getMyPayments =
  async (): Promise<PaymentResponse[]> => {

    const response =
      await api.get<PaymentResponse[]>(
        "/api/v1/payments/me"
      );

    return response.data;
  };