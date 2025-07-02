/* eslint-disable react-hooks/exhaustive-deps */
import HotDealItem from "@/components/home/hotDealItem";
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{}}>
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
            onPress={() => router.replace("/(tabs)")}
            style={{ paddingHorizontal: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <Text
            style={{ fontFamily: "outfit-bold", color: "white", fontSize: 20 }}
          >
            Category
          </Text>
        </View>

        <Pressable
          onPress={() => router.replace("/(likes)/myLikes")}
          style={{ paddingHorizontal: 16 }}
        >
          <AntDesign name="hearto" size={20} color="white" />
        </Pressable>
      </View>
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
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
