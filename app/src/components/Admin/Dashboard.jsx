import { View, Text,ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Overview from "./Overview"
import Sidebar from "./Sidebar"
export default function Dashboard() {
  return (
    <SafeAreaView className="justify-between bg-neutral-300">
        <Overview />
        <Sidebar />   
    </SafeAreaView>
  );
}
