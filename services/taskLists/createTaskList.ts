import api from "@/services/api";
import { CreateTaskListPayload, TaskList } from "@/types/taskLists";

export const createTaskList = async (
  data: CreateTaskListPayload,
): Promise<TaskList> => {
  const response = await api.post("/categories", data);
  return response.data;
};
