import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import { Colors } from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import React, { useState } from "react";
import { Text, ToastAndroid, View } from "react-native";

const NewPassword = () => {
  const router = useRouter();

  const { signIn, isLoaded, setActive } = useSignIn();
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const params = useLocalSearchParams();
  const emailFromParams = params.email as string;
  const codeFromParams = params.code as string;

  const handleSetNewPassword = async () => {
    // Ensure params are available before proceeding
    if (!emailFromParams || !codeFromParams) {
      ToastAndroid.show(
        "Missing reset information. Please restart.",
        ToastAndroid.TOP
      );
      return;
    }

    if (!isLoaded) return;
    if (!newPassword || !confirmPassword) {
      ToastAndroid.show(
        "Please enter and confirm your new password",
        ToastAndroid.TOP
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.TOP);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",

        code: codeFromParams,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        ToastAndroid.show(
          "Password reset successfully! You are now logged in.",
          ToastAndroid.LONG
        );

        router.replace("/(tabs)");
      } else {
        console.log("Unexpected sign-in status:", result);
        ToastAndroid.show(
          "An unexpected error occurred during password reset.",
          ToastAndroid.LONG
        );
      }
    } catch (err) {
      const clerkError = err as any;
      setError(
        clerkError.errors[0]?.longMessage ||
          "Failed to reset password. Please check the code and try again."
      );
      console.error(JSON.stringify(clerkError, null, 2));
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

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
          value={newPassword}
          onChangeText={(t) => setNewPassword(t)}
        />
        <LoginInput
          keyboardType="default"
          label="confrim password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
        />

        <Button
          title={loading ? "comfirming password" : "Change password"}
          disabled={loading}
          onPress={() => {
            handleSetNewPassword();
          }}
          style={{ backgroundColor: Colors.red, marginTop: 40 }}
          variant="block"
        />
      </View>
    </>
  );
};

export default NewPassword;
