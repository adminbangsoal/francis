import { useGetProfileQuery } from "@/redux/api/authApi";
import { RootState, useAppSelector } from "@/redux/store";
import { redirect, usePathname } from "next/navigation";
import { ComponentType } from "react";

// List of admin emails that should skip onboarding
const ADMIN_EMAILS = [
  'alisyageza24@gmail.com',
  'admin@bangsoal.co.id',
  'joseph.srgh@gmail.com'
];

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Auth: ComponentType<P> = (props: P) => {
    const user = useAppSelector((state: RootState) => state.user);

    const pathName = usePathname();

    useGetProfileQuery(undefined, {
      skip: !!user.profile,
    });

    if (!user.token) {
      redirect("/login");
    }

    // Check if user is admin - skip onboarding completely
    const isAdmin = user.profile?.role === 'admin' || 
                   user.profile?.is_admin === true ||
                   ADMIN_EMAILS.includes(user.profile?.email || '');

    if (
      (!user.profile || !user.profile?.onboard_date) &&
      !pathName.includes("onboarding") &&
      !isAdmin
    )
      redirect("/onboarding");

    return <WrappedComponent {...props} />;
  };

  Auth.displayName = `Auth(${getDisplayName(WrappedComponent)})`;

  return Auth;
};

// Function to get the display name of a component
function getDisplayName(WrappedComponent: ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
