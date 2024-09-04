import { ScrollView, View, Text, Animated, PanResponder } from "react-native";
import { Button } from "tamagui";

interface SwappableProps {
	children: JSX.Element;
	rightElement: JSX.Element;
}

export function Swappable({ children, rightElement }: SwappableProps) {
	const translateX = new Animated.Value(0);
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderMove: (e, gestureState) => {
			if (gestureState.dx < 0) {
				translateX.setValue(gestureState.dx);
			}
		},
		onPanResponderRelease(e, gestureState) {
			if (gestureState.dx < -50) {
				Animated.spring(translateX, {
					toValue: -100,
					useNativeDriver: true,
				}).start();
			} else {
				Animated.spring(translateX, {
					toValue: 0,
					useNativeDriver: true,
				}).start();
			}
		},
	});
	return (
		<View className="flex-row">
			<Animated.View
				style={{
					flex: 1,
					transform: [{ translateX: translateX }],
				}}
			>
				<View className="flex-1" {...panResponder.panHandlers}>
					{children}
				</View>
				<View
					className="absolute items-center justify-center h-full"
					style={{
						right: -100,
					}}
				>
					{rightElement}
				</View>
			</Animated.View>
		</View>
	);
}
