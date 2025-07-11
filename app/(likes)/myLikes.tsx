/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import HotDealItem from "@/components/home/hotDealItem";
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

const MyLikes = () => {
  const router = useRouter();
  const { user } = useUser();

  const userId = user?.id;
  const { setIsLoading, isLoading } = useFoodCreation();
  const [getlikes, setGetLike] = useState<any[]>([]);
  const hotdeal = true;
  const [hasLiked, setHasLiked] = useState(false);

  const GetLikedItemsByUser = async (
    userId: string | undefined
  ): Promise<void> => {
    if (!userId) {
      console.warn("userId is required to fetch user-liked items.");
      return;
    }

    setIsLoading(true);
    setGetLike([]);

    try {
      const q = query(
        collection(db, "food"),
        orderBy("like", "desc"),
        limit(100)
      );

      const querySnapshot = await getDocs(q);

      const userLikedFoodItems: FoodItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (
          data.like &&
          Array.isArray(data.like) &&
          data.like.includes(userId)
        ) {
          const item: FoodItem = {
            id: doc.id,
            name: data.name,
            category: data.category,
            image: data.image,
            price: data.price,
            like: data.like,
            description: data.description || "No description available.",
          };
          userLikedFoodItems.push(item);
        }
      });

      setGetLike(userLikedFoodItems);
      setHasLiked(userLikedFoodItems.length > 0);
    } catch (error) {
      console.error("Error getting user-liked food items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GetLikedItemsByUser(userId);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }
  return (
    <View>
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
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => router.back()}
            style={{ paddingHorizontal: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text
            style={{ fontFamily: "outfit-bold", color: "white", fontSize: 20 }}
          >
            My Likes
          </Text>
        </View>

        <Pressable
          onPress={() => router.replace("/(tabs)/order")}
          style={{ paddingHorizontal: 1 }}
        >
          <AntDesign name="shoppingcart" size={24} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={getlikes}
          renderItem={({ item: deals }) => (
            <HotDealItem deals={deals} hotdeal={hotdeal} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default MyLikes;
