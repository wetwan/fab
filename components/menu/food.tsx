import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Food = ({ food }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        backgroundColor: Colors.white,
        marginBlock: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingEnd: 30,
        alignItems: "center",
        borderRadius: 5,
      }}
    >
      <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
        <Image
          source={{ uri: food.image }}
          height={100}
          width={100}
          style={{ height: 75, width: 75, borderRadius: 4 }}
        />
        <View style={{ gap: 5 }}>
          <Text
            style={[styles.text, { fontFamily: "outfit-bold", fontSize: 18 }]}
          >
            {food.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <FontAwesome6 name="naira-sign" size={12} color="black" />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 1 }}
            >
              <Text style={[styles.text, { fontSize: 12 }]}> {food.price}</Text>
              <Text style={[styles.text, { fontSize: 12, color: "red" }]}>
                per Kg
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <AntDesign name="heart" size={12} color="red" />
            <View
              style={{ flexDirection: "row", alignItems: "center",}}
            >
              <Text style={[styles.text]}>{food.like}</Text>
              <Text style={[styles.text]}> people</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            backgroundColor: "red",
            color: "white",
            padding: 15,
            paddingBlock: 10,
            borderRadius: 6,
            fontFamily: "outfit",
            textTransform: "capitalize",
          }}
        >
          buy now
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Food;

const styles = StyleSheet.create({
  text: { fontFamily: "outfit", textTransform: "capitalize" },
});
