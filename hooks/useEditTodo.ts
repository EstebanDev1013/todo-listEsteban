import { Todo } from "@/types/tasks";
import { updateTodo } from "@/services/tasks/updateTodo";
import { router } from "expo-router";
import { useState } from "react";

export const useEditTodo = (todo: Todo) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    todo.priority,
  );
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? todo.dueDate.split("T")[0] : "",
  );
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors: { title?: string; description?: string } = {};
    if (!title.trim()) errors.title = "El título es requerido";
    if (!description.trim()) errors.description = "La descripción es requerida";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      await updateTodo(todo.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate ? `${dueDate}T00:00:00` : undefined,
        completed: todo.completed,
        categories: todo.categories.map((c) => c.id),
      });
      router.back();
    } catch (e) {
      setError("No se pudo actualizar la tarea. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    fieldErrors,
    setFieldErrors,
    error,
    loading,
    handleEdit,
  };
};
