import { Trash2 } from "@tamagui/lucide-icons";
import { View } from "react-native";
import { Swappable, SwappableProps } from "./swappable";
import { Button } from "tamagui";

interface SwappableWithDeleteProps extends SwappableProps {
	onDeletePress: () => void;
}

export function SwappableWithDelete({
	children,
	onDeletePress,
}: SwappableWithDeleteProps) {
	return (
		<Swappable
			rightElement={
				<View className="flex-1 w-20 justify-center items-center">
					<Button
						onPress={onDeletePress}
						circular
						bg={"$color.red8Dark"}
						icon={<Trash2 size={"$1"} />}
					></Button>
				</View>
			}
		>
			{children}
		</Swappable>
	);
}
