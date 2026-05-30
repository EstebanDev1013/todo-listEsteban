import { useRegister } from "@/hooks/useRegister";
import { router } from "expo-router";
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

export default function RegisterScreen() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fieldErrors,
    setFieldErrors,
    error,
    loading,
    handleRegister,
  } = useRegister();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoMark}>
          <Text style={styles.logoIcon}>✓</Text>
        </View>

        <Text style={styles.heading}>Crear cuenta</Text>
        <Text style={styles.subheading}>Regístrate para comenzar</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={[
              styles.input,
              fieldErrors.fullName ? styles.inputError : null,
            ]}
            placeholder="Juan Pérez"
            placeholderTextColor="#94a3b8"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (fieldErrors.fullName)
                setFieldErrors((e) => ({ ...e, fullName: undefined }));
            }}
          />
          {fieldErrors.fullName && (
            <Text style={styles.fieldError}>{fieldErrors.fullName}</Text>
          )}
        </View>

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

        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={[
              styles.input,
              fieldErrors.confirmPassword ? styles.inputError : null,
            ]}
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (fieldErrors.confirmPassword)
                setFieldErrors((e) => ({ ...e, confirmPassword: undefined }));
            }}
          />
          {fieldErrors.confirmPassword && (
            <Text style={styles.fieldError}>{fieldErrors.confirmPassword}</Text>
          )}
        </View>

        {error && <Text style={styles.generalError}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Crear cuenta</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginMuted}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 48,
  },
  loginMuted: {
    fontSize: 14,
    color: "#64748b",
  },
  loginLink: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "600",
  },
});
