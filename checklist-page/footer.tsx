import { PortalGate } from "libs/portal/PortalContext";
import { View } from "react-native";

export const Footer = () => {
  return (
    <View className="flex-row items-center justify-between">
      <PortalGate name="footer" />
    </View>
  );
};
