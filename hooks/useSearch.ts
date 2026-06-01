import { Todo } from "@/services/tasks/getTodosWithCategories";
import { searchTodos } from "@/services/tasks/searchTodos";
import { useState } from "react";

type CompletedFilter = "all" | "pending" | "completed";
type PriorityFilter = "LOW" | "MEDIUM" | "HIGH" | null;

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [completedFilter, setCompletedFilter] =
    useState<CompletedFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>(null);
  const [results, setResults] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const completed =
        completedFilter === "all" ? undefined : completedFilter === "completed";
      const data = await searchTodos({
        search: query.trim(),
        completed,
        priority: priorityFilter ?? undefined,
      });
      setResults(data);
    } catch (e) {
      setError("No se pudo realizar la búsqueda");
    } finally {
      setLoading(false);
    }
  };

  const togglePriority = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    setPriorityFilter((prev) => (prev === priority ? null : priority));
  };

  return {
    query,
    setQuery,
    completedFilter,
    setCompletedFilter,
    priorityFilter,
    togglePriority,
    results,
    loading,
    error,
    searched,
    handleSearch,
  };
};
