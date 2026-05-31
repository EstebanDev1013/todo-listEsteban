import api from "@/services/api";

export interface TaskList {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const getTaskLists = async (): Promise<TaskList[]> => {
  const response = await api.get("/categories");
  return response.data;
};
