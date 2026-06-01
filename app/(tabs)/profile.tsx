import ProfileProgressCard from "@/components/ProgressCard/ProfileProgressCard";
import { useLogout } from "@/hooks/useLogout";
import { useProfile } from "@/hooks/useProfile";
import { useFocusEffect } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export default function ProfileScreen() {
  const { me, categories, stats, loading, error, fetchProfile } = useProfile();
  const { handleLogout } = useLogout();

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {me ? getInitials(me.name) : "?"}
            </Text>
          </View>
          <Text style={styles.userName}>{me?.name ?? ""}</Text>
          <Text style={styles.userEmail}>{me?.email ?? ""}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#1D4ED8" }]}>
              {stats.totalLists}
            </Text>
            <Text style={styles.statLabel}>Listas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#006D2C" }]}>
              {stats.completedTodos}
            </Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#E24B4A" }]}>
              {stats.pendingTodos}
            </Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </View>

        {/* Progreso por lista */}
        {categories.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PROGRESO POR LISTA</Text>
            {categories.map((item) => (
              <ProfileProgressCard key={item.id} item={item} />
            ))}
          </>
        )}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#E24B4A",
    textAlign: "center",
  },
  avatarSection: {
    alignItems: "center",
    paddingTop: 32,
    marginBottom: 28,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: "#64748b",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
    marginBottom: 10,
  },
  logoutBtn: {
    marginTop: 24,
    marginBottom: 48,
    height: 48,
    backgroundColor: "#fee2e2",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#991b1b",
  },
});
