import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{headerTitle: 'Category'}} />
    </Stack>
  );
};

export default Layout;
