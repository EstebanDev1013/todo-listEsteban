import api from "@/services/api";
import { TaskList } from "./getTaskLists";

export interface CreateTaskListPayload {
  name: string;
  description?: string;
  color?: string;
}

export const createTaskList = async (
  data: CreateTaskListPayload,
): Promise<TaskList> => {
  const response = await api.post("/categories", data);
  return response.data;
};
