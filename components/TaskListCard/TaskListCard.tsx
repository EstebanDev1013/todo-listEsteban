import { TaskList } from "@/services/taskLists/getTaskLists";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TaskListCard: React.FC<{ item: TaskList }> = ({ item }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
      onPress={() => router.push(`/tasks/${item.id}`)}
    >
      <View style={styles.cardInner}>
        <View
          style={[
            styles.colorAccent,
            { backgroundColor: item.color ?? "#1D4ED8" },
          ]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          {item.description ? (
            <Text style={styles.description} numberOfLines={1}>
              {item.description}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInner: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
  },
  colorAccent: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#64748b",
  },
});
