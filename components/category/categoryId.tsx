import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CategoryId = ({ category }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        router.push({
          pathname: "/(category)/[categoryId]",
          params: { categoryId: category?.name },
        });
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        padding: 10,
        paddingHorizontal: 20,
        flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.blue,
      }}
    >
      <Image
        source={{ uri: category.imageUrl }}
        height={100}
        width={100}
        style={{
          borderRadius: 20,
          height: 100,
          width: 100,
          objectFit: "cover",
        }}
      />
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 16,
            borderRadius: 10,
            backgroundColor: Colors.white,
            textTransform: "capitalize",
            paddingInline: 10,
            padding: 4,
            color: Colors.black,
          }}
        >
          {category.name}
        </Text>
      
      </View>
    </TouchableOpacity>
  );
};

export default CategoryId;
