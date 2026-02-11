import type { Metadata } from "next";
import { AuthenticationContainer } from "../AuthenticationContainer";

export const metadata: Metadata = {
  title: "BangSoal",
  description: "Login",
};

export default function LoginPage() {
  return <AuthenticationContainer />;
}
