import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text } from "react-native";

const HomeCategory = ({ category }: any) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/(category)/[categoryId]",
          params: { categoryId: category?.name },
        });
      }}
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 20,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: 100,
        height: 120,
      }}
    >
      <Image
        source={{ uri: category.imageUrl }}
        style={{ height: 75, width: 75, borderRadius: 10 }}
      />
      <Text
        style={{
          fontFamily: "outfit-bold",
          marginTop: 5,
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {category?.name}
      </Text>
    </Pressable>
  );
};

export default HomeCategory;
