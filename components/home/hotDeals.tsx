/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HotDealItem from "./hotDealItem";

const HotDeals = () => {
  const router = useRouter();
  const { user } = useUser();

  const userId = user?.id;
  const { setIsLoading, isLoading } = useFoodCreation();
  const [getlike, setGetLike] = useState<FoodItem[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const hotdeal = true;

  const GetLike = async () => {
    setIsLoading(true);
    setGetLike([]);

    try {
      const q = query(
        collection(db, "food"),
        where("like", "!=", []),
        orderBy("like", "desc"),
        limit(6)
      );

      const querySnapshot = await getDocs(q);

      const likedFoodItems: FoodItem[] = [];
      let userHasLikedAny = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const item: FoodItem = {
          id: doc.id,
          name: data.name,
          category: data.category,
          image: data.image,
          price: data.price,
          like: data.like || [],
          description: data.description || "No description available.",
        };
        likedFoodItems.push(item);

        if (userId && data.like && data.like.includes(userId)) {
          userHasLikedAny = true;
        }
      });

      setGetLike(likedFoodItems);
      if (userId) {
        setHasLiked(userHasLikedAny);
      }
    } catch (error) {
      console.error("Error getting liked food items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetLike();
  }, []);

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
          Top Likes
        </Text>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(likes)",
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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          data={getlike}
          renderItem={({ item: deals }) => (
            <HotDealItem deals={deals} hotdeal={hotdeal} />
          )}
        /> */}

        {getlike.map((item, i) => (
          <HotDealItem key={i} deals={item} hotdeal={hotdeal} />
        ))}
      </View>
    </View>
  );
};

export default HotDeals;

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
