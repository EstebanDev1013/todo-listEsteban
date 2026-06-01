import TodoItemReadOnly from "@/components/TodoItemCard/TodoItemReadOnly";
import { useSearch } from "@/hooks/useSearch";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COMPLETED_FILTERS: {
  value: "all" | "pending" | "completed";
  label: string;
}[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendientes" },
  { value: "completed", label: "Completadas" },
];

const PRIORITY_FILTERS: {
  value: "LOW" | "MEDIUM" | "HIGH";
  label: string;
  bg: string;
  activeBg: string;
  activeText: string;
}[] = [
  {
    value: "LOW",
    label: "Baja",
    bg: "#f1f5f9",
    activeBg: "#006D2C",
    activeText: "white",
  },
  {
    value: "MEDIUM",
    label: "Media",
    bg: "#f1f5f9",
    activeBg: "#F59E0B",
    activeText: "white",
  },
  {
    value: "HIGH",
    label: "Alta",
    bg: "#f1f5f9",
    activeBg: "#E24B4A",
    activeText: "white",
  },
];

export default function ExploreScreen() {
  const {
    query,
    setQuery,
    completedFilter,
    setCompletedFilter,
    priorityFilter,
    togglePriority,
    results,
    loading,
    error,
    searched,
    handleSearch,
  } = useSearch();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inner}>
          <Text style={styles.heading}>Buscar</Text>

          {/* Buscador */}
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tareas..."
              placeholderTextColor="#94a3b8"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery("")}>
                <Text style={styles.clearButton}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Filtro completed */}
          <View style={styles.filtersRow}>
            {COMPLETED_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.value}
                style={[
                  styles.filterChip,
                  completedFilter === f.value && styles.filterChipActive,
                ]}
                onPress={() => setCompletedFilter(f.value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    completedFilter === f.value && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filtro priority */}
          <View style={styles.filtersRow}>
            {PRIORITY_FILTERS.map((f) => (
              <TouchableOpacity
                key={f.value}
                style={[
                  styles.filterChip,
                  priorityFilter === f.value && {
                    backgroundColor: f.activeBg,
                    borderColor: f.activeBg,
                  },
                ]}
                onPress={() => togglePriority(f.value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    priorityFilter === f.value && { color: f.activeText },
                  ]}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botón buscar */}
          <TouchableOpacity
            style={[
              styles.searchButton,
              !query.trim() && styles.searchButtonDisabled,
            ]}
            onPress={handleSearch}
            disabled={!query.trim()}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.searchButtonText}>Buscar</Text>
            )}
          </TouchableOpacity>

          {/* Error */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Resultados */}
          {!loading && searched && (
            <>
              {results.length > 0 ? (
                <>
                  <Text style={styles.resultsLabel}>
                    {results.length}{" "}
                    {results.length === 1 ? "RESULTADO" : "RESULTADOS"}
                  </Text>
                  <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TodoItemReadOnly item={item} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                  />
                </>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>Sin resultados</Text>
                  <Text style={styles.emptySubtitle}>
                    Intenta con otro término o cambia los filtros
                  </Text>
                </View>
              )}
            </>
          )}

          {/* Estado inicial */}
          {!searched && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Busca tus tareas</Text>
              <Text style={styles.emptySubtitle}>
                Escribe algo y usa los filtros para encontrar lo que necesitas
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
  },
  clearButton: {
    fontSize: 14,
    color: "#94a3b8",
  },
  filtersRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipActive: {
    backgroundColor: "#1D4ED8",
    borderColor: "#1D4ED8",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  filterChipTextActive: {
    color: "white",
  },
  searchButton: {
    height: 48,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 13,
    color: "#E24B4A",
    textAlign: "center",
    marginBottom: 12,
  },
  resultsLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 32,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
});
