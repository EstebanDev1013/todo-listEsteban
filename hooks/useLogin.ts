import { login } from "@/services/auth/authServices";
import { getMe } from "@/services/users/getMe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await login(email, password);
      await AsyncStorage.setItem("token", token);
      const me = await getMe();
      await AsyncStorage.setItem("fullName", me.name);
      router.replace("/(tabs)");
    } catch (e) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
};
