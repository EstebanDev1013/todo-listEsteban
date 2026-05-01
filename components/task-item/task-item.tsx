import { Pressable, Text, View } from "react-native";

type TaskItemProps = {
  title: string;
  completed?: boolean;
  onToggle?: () => void;
};

export const TaskItem = ({ title, completed = false, onToggle }: TaskItemProps) => {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: completed ? "#D1D1D6" : "#007AFF",
        backgroundColor: completed ? "#F5F5F5" : "#fff",
      }}
    >
      {/* Checkbox */}
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: completed ? "#D1D1D6" : "#007AFF",
          backgroundColor: completed ? "#007AFF" : "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {completed && (
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>✓</Text>
        )}
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 16,
          color: completed ? "#A0A0A0" : "#1C1C1E",
          textDecorationLine: completed ? "line-through" : "none",
          flex: 1,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};