import { Colors } from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const Welcome = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        backgroundColor: Colors.red,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 100,
        width: "100%",
        paddingBlock: 30,
        paddingInline: 20,
      }}
    >
      <Pressable onPress={() => router.replace("/")}>
        <Ionicons name="wallet" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => router.replace("/(likes)/myLikes")}>
        <AntDesign name="heart" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default Welcome;
