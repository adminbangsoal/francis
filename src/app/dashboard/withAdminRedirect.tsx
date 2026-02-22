"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { isAdminUser } from "@/lib/userUtils";

export default function withAdminRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    // Redirect admins to admin dashboard
    if (user.profile && isAdminUser(user.profile)) {
      router.push("/admin");
    }
  }, [user, router]);

  // Don't render if user is admin (they will be redirected)
  if (user.profile && isAdminUser(user.profile)) {
    return null;
  }

  return <>{children}</>;
}