import { TaskList } from "@/services/taskLists/getTaskLists";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const TaskListCard: React.FC<{
  item: TaskList;
  onEdit: (taskList: TaskList) => void;
  onDelete: (taskList: TaskList) => void;
}> = ({ item, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  const menuButtonRef =
    useRef<React.ComponentRef<typeof TouchableOpacity>>(null);

  const openMenu = () => {
    menuButtonRef.current?.measure((_fx, _fy, width, height, px, py) => {
      setDropdownPos({ x: px + width - 144, y: py + height });
      setMenuOpen(true);
    });
  };

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.colorAccent,
          { backgroundColor: item.color ?? "#1D4ED8" },
        ]}
      />
      <TouchableOpacity
        style={styles.content}
        onPress={() => router.push(`/tasks/${item.id}`)}
        activeOpacity={0.85}
      >
        <Text style={styles.title}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.description} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        ref={menuButtonRef}
        style={styles.menuButton}
        onPress={openMenu}
      >
        <Text style={styles.menuDots}>⋮</Text>
      </TouchableOpacity>

      <Modal visible={menuOpen} transparent animationType="none">
        <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
          <View style={StyleSheet.absoluteFill}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.menuDropdown,
                  { left: dropdownPos.x, top: dropdownPos.y },
                ]}
              >
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuOpen(false);
                    onEdit(item);
                  }}
                >
                  <Text style={styles.menuItemText}>✏️ Editar</Text>
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuOpen(false);
                    onDelete(item);
                  }}
                >
                  <Text style={[styles.menuItemText, { color: "#E24B4A" }]}>
                    🗑️ Eliminar
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default TaskListCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  colorAccent: {
    width: 5,
    alignSelf: "stretch",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
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
  menuButton: {
    padding: 14,
  },
  menuDots: {
    fontSize: 20,
    color: "#94a3b8",
  },
  menuDropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 130,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: "#0f172a",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
  },
});
