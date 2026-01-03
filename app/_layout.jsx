import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcomeScreen" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="history" />
    </Stack>
  );
};

export default Layout;
