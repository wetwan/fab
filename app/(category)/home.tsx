import CategoryId from "@/components/category/categoryId";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
const CategoryHome = () => {
  const { category, isLoading, getCategory } = useFoodCreation();
  const router = useRouter();

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.red,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          width: "100%",
          paddingBlock: 30,
          paddingTop: 50,
          paddingInline: 20,
          position: "fixed",
          top: 0,
          marginBottom: 20,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.push("/(tabs)")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text
          style={{ fontFamily: "outfit-bold", color: "white", fontSize: 20 }}
        >
          Category
        </Text>
      </View>

      <FlatList
        refreshing={isLoading}
        onRefresh={getCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: "2%" }}
        data={category}
        renderItem={({ item: category }) => <CategoryId category={category} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default CategoryHome;
