import FAB from "@/components/FAB";
import TodoItem from "@/components/TodoItemCard/TodoItem";
import { useTodos } from "@/hooks/useTodos";
import { Todo } from "@/services/tasks/getTodosWithCategories";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    category,
    loading,
    refreshing,
    error,
    onRefresh,
    toggleTodo,
    removeTodo,
  } = useTodos(id);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  const handleToggle = async (todo: Todo) => {
    try {
      await toggleTodo(todo);
    } catch (e) {
      console.log("Error al togglear todo:", e);
    }
  };

  const handleEdit = (todo: Todo) => {
    router.push({
      pathname: "/tasks/editTodo",
      params: {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        dueDate: todo.dueDate ?? "",
        completed: String(todo.completed),
        categories: JSON.stringify(todo.categories),
      },
    });
  };

  const handleDelete = async (todo: Todo) => {
    try {
      await removeTodo(todo);
    } catch (e) {
      console.log("Error al eliminar todo:", e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {category && (
              <View
                style={[styles.colorDot, { backgroundColor: category.color }]}
              />
            )}
            <Text style={styles.headerTitle} numberOfLines={1}>
              {category?.name ?? ""}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Loading */}
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#1D4ED8" />
          </View>
        )}

        {/* Error */}
        {!loading && error && (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={onRefresh}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty */}
        {!loading && !error && category?.todos.length === 0 && (
          <View style={styles.centered}>
            <Text style={styles.emptyTitle}>No hay tareas aún</Text>
            <Text style={styles.emptySubtitle}>
              Toca el botón + para crear tu primera tarea
            </Text>
          </View>
        )}

        {/* Lista */}
        {!loading && !error && category && category.todos.length > 0 && (
          <FlatList
            data={category.todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                categoryColor={category.color}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>

      <View style={styles.fabContainer}>
        <FAB onPress={() => router.push(`/tasks/create?categoryId=${id}`)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 24,
    color: "#0f172a",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#E24B4A",
    textAlign: "center",
  },
  retryText: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "600",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#94a3b8",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 100,
  },
  fabContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
});
