import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const HotDealItem = ({ deals, hotdeal }: any) => {
  const [liked, setLike] = useState(true);
  return (
    <View
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
        <Text style={[styles.text]}>{deals.like}</Text>
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
          <Pressable onPress={() => setLike(!liked)}>
            {liked === true ? (
              <AntDesign name="heart" size={18} color="red" />
            ) : (
              <AntDesign name="hearto" size={18} color="red" />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default HotDealItem;

const styles = StyleSheet.create({
  text: { fontFamily: "outfit", textTransform: "capitalize" },
});
