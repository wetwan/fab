import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const HotDealItem = ({ deals, hotdeal }: any) => {
  const router = useRouter();

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

      {deals && deals.like.length === 1 && (
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <AntDesign name="heart" size={12} color="red" />
          <Text style={[styles.text]}>
            {" "}
            {deals?.like?.length} {deals.like.length === 1 ? "like" : "likes"}
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(food)/[food]",
              params: { food: deals.id },
            })
          }
        >
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
      </View>
    </Pressable>
  );
};

export default HotDealItem;

const styles = StyleSheet.create({
  text: { fontFamily: "outfit", textTransform: "capitalize" },
});
