/* eslint-disable react-hooks/exhaustive-deps */
// app/oauth-native-callback.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function OAuthNativeCallback() {
  const router = useRouter();

  useEffect(() => {
    // Just wait a second and redirect
    const timer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 1000); // give Clerk time to finish auth in background

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
