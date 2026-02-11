"use server";

import type { SendOTPRequest } from "@/types";

export async function sendOTP(formData: FormData, sendOTPReset: any) {
  const phone_number = {
    phone_number: formData.get("phone_number"),
  };

  await sendOTPReset(phone_number as SendOTPRequest);
}
