import { View, Text } from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context"

export default function Navbar() {
  return (
    <SafeAreaView>
      <View className="w-full h-[70px] bg-black justify-between absolute bottom-0 left-0 right-0">
        <Text className="text-black">  HI </Text>
      </View>
    </SafeAreaView>
  );
}
