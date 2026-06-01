import api from "@/services/api";
import { TaskList } from "./getTaskLists";

export interface UpdateTaskListPayload {
  name?: string;
  description?: string;
  color?: string;
}

export const updateTaskList = async (
  id: string,
  data: UpdateTaskListPayload,
): Promise<TaskList> => {
  const response = await api.patch(`/categories/${id}`, data);
  return response.data;
};
