import Button from "@/components/button";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/(auth)");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
      <Button title="log out " onPress={handleSignOut} />
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
