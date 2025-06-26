import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const NewPassword = () => {
  const route = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "New Password",
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
          Please, enter your new password
        </Text>
        <LoginInput
          keyboardType="default"
          label="enter new password"
          secureTextEntry={true}
        />
        <LoginInput
          keyboardType="default"
          label="confrim password"
          secureTextEntry={true}
        />

        <Button
          title="send"
          onPress={() => {
            {
            }
          }}
          style={{ backgroundColor: Colors.red, marginTop: 40 }}
          variant="block"
        />
      </View>
    </>
  );
};

export default NewPassword;
