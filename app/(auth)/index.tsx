import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import OtherSignIn from "@/components/otherSignIn";
import { Colors } from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.TOP);
      return; // Added return here to stop execution if fields are not filled
    }
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)");
        ToastAndroid.show("login successfull", ToastAndroid.TOP);
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
        ToastAndroid.show(
          "Sign up failed. Please try again.",
          ToastAndroid.TOP
        );
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
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
          label="email"
          keyboardAppearance="default"
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <LoginInput
          label="password"
          autoCapitalize="none"
          secureTextEntry={true}
          containerStyle={{ marginHorizontal: "10%" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          title="sign in"
          textStyle={{ textTransform: "capitalize", fontFamily: "outfit" }}
          onPress={() => {
            {
              onSignInPress();
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
          marginHorizontal: "11%",
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            router.push("/(auth)/forgetPassword");
          }}
        >
          <Text style={{ color: Colors.red, fontFamily: "outfit" }}>
            Forget Password
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",

              textAlign: "center",
            }}
          >
            Don&apos;t have an account?
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              router.push("/signUp");
              console.log("Sign up pressed");
            }}
          >
            <Text style={{ color: Colors.blue, fontFamily: "outfit" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <OtherSignIn screen="in" />
    </View>
  );
};

export default Index;

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
