import { Slot, Stack } from "expo-router";
import { useSafeAreaInsetsStyles } from "../app.helpers";
import { View } from "react-native";

export default function HomeLayout() {
  const styles = useSafeAreaInsetsStyles();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: styles.safeArea,
      }}
    ></Stack>
  );
}
