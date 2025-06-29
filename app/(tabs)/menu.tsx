import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Text, TextInput, View } from "react-native";

const Menu = () => {
  return (
    <View style={{}}>
      {/* search box */}
      <View
        style={{
          paddingRight: 5,
          backgroundColor: Colors.blue,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          height: 150,
          paddingBlock: 50,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignContent: "center",
            backgroundColor: Colors.white,
            marginHorizontal: "10%",
            borderRadius: 10,
          }}
        >
          <MaterialIcons
            name="search"
            size={24}
            color={Colors.gray}
            style={{ padding: 10 }}
          />
          <TextInput
            placeholder="Search......"
            style={{ fontFamily: "outfit", fontSize: 16, padding: 10 }}
          />
        </View>
      </View>

      <Text>Menu</Text>
    </View>
  );
};

export default Menu;
