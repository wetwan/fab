import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import { Colors } from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, ToastAndroid, View } from "react-native";

const ForgetPassword = () => {
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [successfulCreation, setSuccessfulCreation] = React.useState(false); // To track if code was sent
  const [error, setError] = useState("");

  const forgetPasswordHandler = async () => {
    if (!isLoaded) return;
    if (!email) {
      ToastAndroid.show("Please enter your email address", ToastAndroid.TOP);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setSuccessfulCreation(true); // Code successfully sent
      ToastAndroid.show(
        "Password reset code sent to your email",
        ToastAndroid.LONG
      );

      router.push({
        pathname: "/(auth)/passwordVerification",
        params: { email },
      });
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || "Failed to send reset code.");
      console.error(JSON.stringify(err, null, 2));
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Forget Password",
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
          Please Enter your Email Address to receive a verification code.
        </Text>
        <LoginInput
          keyboardType="email-address"
          label="email address"
          onChangeText={(t) => setEmail(t)}
          value={email}
        />

        <Button
          title={loading ? "sending code" : "enter email"}
          disabled={loading}
          onPress={() => {
            {
              forgetPasswordHandler();
            }
          }}
          style={{ backgroundColor: Colors.red, marginTop: 40 }}
          variant="block"
        />

        {successfulCreation && (
          <Text style={{ marginTop: 20, textAlign: "center", color: "green" }}>
            A password reset code has been sent to your email. Please check your
            inbox and spam folder.
          </Text>
        )}
      </View>
    </>
  );
};

export default ForgetPassword;
