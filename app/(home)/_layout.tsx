import { Stack } from "expo-router";
import { useSafeAreaInsetsStyles } from "../app.helpers";

export default function HomeLayout() {
	const styles = useSafeAreaInsetsStyles();
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: styles.safeArea,
				}}
			/>
		</>
	);
}
