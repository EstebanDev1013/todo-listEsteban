import { createTaskList } from "@/services/taskLists/createTaskList";
import { router } from "expo-router";
import { useState } from "react";

export const useCreateTaskList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#1D4ED8");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors: { name?: string } = {};
    if (!name.trim()) errors.name = "El nombre es requerido";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      await createTaskList({ name: name.trim(), description, color });
      router.back();
    } catch (e: any) {
      setError("No se pudo crear la lista. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    fieldErrors,
    setFieldErrors,
    error,
    loading,
    handleCreate,
  };
};
