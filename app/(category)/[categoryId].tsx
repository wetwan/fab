/* eslint-disable react-hooks/exhaustive-deps */

import Food from "@/components/menu/food";
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

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
    <View style={{}}>
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
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: "white",
            fontSize: 20,
            flex: 1,
            textTransform: "capitalize",
          }}
        >
          {categoryId}
        </Text>
      </View>

      <FlatList
        data={categoryFood}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: "2%" }}
        renderItem={({ item: food }) => <Food food={food} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 250,
            }}
          >
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
