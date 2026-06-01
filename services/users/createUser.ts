import api from "@/services/api";
import { CreateUserPayload } from "@/types/users";

export const createUser = async (data: CreateUserPayload) => {
  const response = await api.post("/users", data);
  return response.data;
};
