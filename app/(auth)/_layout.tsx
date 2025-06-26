import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgetPassword"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="passwordVerfication"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newPassword"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
