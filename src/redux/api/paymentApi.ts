import {
  CheckReferralCodeResponse,
  PaymentRequest,
  PaymentResponse,
} from "@/types/payment";
import { baseApi } from "./baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<PaymentResponse, PaymentRequest>({
      query: ({ subscription_type, referal_code }) => ({
        url: "/payment/snap",
        method: "POST",
        body: {
          subscription_type: subscription_type,
          referal_code: referal_code ?? undefined,
        },
      }),
    }),
    checkReferralCode: builder.query<
      CheckReferralCodeResponse,
      { code: string }
    >({
      query: ({ code }) => ({
        url: `/referral/${code}`,
        method: "GET",
      }),
      providesTags: ["Referral"],
    }),
  }),
});

export const { useCreatePaymentMutation, useLazyCheckReferralCodeQuery } =
  PaymentApi;
export { PaymentApi };
