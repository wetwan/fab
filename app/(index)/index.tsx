
import { useRouter } from "expo-router";
import {  } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

const Index = () => {
 
  const router = useRouter()


  return (
    <Pressable onPress={() => router.push('/')}>
      <Text>Index</Text>
    </Pressable>
  );
};

export default Index;
