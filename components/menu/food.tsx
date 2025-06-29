import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Text, View } from "react-native";

const Food = ({ food }: any) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginBlock: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingEnd: 30,
        alignItems: "center",
      }}
    >
      <Image source={{ uri: food.image }} height={100} width={100} />
      <View>
        <Text>{food.name}</Text>
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <FontAwesome6 name="naira-sign" size={12} color="black" />
          <Text> {food.price}</Text>
        </View>

        <Text>{food.like} people</Text>
      </View>
      <View>
        <Text>buy now</Text>
      </View>
    </View>
  );
};

export default Food;
