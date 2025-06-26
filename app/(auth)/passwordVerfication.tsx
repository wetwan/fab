import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Verification = () => {
  const route = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Verification",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "outfit-medium",
            fontSize: 20,
            color: "#000",
            fontWeight: "500",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <View style={{ flex: 1, marginTop: 150, marginHorizontal: "10%" }}>
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontFamily: "outfit-medium",
            fontSize: 16,
            marginHorizontal: 20,
            lineHeight: 30,
          }}
        >
          Enter the verification code sent to your Email
        </Text>
        <LoginInput keyboardType="number-pad" label="verification code" />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "outfit" }}>
            If you did not receive a code
          </Text>
          <Pressable onPress={() => {}}>
            <Text style={{ fontFamily: "outfit", color: Colors.blue }}>
              Resend
            </Text>
          </Pressable>
        </View>

        <Button
          title="send"
          onPress={() => {
            {
              route.push("/(auth)/newPassword");
            }
          }}
          style={{ backgroundColor: Colors.red, marginTop: 40 }}
          variant="block"
        />
      </View>
    </>
  );
};

export default Verification;
