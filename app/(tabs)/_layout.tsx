import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const Layout = () => {
  return (
    <Tabs
    
      screenOptions={{
        tabBarActiveBackgroundColor: Colors.red,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={"green"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
