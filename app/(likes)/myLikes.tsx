/* eslint-disable react-hooks/exhaustive-deps */
import HotDealItem from "@/components/home/hotDealItem";
import { db } from "@/configs/FireBase";
import { useFoodCreation } from "@/context/foodstore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

const MyLikes = () => {
  const router = useRouter();

  const { setIsLoading } = useFoodCreation();
  const [getlikes, setGetLike] = useState<any[]>([]);
  const hotdeal = true;
  const GetLike = async () => {
    setIsLoading(true);
    setGetLike([]);
    try {
      const q = query(
        collection(db, "food"),
        orderBy("like", "desc"),
        limit(100)
      );

      const quarySnapshot = await getDocs(q);

      quarySnapshot.forEach((doc) => {
        setGetLike((prev) => [...prev, { id: doc.id, ...doc.data() }]);
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
