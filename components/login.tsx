import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./button";
import LoginInput from "./loginInput";

const Login = () => {
  return (
    <View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <View>
        <LoginInput
          label="email"
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
          title="sign in"
          textStyle={{ textTransform: "capitalize", fontFamily: "outfit" }}
          onPress={() => {
            {
              console.log("Sign in pressed");
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
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: '10%',
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{}}
          onPress={() => console.log("forget password pressed")}
        >
          <Text style={{ color: Colors.red, fontFamily: "outfit" }}>
            Forget Password
          </Text>
        </Pressable>

        <Text
          style={{
            fontFamily: "outfit",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don&apos;t have an account?
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => console.log("Sign up pressed")}
          >
            <Text style={{ color: Colors.blue, fontFamily: "outfit" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
