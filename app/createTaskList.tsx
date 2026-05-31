import { useCreateTaskList } from "@/hooks/useCreateTaskList";
import { router } from "expo-router";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const COLORS = [
  { hex: "#1D4ED8", name: "Azul" },
  { hex: "#4B5563", name: "Gris azulado" },
  { hex: "#006D2C", name: "Verde" },
  { hex: "#7C3AED", name: "Morado" },
  { hex: "#E24B4A", name: "Rojo" },
  { hex: "#F59E0B", name: "Naranja" },
  { hex: "#10B981", name: "Turquesa" },
];

export default function CreateTaskListScreen() {
  const {
    name,
    setName,
    description,
    setDescription,
    color,
    setColor,
    fieldErrors,
    setFieldErrors,
    error,
    loading,
    handleCreate,
  } = useCreateTaskList();

  const selectedColor = COLORS.find((c) => c.hex === color);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Text style={styles.closeButton}>✕</Text>
          </Pressable>
          <Text style={styles.heading}>Nueva lista</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Título */}
        <Text style={styles.label}>TÍTULO DE LA LISTA</Text>
        <TextInput
          style={[styles.input, fieldErrors.name ? styles.inputError : null]}
          placeholder="e.g. Ciencias de la Computación"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (fieldErrors.name)
              setFieldErrors((e) => ({ ...e, name: undefined }));
          }}
        />
        {fieldErrors.name && (
          <Text style={styles.fieldError}>{fieldErrors.name}</Text>
        )}

        {/* Descripción */}
        <Text style={[styles.label, { marginTop: 20 }]}>
          DESCRIPCIÓN (OPCIONAL)
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Notas sobre esta lista..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {/* Color */}
        <View style={styles.colorHeader}>
          <Text style={[styles.label, { marginTop: 20 }]}>COLOR DE ACENTO</Text>
          <View style={[styles.colorNameBadge, { borderColor: color }]}>
            <Text style={[styles.colorNameText, { color: color }]}>
              {selectedColor?.name.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.colorGrid}>
          {COLORS.map((colorItem) => (
            <Pressable
              key={colorItem.hex}
              style={[
                styles.colorSwatch,
                { backgroundColor: colorItem.hex },
                color === colorItem.hex && styles.colorSwatchSelected,
              ]}
              onPress={() => setColor(colorItem.hex)}
            >
              {color === colorItem.hex && (
                <Text style={styles.colorCheck}>✓</Text>
              )}
            </Pressable>
          ))}
        </View>

        {error && <Text style={styles.generalError}>{error}</Text>}

        {/* Botón */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleCreate}
          disabled={loading || !name.trim()}
        >
          <View
            style={[
              styles.button,
              { backgroundColor: color },
              (loading || !name.trim()) && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Crear nueva lista</Text>
            )}
          </View>
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
  },
  colorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colorNameBadge: {
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 20,
  },
  colorNameText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 4,
    marginBottom: 32,
  },
  colorSwatch: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSwatchSelected: {
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  colorCheck: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  button: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
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
