/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth, provider } from "@/configs/FireBase";
import { Colors } from "@/constants/Colors";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as React from "react";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const OtherSignIn = ({ screen }: any) => {
  const [press, setPress] = useState("");

  const signInWithGoogle = () => {
  
  };
  return (
    <View
      style={{
        marginHorizontal: "10%",
        marginTop: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{ borderTopWidth: 0.4, borderColor: "black", width: "30%" }}
        />
        <Text style={{ fontFamily: "outfit-medium", fontSize: 16 }}>
          or sign {screen} with
        </Text>
        <View
          style={{ borderTopWidth: 0.4, borderColor: "black", width: "30%" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 50,
          width: "70%",
          marginHorizontal: "auto",
        }}
      >
        <Pressable
          style={{
            width: 50,
            height: 50,

            backgroundColor: press === "google" ? Colors.gray : "#fff",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#fff",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            elevation: 4,
          }}
          onPress={() => {
            setPress("google");
            signInWithGoogle();
          }}
        >
          <Image
            source={require("../assets/images/google.png")}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
        <Pressable
          style={{
            width: 50,
            height: 50,
            backgroundColor: press === "twitter" ? Colors.gray : "#fff",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#fff",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            elevation: 4,
          }}
          onPress={() => {
            setPress("twitter");
          }}
        >
          <Image
            source={require("../assets/images/twitter.png")}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
        <Pressable
          style={{
            width: 50,
            height: 50,
            backgroundColor: press === "facebook" ? Colors.gray : "#fff",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#fff",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            elevation: 4,
          }}
          onPress={() => {
            setPress("facebook");
          }}
        >
          <Image
            source={require("../assets/images/facebook.png")}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default OtherSignIn;
