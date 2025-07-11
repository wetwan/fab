import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import HomeCategory from "./homeCategory";

const Categories = () => {
  const { category, isLoading } = useFoodCreation();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }
  return (
    <View style={{ marginTop: 20, marginHorizontal: "2%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          Categories
        </Text>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(category)/home",
            });
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              borderRadius: 10,
              flex: 1,
              backgroundColor: Colors.red,
              textTransform: "capitalize",
              paddingInline: 10,
              padding: 4,
              height: 10,
              color: Colors.white,
            }}
          >
            see more
          </Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 0, paddingRight: 50 }}
        data={category}
        renderItem={({ item: category }) => (
          <HomeCategory category={category} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Categories;
