/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/configs/FireBase";
import { FoodItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

const HotDealItem = ({ deals, hotdeal }: any) => {
  const { user } = useUser();
  const router = useRouter();
  const [hasLiked, setHasLiked] = useState(false);

  const [foodData, setFoodData] = useState<FoodItem | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const userId = user?.id;

  const handleLike = async () => {
    if (!deals || !userId) {
      Alert.alert("Error", "You must be logged in to like an item.");
      return;
    }

    setIsProcessing(true);
    const likeRef = doc(db, "food", deals.id);

    try {
      if (hasLiked) {
        setHasLiked(false);
        setFoodData((prev) => ({
          ...prev!,
          like: prev!.like?.filter((id) => id !== userId),
        }));
        await updateDoc(likeRef, { like: arrayRemove(userId) });
      } else {
        setHasLiked(true);
        setFoodData((prev) => ({ ...prev!, like: [...prev!.like, userId] }));
        await updateDoc(likeRef, { like: arrayUnion(userId) });
      }
    } catch (error) {
      console.error("Like update error:", error);
      setHasLiked((prev) => !prev);
      Alert.alert("Error", "Failed to update like status.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(food)/[food]",
          params: { food: deals.id },
        })
      }
      style={{
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        paddingInline: 20,
        alignItems: "center",
        borderRadius: 10,
        gap: 6,
      }}
    >
      <Image
        source={{ uri: deals.image }}
        height={100}
        width={100}
        style={{ borderRadius: 100 }}
      />
      <Text style={[styles.text, { fontFamily: "outfit-bold" }]}>
        {deals.name}
      </Text>
      <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
        <FontAwesome6 name="naira-sign" size={12} color="black" />
        <Text style={[styles.text, { fontSize: 12 }]}>{deals.price}</Text>
        <Text style={[styles.text, { fontSize: 12, color: "red" }]}>
          per Kg
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <AntDesign name="heart" size={12} color="red" />
        <Text style={[styles.text]}> {deals?.like?.length}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable onPress={() => {}}>
          <Text
            style={[
              styles.text,
              {
                color: "white",
                backgroundColor: "red",
                padding: 5,
                paddingInline: 7,
                fontSize: 12,
                fontFamily: "outfit-medium",
                borderRadius: 5,
              },
            ]}
          >
            order now
          </Text>
        </Pressable>

        {hotdeal === true && (
          <Pressable onPress={handleLike} disabled={isProcessing}>
            {hasLiked ? (
              <AntDesign name="heart" size={18} color="#e74c3c" />
            ) : (
              <AntDesign name="hearto" size={18} color="red" />
            )}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default HotDealItem;

const styles = StyleSheet.create({
  text: { fontFamily: "outfit", textTransform: "capitalize" },
});
