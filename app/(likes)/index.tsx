/* eslint-disable react-hooks/exhaustive-deps */
import HotDealItem from "@/components/home/hotDealItem";
import { db } from "@/configs/FireBase";
import { useFoodCreation } from "@/context/foodstore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, View } from "react-native";

const Index = () => {
  const router = useRouter();

  const { setIsLoading, isLoading } = useFoodCreation();
  const [getlikes, setGetLikes] = useState<any[]>([]);
  const hotdeal = true;
  const GetLike = async () => {
    setIsLoading(true);
    setGetLikes([]);
    try {
      const q = query(
        collection(db, "food"),
        where("like", "!=", []),
        orderBy("like", "desc"),
        limit(100)
      );

      const quarySnapshot = await getDocs(q);

      quarySnapshot.forEach((doc) => {
        setGetLikes((prev) => [...prev, { id: doc.id, ...doc.data() }]);
        console.log(doc.data());
      });
    } catch (error) {
      console.log(error, "getlike error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GetLike();
  }, []);

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
  const renderRight = useCallback(
    () => (
      <Pressable
        onPress={() => router.replace("/(likes)/myLikes")}
        style={{ paddingHorizontal: 16 }}
      >
        <AntDesign name="hearto" size={20} color="red" />
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
    <SafeAreaView style={{ marginTop: 20, marginHorizontal: "2%" }}>
      <Stack.Screen
        options={{
          headerLeft: renderLeft,
          headerRight: renderRight,
          headerTitle: "Top likes",
          headerLargeTitle: false,
          headerTitleStyle: { fontFamily: "outfit" },
          headerTitleAlign: "left",
        }}
      />
      <View
        style={{
          justifyContent: "flex-start",
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
    </SafeAreaView>
  );
};

export default Index;
