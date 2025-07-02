import Button from "@/components/button";
import LoginInput from "@/components/loginInput";
import OtherSignIn from "@/components/otherSignIn";
import { Colors } from "@/constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const SignUps = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.TOP);
      return;
    }
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      await setActive({ session: signUp.createdSessionId });

      router.replace("/(tabs)");
      Alert.alert("Sign up successful!");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      // You should parse the error from Clerk to show specific messages
      const clerkError = err as any; // Type assertion if using TypeScript
      const errorMessage =
        clerkError.errors?.[0]?.longMessage ||
        "Sign up failed. Please try again.";
      Alert.alert(errorMessage);
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
          label="first name"
          keyboardAppearance="default"
          keyboardType="default"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <LoginInput
          label="last name"
          keyboardAppearance="default"
          keyboardType="default"
          autoCapitalize="none"
          containerStyle={{ marginHorizontal: "10%" }}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <LoginInput
          label="email address"
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
          title="sign up"
          textStyle={{ textTransform: "capitalize", fontFamily: "outfit" }}
          onPress={handleSignUp}
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
          gap: 5,
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
        </Text>
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
      </View>
      <OtherSignIn screen="up" />
    </View>
  );
};
export default SignUps;

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
