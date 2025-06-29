import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.text]}>welcome </Text>
        <Text style={[styles.text]}>{user?.lastName}!</Text>
      </View>
      <Pressable
        onPress={() => router.push("/profile")}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          // source={require("../../assets/images/profile3-500x500.png")}
          source={{ uri: user?.imageUrl }}
        />
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    paddingBlock: 40,
    gap: 20,
    paddingRight: 10,
    backgroundColor: Colors.blue,
    borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
  },
  text: {
    fontFamily: "outfit-bold",
    color: Colors.red,
    textTransform: "capitalize",
    fontSize: 20,
  },
  textContainer: { flexDirection: "row" },
  imageContainer: {},
  image: {
    height: 50,
    width: 50,
    objectFit: "cover",
    borderRadius: 40,
  },
});
