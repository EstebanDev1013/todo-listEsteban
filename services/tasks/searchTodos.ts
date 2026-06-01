import api from "@/services/api";
import { SearchTodosParams, Todo } from "@/types/tasks";

export const searchTodos = async (
  params: SearchTodosParams,
): Promise<Todo[]> => {
  const { search, completed, priority } = params;
  const queryParams = new URLSearchParams();
  if (completed !== undefined)
    queryParams.append("completed", String(completed));
  if (priority) queryParams.append("priority", priority);
  const query = queryParams.toString();
  const url = `/todos/search/${encodeURIComponent(search)}${query ? `?${query}` : ""}`;
  const response = await api.get(url);
  return response.data;
};
