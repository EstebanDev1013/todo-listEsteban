import { register } from "@/services/auth/authServices";
import { createUser } from "@/services/users/createUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

export const useRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors: typeof fieldErrors = {};

    if (!fullName) errors.fullName = "El nombre es requerido";

    if (!email) {
      errors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "El correo no tiene un formato válido";
    }

    if (!password) {
      errors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      errors.password = "Debe tener al menos 6 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Debe tener al menos una mayúscula";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Debe tener al menos un número";
    } else if (!/[a-z-Z09]/.test(password)) {
      errors.password = "Debe tener al menos un carácter especial";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirma tu contraseña";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await register(email, password);
      await AsyncStorage.setItem("token", token);
      await createUser({
        email,
        fullName,
        password,
        role: "USER",
        providerUid: user.uid,
      });

      router.replace("/(tabs)");
    } catch (e) {
      console.log("Error en registro:", JSON.stringify(e));
      setError("Ocurrió un error al registrarte. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
