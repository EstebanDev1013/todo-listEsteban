import api from "@/services/api";

export const deleteTaskList = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
