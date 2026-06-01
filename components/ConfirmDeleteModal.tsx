import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🗑️</Text>
          </View>

          <Text style={styles.title}>¿Eliminar lista?</Text>
          <Text style={styles.message}>
            ¿Estás seguro que quieres eliminar esta lista? Esta acción no se
            puede deshacer y eliminará todas las tareas que contiene.
          </Text>

          <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
            <Text style={styles.deleteButtonText}>Eliminar lista</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  deleteButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#E24B4A",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  cancelButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#64748b",
    fontSize: 15,
    fontWeight: "600",
  },
});
