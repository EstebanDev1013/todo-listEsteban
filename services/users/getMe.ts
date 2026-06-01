import api from "@/services/api";

export interface Me {
  id: string;
  name: string;
  email: string;
  providerUid: string;
  role: string;
}

export const getMe = async (): Promise<Me> => {
  const response = await api.get("/users/me");
  return response.data;
};
