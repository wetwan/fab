import { useFoodCreation } from "@/context/foodstore";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const Banner = () => {
  const { slider } = useFoodCreation();

  return (
    <View style={{ marginTop: 20, marginHorizontal: "2%" }}>
      <Text style={{ marginTop: 0, fontFamily: "outfit-bold", fontSize: 20 }}>
        Sliders
      </Text>
      <FlatList
        data={slider}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20, marginRight: 10, marginTop: 20 }}
        renderItem={({ item: slider }) => (
          <>
            <Image
              source={{ uri: slider.imageUrl }}
              style={{
                width: 400,
                height: 200,
                marginHorizontal: 10,
                borderRadius: 10,
              }}
            />
          </>
        )}
        keyExtractor={(item) => item.id?.toString()}
      />
    </View>
  );
};

export default Banner;
