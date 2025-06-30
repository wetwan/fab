import CategoryId from "@/components/category/categoryId";
import { useFoodCreation } from "@/context/foodstore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  View,
} from "react-native";
const CategoryHome = () => {
  const { category, isLoading, getCategory } = useFoodCreation();
  const router = useRouter();
  const renderLeft = useCallback(
    () => (
      <Pressable
        onPress={() => router.replace("/(tabs)")}
        style={{ paddingHorizontal: 16 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    ),
    [router]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerLeft: renderLeft,
          headerTitle: "Category",
          headerLargeTitle: false,
          headerTitleStyle: { fontFamily: "outfit" },
          headerTitleAlign: "left",
        }}
      />

      <FlatList
        refreshing={isLoading}
        onRefresh={getCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: "2%" }}
        data={category}
        renderItem={({ item: category }) => <CategoryId category={category} />}
      />
    </SafeAreaView>
  );
};

export default CategoryHome;
