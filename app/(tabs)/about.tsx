import { Text } from "@/components/ui/text";
import { Link } from "expo-router";
import React from "react";

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-semibold">About Screen</Text>
        
      </View>

      <Link href="/storybook">
        <Text className="text-lg font-semibold">Storybook</Text>
      </Link>
{/*       <Pressable onPress={() => router.push("/storybook")}>
 */}    
    </SafeAreaView>
  );
};

export default AboutScreen;