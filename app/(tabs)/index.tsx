import Button from "@/components/button";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.push("/(auth)");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
      <Text>Index</Text>
      <Button title="log out " onPress={handleSignOut} />
    </View>
  );
};

export default Index;
