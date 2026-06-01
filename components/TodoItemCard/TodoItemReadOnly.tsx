import { Todo } from "@/services/tasks/getTodosWithCategories";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PRIORITY_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  LOW: { bg: "#dcfce7", text: "#006D2C", label: "Baja" },
  MEDIUM: { bg: "#fef9c3", text: "#854d0e", label: "Media" },
  HIGH: { bg: "#fee2e2", text: "#991b1b", label: "Alta" },
};

const TodoItemReadOnly: React.FC<{ item: Todo }> = ({ item }) => {
  const priority = PRIORITY_STYLES[item.priority] ?? PRIORITY_STYLES.LOW;
  const categoryColor = item.categories?.[0]?.color ?? "#1D4ED8";
  const categoryName = item.categories?.[0]?.name ?? "";

  return (
    <View style={styles.card}>
      <View style={[styles.colorAccent, { backgroundColor: categoryColor }]} />
      <View style={styles.content}>
        <Text style={[styles.title, item.completed && styles.titleCompleted]}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: priority.bg }]}>
            <Text style={[styles.badgeText, { color: priority.text }]}>
              {priority.label}
            </Text>
          </View>
          {categoryName ? (
            <Text style={styles.categoryTag}>{categoryName}</Text>
          ) : null}
          {item.dueDate ? (
            <Text style={styles.dueDate}>📅 {item.dueDate}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default TodoItemReadOnly;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  colorAccent: {
    width: 5,
    alignSelf: "stretch",
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 3,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  description: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  categoryTag: {
    fontSize: 11,
    color: "#94a3b8",
  },
  dueDate: {
    fontSize: 11,
    color: "#94a3b8",
  },
});
