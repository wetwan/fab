import { Colors } from "@/constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

const Welcome = () => {
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
      <Pressable>
        <Ionicons name="wallet" size={24} color="white" />
      </Pressable>
      <Pressable>
        <AntDesign name="heart" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default Welcome;
