import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import { Colors } from "@/constants/Colors";
import { useSignIn } from "@clerk/clerk-expo";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, ToastAndroid, View } from "react-native";

const Verification = () => {
  const router = useRouter();

  const { isLoaded } = useSignIn();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false); // Can be used for local UI loading
  const [error, setError] = useState("");

  const params = useLocalSearchParams();
  const emailFromParams = params.email;

  const handleVerifyCode = async () => {
    if (!code) {
      ToastAndroid.show("Please enter the verification code", ToastAndroid.TOP);
      return;
    }

    setLoading(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      ToastAndroid.show(
        "Code accepted. Now set your new password.",
        ToastAndroid.SHORT
      );
      router.push({
        pathname: "/newPassword",
        params: {
          email: emailFromParams,
          code: code,
        },
      });
    } catch (err) {
      setError("Failed to process code. Please try again."); // This catch is more for local errors or navigation issues
      console.error(err);
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

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
        <LoginInput
          keyboardType="default"
          onChangeText={(y) => setCode(y)}
          label="verification code"
          value={code}
        />

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
          title={loading ? "comfirming code" : "send"}
          disabled={loading}
          onPress={() => {
            {
              handleVerifyCode();
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
