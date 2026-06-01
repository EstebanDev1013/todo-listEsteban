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

export interface CreateTodoPayload {
  title: string;
  description: string;
  categories: string[];
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  categories?: string[];
}

export interface SearchTodosParams {
  search: string;
  completed?: boolean;
  priority?: "LOW" | "MEDIUM" | "HIGH";
}
