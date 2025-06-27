import { useAuth } from "@clerk/clerk-expo";
import { Redirect, SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
      if (isSignedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [isSignedIn, isLoaded]);
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signUp" options={{ headerShown: false }} />
      <Stack.Screen name="forgetPassword" options={{ headerShown: false }} />
      <Stack.Screen
        name="passwordVerification"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="newPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
