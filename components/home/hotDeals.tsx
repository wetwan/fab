/* eslint-disable react-hooks/exhaustive-deps */
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { useFoodCreation } from "@/context/foodstore";
import { useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import HotDealItem from "./hotDealItem";
import { FoodItem } from "@/types/type";

const HotDeals = () => {
  const router = useRouter();
  const { setIsLoading } = useFoodCreation();
  const [getlike, setGetLike] = useState<FoodItem[]>([]);
  const hotdeal = true;
  const GetLike = async () => {
    setIsLoading(true);
    setGetLike([]);
    try {
      const q = query(
        collection(db, "food"),
        orderBy("like", "desc"),
        limit(6)
      );

      const quarySnapshot = await getDocs(q);

      quarySnapshot.forEach((doc) => {
        setGetLike((prev) => [...prev, { id: doc.id, ...doc.data() } as FoodItem]);
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
          justifyContent: 'flex-start',
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

        {getlike.map((item) => (
          <HotDealItem key={item.id} deals={item} hotdeal={hotdeal} />
        ))}
      </View>
    </View>
  );
};

export default HotDeals;
