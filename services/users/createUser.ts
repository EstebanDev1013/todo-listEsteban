import api from "@/services/api";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const createUser = async (data: CreateUserPayload) => {
  const response = await api.post("/users", data);
  return response.data;
};
