import api from "@/services/api";
import { CreateTodoPayload, Todo } from "@/types/tasks";

export const createTodo = async (data: CreateTodoPayload): Promise<Todo> => {
  const response = await api.post("/todos", data);
  return response.data;
};
