import React from "react";
import { View, Pressable, GestureResponderEvent } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface RemoveSetButtonProps {
	onPress: null | ((event: GestureResponderEvent) => void) | undefined;
}

const RemoveSetButton: React.FC<RemoveSetButtonProps> = ({ onPress }) => {
	return (
		<View>
			<Pressable onPress={onPress}>
				<Entypo name="circle-with-cross" size={32} color="#18181b" />
			</Pressable>
		</View>
	);
};

export default RemoveSetButton;
