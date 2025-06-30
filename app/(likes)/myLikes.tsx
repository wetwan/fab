/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import HotDealItem from "@/components/home/hotDealItem";
import { db } from "@/configs/FireBase";
import { useFoodCreation } from "@/context/foodstore";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const MyLikes = () => {
  const router = useRouter();
  const { user } = useUser();

  const userId = user?.id;
  const { setIsLoading } = useFoodCreation();
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

      // Now, slice the array to your desired limit after filtering
      setGetLike(userLikedFoodItems); // Get the top 6 liked by the user
      // You'd also need to handle setHasLiked based on these filtered items
      setHasLiked(userLikedFoodItems.length > 0);
    } catch (error) {
      console.error("Error getting user-liked food items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GetLikedItemsByUser(userId);
    console.log(getlikes);
  }, []);
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
  const renderRight = useCallback(
    () => (
      <Pressable
        onPress={() => router.replace("/(likes)/myLikes")}
        style={{ paddingHorizontal: 1 }}
      >
        <AntDesign name="shoppingcart" size={24} color="red" />
      </Pressable>
    ),
    [router]
  );
  return (
    <View>
      <Stack.Screen
        options={{
          headerLeft: renderLeft,
          headerRight: renderRight,
          headerTitle: "My likes",
          headerLargeTitle: false,
          headerTitleStyle: { fontFamily: "outfit" },
          headerTitleAlign: "left",
        }}
      />
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
        />
      </View>
    </View>
  );
};

export default MyLikes;
