import api from "@/services/api";
import { CategoryWithTodos } from "@/types/tasks";

export const getTodosWithCategories = async (): Promise<
  CategoryWithTodos[]
> => {
  const response = await api.get("/categories/with-todos");
  return response.data;
};
