import api from "@/services/api";
import { Me } from "@/types/users";

export const getMe = async (): Promise<Me> => {
  const response = await api.get("/users/me");
  return response.data;
};
