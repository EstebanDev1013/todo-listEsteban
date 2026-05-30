import api from "@/services/api";

interface CreateUserPayload {
  email: string;
  fullName: string;
  password: string;
  role: string;
  providerUid: string;
}

export const createUser = async (data: CreateUserPayload) => {
  const response = await api.post("/user", data);
  return response.data;
};
