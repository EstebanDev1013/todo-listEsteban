import { useLogin } from "@/hooks/useLogin";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  } = useLogin();

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = "El correo es requerido";
    if (!password) errors.password = "La contraseña es requerida";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onPress = () => {
    if (validate()) handleLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoMark}>
        <Text style={styles.logoIcon}>✓</Text>
      </View>

      <Text style={styles.heading}>Bienvenido</Text>
      <Text style={styles.subheading}>Inicia sesión para continuar</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={[styles.input, fieldErrors.email ? styles.inputError : null]}
          placeholder="usuario@ejemplo.com"
          placeholderTextColor="#94a3b8"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (fieldErrors.email)
              setFieldErrors((e) => ({ ...e, email: undefined }));
          }}
        />
        {fieldErrors.email && (
          <Text style={styles.fieldError}>{fieldErrors.email}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={[
            styles.input,
            fieldErrors.password ? styles.inputError : null,
          ]}
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (fieldErrors.password)
              setFieldErrors((e) => ({ ...e, password: undefined }));
          }}
        />
        {fieldErrors.password && (
          <Text style={styles.fieldError}>{fieldErrors.password}</Text>
        )}
      </View>

      {error && <Text style={styles.generalError}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registerRow}>
        <Text style={styles.registerMuted}>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 28,
    paddingTop: 80,
  },
  logoMark: {
    width: 48,
    height: 48,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoIcon: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  heading: {
    fontSize: 26,
    fontWeight: "600",
    color: "#0f172a",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 36,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#0f172a",
    backgroundColor: "white",
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
  button: {
    height: 52,
    backgroundColor: "#1D4ED8",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 32,
  },
  registerMuted: {
    fontSize: 14,
    color: "#64748b",
  },
  registerLink: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "600",
  },
});
