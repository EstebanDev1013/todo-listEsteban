import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import FAB from "@/components/FAB";
import TaskListCard from "@/components/TaskListCard/TaskListCard";
import { useTaskLists } from "@/hooks/useTaskLists";
import { TaskList } from "@/types/taskLists";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { taskLists, loading, refreshing, error, onRefresh, removeTaskList } =
    useTaskLists();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskListToDelete, setTaskListToDelete] = useState<TaskList | null>(
    null,
  );

  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    const loadFullName = async () => {
      const name = await AsyncStorage.getItem("fullName");
      if (name) setFullName(name);
    };
    loadFullName();
  }, []);

  const handleDelete = (taskList: TaskList) => {
    setTaskListToDelete(taskList);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!taskListToDelete) return;
    try {
      await removeTaskList(taskListToDelete);
    } catch (e) {
      console.log("Error al eliminar task list:", e);
    } finally {
      setDeleteModalVisible(false);
      setTaskListToDelete(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mis listas</Text>
          <Text style={styles.subtitle}>
            Bienvenido de vuelta, {fullName || ""}
          </Text>
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
            <Pressable onPress={onRefresh}>
              <Text style={styles.retryText}>Reintentar</Text>
            </Pressable>
          </View>
        )}

        {/* Empty */}
        {!loading && !error && taskLists.length === 0 && (
          <View style={styles.centered}>
            <Text style={styles.emptyTitle}>No tienes listas aún</Text>
            <Text style={styles.emptySubtitle}>
              Toca el botón + para crear tu primera lista
            </Text>
          </View>
        )}

        {/* Lista */}
        {!loading && !error && taskLists.length > 0 && (
          <FlatList
            data={taskLists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskListCard
                item={item}
                onEdit={(taskList) =>
                  router.push({
                    pathname: "/editTaskList" as any,
                    params: {
                      id: taskList.id,
                      name: taskList.name,
                      description: taskList.description,
                      color: taskList.color,
                    },
                  })
                }
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
      </View>
      <View style={styles.fabContainer}>
        <FAB onPress={() => router.push("/createTaskList")} />
      </View>
      <ConfirmDeleteModal
        visible={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false);
          setTaskListToDelete(null);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    overflow: "visible",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
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
    zIndex: 10,
  },
});
