import api from "@/services/api";
import { Todo, UpdateTodoPayload } from "@/types/tasks";

export const updateTodo = async (
  id: string,
  data: UpdateTodoPayload,
): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}`, data);
  return response.data;
};
