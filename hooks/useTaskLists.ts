import {
  createTaskList,
  CreateTaskListPayload,
} from "@/services/taskLists/createTaskList";
import { deleteTaskList } from "@/services/taskLists/deleteTaskList";
import { getTaskLists, TaskList } from "@/services/taskLists/getTaskLists";
import { useEffect, useState } from "react";

export const useTaskLists = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskLists = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getTaskLists();
      setTaskLists(data);
    } catch (e) {
      setError("No se pudieron cargar las listas");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      setError(null);
      setRefreshing(true);
      const data = await getTaskLists();
      setTaskLists(data);
    } catch (e) {
      setError("No se pudieron cargar las listas");
    } finally {
      setRefreshing(false);
    }
  };

  const addTaskList = async (payload: CreateTaskListPayload) => {
    try {
      const newTaskList = await createTaskList(payload);
      setTaskLists((prev) => [newTaskList, ...prev]);
      return newTaskList;
    } catch (e) {
      throw new Error("No se pudo crear la lista");
    }
  };

  const removeTaskList = async (taskList: TaskList) => {
    try {
      await deleteTaskList(taskList.id);
      setTaskLists((prev) => prev.filter((t) => t.id !== taskList.id));
    } catch (e) {
      throw new Error("No se pudo eliminar la lista");
    }
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);

  return {
    taskLists,
    loading,
    refreshing,
    error,
    onRefresh,
    addTaskList,
    removeTaskList,
  };
};
