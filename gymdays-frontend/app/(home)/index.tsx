import { StatusBar } from "expo-status-bar";
import { View, Text } from "tamagui";
import "expo-router/entry";

import GimDayList from "@gymDays/components/gym-day-list/gym-day-list";
import { useEffect } from "react";
import * as Services from "../../libs/gymdays/features/services/services";
import { useAppSelector } from "../hooks";
import { useFonts } from "expo-font";
import * as db from "@gymDays/db";
import { Footer } from "@gymDays/components/shared/footer";
import { selectGymDaysSortedByDate } from "app/store";
import Toast from "react-native-toast-message";
import useDrizzleStudioWithDB from "@gymDays/hooks/useDrizzleStudioWithDb";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export default function App() {
	let dbName = process.env.EXPO_PUBLIC_DEV_DB_NAME;
	if (!__DEV__) {
		dbName = process.env.EXPO_PUBLIC_PROD_DB_NAME;
	}
	const expoDB = openDatabaseSync(dbName!);
	const newDB = drizzle(expoDB);
	const { success, error } = useMigrations(newDB, migrations);

	useDrizzleStudioWithDB();
	const sortedGymDays = useAppSelector(selectGymDaysSortedByDate);
	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	useEffect(() => {
		if (loaded) {
			// can hide splash screen here
		}
	}, [loaded]);
	useEffect(() => {
		const fetchGymDays = async () => {
			try {
				await Services.fetchAllGymDays();
			} catch (error: any) {
				console.log(error.message);
			}
		};
		fetchGymDays();
	}, []);

	if (error) {
		console.log(error.cause);
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}
	if (!success) {
		db.initDatabase();
		return (
			<View>
				<Text>Migration is in progress...</Text>
			</View>
		);
	}

	if (!loaded) {
		return null;
	}

	return (
		<View className="flex-1">
			<GimDayList gymDays={sortedGymDays} />
			<Footer />
			<StatusBar style="auto" />
		</View>
	);
}
