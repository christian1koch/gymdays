import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { DarkTheme } from "@react-navigation/native";

// Move this to a hook folders maybe
export function useSafeAreaInsetsStyles() {
	const insets = useSafeAreaInsets();
	const styles = useMemo(
		() =>
			StyleSheet.create({
				safeArea: {
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
					paddingLeft: insets.left,
					paddingRight: insets.right,
					backgroundColor: DarkTheme.colors.background,
				},
			}),
		[insets]
	);

	return styles;
}
