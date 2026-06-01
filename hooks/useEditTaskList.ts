import { TaskList } from "@/types/taskLists";
import { updateTaskList } from "@/services/taskLists/updateTaskList";
import { router } from "expo-router";
import { useState } from "react";

export const useEditTaskList = (taskList: TaskList) => {
  const [name, setName] = useState(taskList.name);
  const [description, setDescription] = useState(taskList.description);
  const [color, setColor] = useState(taskList.color);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors: { name?: string } = {};
    if (!name.trim()) errors.name = "El nombre es requerido";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      await updateTaskList(taskList.id, {
        name: name.trim(),
        description,
        color,
      });
      router.back();
    } catch (e) {
      setError("No se pudo actualizar la lista. Intenta de nuevo.");
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
    handleEdit,
  };
};
