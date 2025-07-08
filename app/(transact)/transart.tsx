/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useId, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import TransartCard from "@/components/transart/transartCard";
import { db } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { Order } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Transart = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [transaction, setTransaction] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const getUserTransactions = async () => {
    setIsLoading(true);
    try {
      setTransaction([]);
      const q = query(
        collection(db, "transactions"),
        where("userId", "==", userId),
        orderBy("orderTime", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const order: Order = {
          id: doc.id,
          address: data.address,
          items: data?.items,
          paymentIntentId: data.paymentIntentId,
          paymentStatus: data.paymentStatus,
          deliveryStatus: data.deliveryStatus,
          totalAmount: data.totalAmount ?? 0,
          userId: data.userId,
          phone: data.phone,
          orderTime: data.orderTime,
        };
        setTransaction((prev) => [...prev, order]);
        if (!data.items || data.items.length === 0) {
          return;
        }
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserTransactions();
  }, [useId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Could not load transactions .</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.red,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          width: "100%",
          paddingBlock: 30,
          paddingTop: 50,
          paddingInline: 20,
          marginBottom: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>
      <FlatList
        data={transaction}
        refreshing={isLoading}
        onRefresh={getUserTransactions}
        renderItem={({ item: transaction }) => (
          <TransartCard transaction={transaction} />
        )}
        keyExtractor={(item, i) => item.id.toString() || i.toString()}
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
              No transaction found
            </Text>
          </View>
        )}
      />
    </>
  );
};

export default Transart;
