import { Todo } from "@/types/tasks";
import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const PRIORITY_STYLES: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  LOW: { bg: "#dcfce7", text: "#006D2C", label: "Baja" },
  MEDIUM: { bg: "#fef9c3", text: "#854d0e", label: "Media" },
  HIGH: { bg: "#fee2e2", text: "#991b1b", label: "Alta" },
};

const TodoItem: React.FC<{
  item: Todo;
  categoryColor: string;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}> = ({ item, categoryColor, onToggle, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  const menuButtonRef = useRef<React.ComponentRef<typeof TouchableOpacity>>(null);
  const priority = PRIORITY_STYLES[item.priority] ?? PRIORITY_STYLES.LOW;

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
          { backgroundColor: categoryColor ?? "#1D4ED8" },
        ]}
      />

      {/* Checkbox */}
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(item)}>
        <View
          style={[
            styles.checkboxBox,
            item.completed && {
              backgroundColor: categoryColor,
              borderColor: categoryColor,
            },
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      {/* Contenido */}
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
          {item.dueDate ? (
            <Text style={styles.dueDate}>📅 {item.dueDate}</Text>
          ) : null}
        </View>
      </View>

      {/* Menú tres puntitos */}
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

export default TodoItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
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
  checkbox: {
    padding: 14,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "white",
    fontSize: 13,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 3,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  description: {
    fontSize: 13,
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
  dueDate: {
    fontSize: 11,
    color: "#94a3b8",
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
