import api from "@/services/api";

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
