import api from "@/services/api";
import { Todo } from "./getTodosWithCategories";

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  categories?: string[];
}

export const updateTodo = async (
  id: string,
  data: UpdateTodoPayload,
): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}`, data);
  return response.data;
};
