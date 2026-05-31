import api from "@/services/api";

export interface TodoCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  categories: TodoCategory[];
}

export interface CategoryWithTodos {
  id: string;
  name: string;
  description: string;
  color: string;
  todos: Todo[];
}

export const getTodosWithCategories = async (): Promise<
  CategoryWithTodos[]
> => {
  const response = await api.get("/categories/with-todos");
  return response.data;
};
