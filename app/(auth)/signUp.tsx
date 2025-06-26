import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import OtherSignIn from "@/components/otherSignIn";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View>
        <LoginInput
          label="first name"
          keyboardAppearance="default"
          keyboardType="default"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
        />
        <LoginInput
          label="last name"
          keyboardAppearance="default"
          keyboardType="default"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
        />
        <LoginInput
          label="email address"
          keyboardAppearance="default"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
        />
        <LoginInput
          label="password"
          autoCapitalize="none"
          secureTextEntry={true}
          containerStyle={{ marginHorizontal: "10%" }}
        />

        <Button
          title="sign up"
          textStyle={{ textTransform: "capitalize", fontFamily: "outfit" }}
          onPress={() => {
            {
              console.log("Sign up pressed");
            }
          }}
          style={{
            marginHorizontal: "10%",
            marginTop: 20,
            backgroundColor: Colors.red,
          }}
          variant="block"
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginHorizontal: "10%",
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Already have an account?
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              router.push("/(auth)");
            }}
          >
            <Text style={{ color: Colors.blue, fontFamily: "outfit" }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <OtherSignIn screen="up" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
