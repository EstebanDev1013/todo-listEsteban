import { createTodo, CreateTodoPayload } from "@/services/tasks/createTodo";
import {
    CategoryWithTodos,
    getTodosWithCategories,
    Todo,
} from "@/services/tasks/getTodosWithCategories";
import { updateTodo } from "@/services/tasks/updateTodo";
import { useEffect, useState } from "react";

export const useTodos = (categoryId: string) => {
  const [category, setCategory] = useState<CategoryWithTodos | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getTodosWithCategories();
      const found = data.find((c) => c.id === categoryId);
      setCategory(found ?? null);
    } catch (e) {
      setError("No se pudieron cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setError(null);
      setRefreshing(true);
      const data = await getTodosWithCategories();
      const found = data.find((c) => c.id === categoryId);
      setCategory(found ?? null);
    } catch (e) {
      setError("No se pudieron cargar las tareas");
    } finally {
      setRefreshing(false);
    }
  };

  const addTodo = async (payload: CreateTodoPayload) => {
    try {
      const newTodo = await createTodo(payload);
      setCategory((prev) => {
        if (!prev) return prev;
        return { ...prev, todos: [newTodo, ...prev.todos] };
      });
      return newTodo;
    } catch (e) {
      throw new Error("No se pudo crear la tarea");
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setCategory((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          todos: prev.todos.map((t) => (t.id === todo.id ? updated : t)),
        };
      });
    } catch (e) {
      throw new Error("No se pudo actualizar la tarea");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [categoryId]);

  return {
    category,
    loading,
    refreshing,
    error,
    onRefresh,
    addTodo,
    toggleTodo,
  };
};
