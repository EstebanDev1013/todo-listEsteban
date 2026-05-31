import api from "@/services/api";
import { Todo } from "./getTodosWithCategories";

export interface CreateTodoPayload {
  title: string;
  description: string;
  categories: string[];
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

export const createTodo = async (data: CreateTodoPayload): Promise<Todo> => {
  const response = await api.post("/todos", data);
  return response.data;
};
