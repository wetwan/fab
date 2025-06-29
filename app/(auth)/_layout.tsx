import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  // const hasNavigated = useRef(false);
  // const router = useRouter();
  // const { isSignedIn, isLoaded } = useAuth();

  // useEffect(() => {
  //   if (!hasNavigated.current && isLoaded) {
  //     SplashScreen.hideAsync();
  //     if (isSignedIn) {
  //       router.replace("/(tabs)");
  //     } else {
  //       router.replace("/(auth)");
  //     }
  //   }
  // }, [isLoaded, isSignedIn]);
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
