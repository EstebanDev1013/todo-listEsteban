import { useEditTodo } from "@/hooks/useEditTodo";
import { Todo } from "@/services/tasks/getTodosWithCategories";
import { router, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const PRIORITIES: {
  value: "LOW" | "MEDIUM" | "HIGH";
  label: string;
  bg: string;
  text: string;
}[] = [
  { value: "LOW", label: "Baja", bg: "#dcfce7", text: "#006D2C" },
  { value: "MEDIUM", label: "Media", bg: "#fef9c3", text: "#854d0e" },
  { value: "HIGH", label: "Alta", bg: "#fee2e2", text: "#991b1b" },
];

export default function EditTodoScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    completed: string;
    categories: string;
  }>();

  const todo: Todo = {
    id: params.id,
    title: params.title,
    description: params.description,
    priority: params.priority ?? "LOW",
    dueDate: params.dueDate ?? "",
    completed: params.completed === "true",
    categories: params.categories ? JSON.parse(params.categories) : [],
  };

  const {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    fieldErrors,
    setFieldErrors,
    error,
    loading,
    handleEdit,
  } = useEditTodo(todo);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>Editar tarea</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Título */}
        <Text style={styles.label}>TÍTULO</Text>
        <TextInput
          style={[styles.input, fieldErrors.title ? styles.inputError : null]}
          placeholder="e.g. Revisar PR"
          placeholderTextColor="#94a3b8"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (fieldErrors.title)
              setFieldErrors((e) => ({ ...e, title: undefined }));
          }}
        />
        {fieldErrors.title && (
          <Text style={styles.fieldError}>{fieldErrors.title}</Text>
        )}

        {/* Descripción */}
        <Text style={[styles.label, { marginTop: 20 }]}>DESCRIPCIÓN</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            fieldErrors.description ? styles.inputError : null,
          ]}
          placeholder="Describe la tarea..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (fieldErrors.description)
              setFieldErrors((e) => ({ ...e, description: undefined }));
          }}
        />
        {fieldErrors.description && (
          <Text style={styles.fieldError}>{fieldErrors.description}</Text>
        )}

        {/* Prioridad */}
        <Text style={[styles.label, { marginTop: 20 }]}>PRIORIDAD</Text>
        <View style={styles.priorityRow}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p.value}
              style={[
                styles.priorityChip,
                { backgroundColor: p.bg },
                priority === p.value && styles.priorityChipSelected,
              ]}
              onPress={() => setPriority(p.value)}
            >
              <Text style={[styles.priorityChipText, { color: p.text }]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fecha */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          FECHA LÍMITE (OPCIONAL)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#94a3b8"
          value={dueDate}
          onChangeText={setDueDate}
        />

        {error && <Text style={styles.generalError}>{error}</Text>}

        {/* Botón */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleEdit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Guardar cambios</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 24,
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  closeButton: {
    fontSize: 18,
    color: "#64748b",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#0f172a",
    backgroundColor: "white",
  },
  textArea: {
    height: 110,
    paddingTop: 14,
  },
  inputError: {
    borderColor: "#E24B4A",
  },
  fieldError: {
    fontSize: 12,
    color: "#E24B4A",
    marginTop: 4,
  },
  generalError: {
    fontSize: 13,
    color: "#E24B4A",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  priorityRow: {
    flexDirection: "row",
    gap: 10,
  },
  priorityChip: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityChipSelected: {
    borderWidth: 2,
    borderColor: "#0f172a",
  },
  priorityChipText: {
    fontSize: 13,
    fontWeight: "600",
  },
  button: {
    height: 52,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 48,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
