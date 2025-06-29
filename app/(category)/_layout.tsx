import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" />
    </Stack>
  );
};

export default Layout;
