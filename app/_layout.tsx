import { tokenCache } from "@/cache";
import { AppContextProvider } from "@/context/foodstore";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";

export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  // const publishableKey2 = process.env.STRIP_PULISHBALEKEY!;

  if (!publishableKey) {
    throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set");
  }

  return (
    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY!}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <AppContextProvider>
          <ClerkLoaded>
            <Slot screenOptions={{ headerShown: false }} />
          </ClerkLoaded>
        </AppContextProvider>
      </ClerkProvider>
    </StripeProvider>
  );
}
