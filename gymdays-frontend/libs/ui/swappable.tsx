import { useRef } from "react";
import { ScrollView, View, Text, Animated, PanResponder } from "react-native";
import { Button } from "tamagui";

interface SwappableProps {
	children: JSX.Element;
	rightElement: JSX.Element;
}

export function Swappable({ children, rightElement }: SwappableProps) {
	const translateX = useRef(new Animated.Value(0)).current;
	const translateValue = useRef(0);
	translateX.addListener(({ value }) => (translateValue.current = value));
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: (evt, gestureState) => {
				translateX.setOffset(translateValue.current);
				translateX.setValue(0);
			},
			onPanResponderMove: Animated.event([null, { dx: translateX }]),
			onPanResponderRelease(e, gestureState) {
				if (translateValue.current < -50) {
					translateX.setOffset(0);
					translateX.setValue(translateValue.current);
					Animated.spring(translateX, {
						toValue: -100,
						useNativeDriver: true,
					}).start();
				} else {
					translateX.setOffset(0);
					translateX.setValue(translateValue.current);
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;
	return (
		<View>
			<Animated.View
				style={{
					flex: 1,
					flexDirection: "row",
					transform: [{ translateX: translateX }],
				}}
			>
				<View className="w-full" {...panResponder.panHandlers}>
					{children}
				</View>
				<View
					className="items-center justify-center h-full ml-2"
					style={{}}
				>
					{rightElement}
				</View>
			</Animated.View>
		</View>
	);
}
