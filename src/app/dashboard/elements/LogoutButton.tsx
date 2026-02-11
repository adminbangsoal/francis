import { logout } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/store";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="flex flex-row items-center justify-center gap-2 py-1 text-red-600 md:text-xl"
      onClick={() => {
        // Mixpanel.track("Clicked Logout Button");
        dispatch(logout());
      }}
    >
      <LogOutIcon className="md:w-5" />
      Logout
    </button>
  );
};
