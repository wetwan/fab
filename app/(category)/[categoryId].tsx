/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Food from "@/components/menu/food";
import { db } from "@/configs/FireBase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";

const CategoryId = () => {
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();
  const [categoryFood, setCategoryFood] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryFood = async () => {
    setIsLoading(true);
    setCategoryFood([]);

    try {
      const q = query(
        collection(db, "food"),
        where("category", "==", categoryId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCategoryFood((prev) => [...prev, { id: doc.id, ...doc.data() }]);
        if (doc.data().length === 0) {
          console.warn("No food items found for category:", categoryId);
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch category food:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLeft = useCallback(
    () => (
      <Pressable
        onPress={() => router.back()}
        style={{ paddingHorizontal: 16 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    ),
    [router]
  );

  useEffect(() => {
    getCategoryFood();
  }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#e74c3c" />
        </View>
      );
    }

  return (
    <View style={{ marginTop: 20 }}>
      <Stack.Screen
        options={{
          headerTitle:
            String(categoryId).charAt(0).toUpperCase() +
            String(categoryId).slice(1),
          headerLargeTitle: false,
          headerTitleStyle: { fontFamily: "outfit" },
          headerTitleAlign: "left",
          headerLeft: renderLeft,
        }}
      />

      <FlatList
        data={categoryFood}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: "2%" }}
        renderItem={({ item: food }) => <Food food={food} />}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 250}}>
            <Text
              style={{
                fontFamily: "outfit-bold",
                textAlign: "center",
                textTransform: "capitalize",
                color: "gray",
              }}
            >
              no {categoryId} found
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryId;
