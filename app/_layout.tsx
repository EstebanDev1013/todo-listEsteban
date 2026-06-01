import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { router, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { onAuthStateChange } from "@/services/auth/authServices";
import { ActivityIndicator, View } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    let isFirstCall = true;
    const unsubscribe = onAuthStateChange((user) => {
      const isAuthScreen =
        segments[0] === "login" || segments[0] === "register";
      if (!user && !isAuthScreen) {
        router.replace("/login");
      }
      if (isFirstCall && user && isAuthScreen) {
        router.replace("/(tabs)");
      }
      isFirstCall = false;
      setIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  // Evita un flash de la pantalla principal antes de redirigir
  if (!isReady)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
          <Stack.Protected guard={__DEV__}>
            <Stack.Screen name="storybook" />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
