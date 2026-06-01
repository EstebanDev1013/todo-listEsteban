import api from "@/services/api";
import { TaskList } from "@/types/taskLists";

export const getTaskLists = async (): Promise<TaskList[]> => {
  const response = await api.get("/categories");
  return response.data;
};
