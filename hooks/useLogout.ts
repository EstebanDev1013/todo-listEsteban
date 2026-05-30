import { logout } from "@/services/auth/authServices";
import { router } from "expo-router";

export const useLogout = () => {
  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return { handleLogout };
};
