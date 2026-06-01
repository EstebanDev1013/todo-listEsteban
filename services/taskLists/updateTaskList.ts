import api from "@/services/api";
import { TaskList, UpdateTaskListPayload } from "@/types/taskLists";

export const updateTaskList = async (
  id: string,
  data: UpdateTaskListPayload,
): Promise<TaskList> => {
  const response = await api.patch(`/categories/${id}`, data);
  return response.data;
};
