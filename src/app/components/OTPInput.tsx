import { InputVariants } from "@/components/ui/style";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface OTPInputI {
  setValue: (otp: string) => void;
  heading?: string;
  errorMesage?: string;
}
export const OTPInput = ({ setValue, heading, errorMesage }: OTPInputI) => {
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null),
  );
  const focusNextInput = (index: number) => {
    if (index < length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]!.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0 && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1]!.focus();
    }
  };

  const handleChange = (value: string, index: number) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value) {
      focusNextInput(index);
    }

    if (newOtp.every((digit) => digit)) {
      setValue(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        handleChange("", index);
      } else {
        focusPrevInput(index);
      }
    }
  };
  return (
    <div className="flex flex-col gap-3 py-2">
      <p className="text-lg font-bold">Kode OTP</p>
      {heading && (
        <p className="my-0 mb-5 text-sm font-bold text-gray-500">{heading}</p>
      )}
      <div className="flex flex-row items-center gap-1 md:gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="number"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(InputVariants(), "w-10 text-center")}
            ref={(el) => (inputsRef.current[index] = el)}
            autoComplete="off"
          />
        ))}
      </div>
      {errorMesage && (
        <p className="text-sm font-bold text-red-500">{errorMesage}</p>
      )}
    </div>
  );
};
