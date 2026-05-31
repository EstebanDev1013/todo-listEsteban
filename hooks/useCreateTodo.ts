import { createTodo } from "@/services/tasks/createTodo";
import { router } from "expo-router";
import { useState } from "react";

export const useCreateTodo = (categoryId: string) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [dueDate, setDueDate] = useState("");
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

  const handleCreate = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      await createTodo({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate ? `${dueDate}T00:00:00` : undefined,
        categories: [categoryId],
      });
      router.back();
    } catch (e) {
      setError("No se pudo crear la tarea. Intenta de nuevo.");
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
    handleCreate,
  };
};
