import { CategoryWithTodos } from "@/types/tasks";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProfileProgressCard: React.FC<{ item: CategoryWithTodos }> = ({
  item,
}) => {
  const percentage =
    item.todos.length === 0
      ? 0
      : Math.round(
          (item.todos.filter((t) => t.completed).length / item.todos.length) *
            100,
        );

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.percentage, { color: item.color ?? "#1D4ED8" }]}>
          {percentage}%
        </Text>
      </View>
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%` as any,
              backgroundColor: item.color ?? "#1D4ED8",
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ProfileProgressCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
    flex: 1,
    marginRight: 8,
  },
  percentage: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressBg: {
    height: 5,
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
});
