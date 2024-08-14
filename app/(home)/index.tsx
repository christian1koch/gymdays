import { StatusBar } from "expo-status-bar";
import { View } from "tamagui";
import "expo-router/entry";

import GimDayList from "@gymDays/components/gym-day-list/gym-day-list";
import { useEffect } from "react";
import * as Services from "../../libs/gymdays/features/services/services";
import { useAppSelector } from "../hooks";
import { useFonts } from "expo-font";
import * as db from "@gymDays/db";
import { Footer } from "@gymDays/components/shared/footer";
import { selectGymDaysSortedByDate } from "app/store";

export default function App() {
	db.initDatabase();
	// useDrizzleStudio(dbForStudio);
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
