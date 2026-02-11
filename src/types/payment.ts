import { ResponseWrapper } from ".";

export type SubcscriptionType = "pemula" | "ambis" | "setia";

export type PaymentRequest = {
  subscription_type: SubcscriptionType;
  referal_code?: string;
};

export type PaymentResponse = ResponseWrapper<{
  token: string;
  redirect_url: string;
}>;

export type CheckReferralCodeResponse = ResponseWrapper<{
  code: string;
  partner_name: string;
  discount: number;
}>;
