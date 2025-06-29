/* eslint-disable react-hooks/exhaustive-deps */

import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowse";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const OtherSignIn = ({ screen }: any) => {
  useWarmUpBrowser();
  const router = useRouter();

  const [press, setPress] = useState("");

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPressSignInWithGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)/profile");
      }
    } catch (err: any) {
      console.error("OAuth error", JSON.stringify(err, null, 2));
      alert(
        `Google Login Failed: ${
          err.errors?.[0]?.longMessage || "An unknown error occurred."
        }`
      );
    }
  }, []);
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
            onPressSignInWithGoogle();
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
