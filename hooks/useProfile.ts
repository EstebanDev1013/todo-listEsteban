import {
    CategoryWithTodos,
    getTodosWithCategories,
} from "@/services/tasks/getTodosWithCategories";
import { getMe, Me } from "@/services/users/getMe";
import { useEffect, useState } from "react";

export interface ProfileStats {
  totalLists: number;
  completedTodos: number;
  pendingTodos: number;
}

export const useProfile = () => {
  const [me, setMe] = useState<Me | null>(null);
  const [categories, setCategories] = useState<CategoryWithTodos[]>([]);
  const [stats, setStats] = useState<ProfileStats>({
    totalLists: 0,
    completedTodos: 0,
    pendingTodos: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const [meData, categoriesData] = await Promise.all([
        getMe(),
        getTodosWithCategories(),
      ]);
      setMe(meData);
      setCategories(categoriesData);

      const allTodos = categoriesData.flatMap((c) => c.todos);
      setStats({
        totalLists: categoriesData.length,
        completedTodos: allTodos.filter((t) => t.completed).length,
        pendingTodos: allTodos.filter((t) => !t.completed).length,
      });
    } catch (e) {
      setError("No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    me,
    categories,
    stats,
    loading,
    error,
    fetchProfile,
  };
};
