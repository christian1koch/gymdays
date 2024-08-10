import { Plus } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Button } from "tamagui";

interface AddButtonProps {
  onPress: () => void;
  text?: string;
}
export default function AddButton({ onPress, text }: AddButtonProps) {
  return (
    <View className="w-full my-10">
      <Button onPress={onPress} icon={Plus}>
        {text}
      </Button>
    </View>
  );
}
