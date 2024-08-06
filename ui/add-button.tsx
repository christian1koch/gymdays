import { Button, Icon } from "@ui-kitten/components";
import { View } from "react-native";

const PlusIcon = (props: any) => <Icon name="plus" {...props} />;

interface AddButtonProps {
  onPress: () => void;
  text?: string;
}
export default function AddButton({ onPress, text }: AddButtonProps) {
  return (
    <View className="w-full my-10">
      <Button onPress={onPress} accessoryLeft={PlusIcon}>
        {text}
      </Button>
    </View>
  );
}
