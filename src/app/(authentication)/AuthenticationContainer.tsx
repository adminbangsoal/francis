"use client";
import { useState } from "react";
import { SignInForm } from "./login/SignInForm";

export const AuthenticationContainer = () => {
  const [resetPasswordStep, setResetPasswordStep] = useState<number>(0);

  return (
    <div className="h-screen">
      <SignInForm
        resetPasswordStep={resetPasswordStep}
        setResetPasswordStep={setResetPasswordStep}
      />
    </div>
  );
};
