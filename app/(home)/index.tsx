import { StatusBar } from "expo-status-bar";
import { View } from "tamagui";
import { GymDayData } from "../../checklist-page/data";
import "expo-router/entry";

import GimDayList from "../../checklist-page/gym-day-list/gym-day-list";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import * as Services from "../services/services";
import { useAppSelector } from "../hooks";
import { useFonts } from "expo-font";
import * as db from "@db";
import { Footer } from "checklist-page/footer";
import { selectGymDaysSortedByDate } from "app/store";

const dbForStudio = SQLite.openDatabaseSync("databaseName.db");

const StyledText = styled(Text);

export default function App() {
	db.initDatabase();
	// useDrizzleStudio(dbForStudio);
	const [gymDays, setGymDays] = useState<GymDayData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
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
			setIsLoading(true);
			try {
				const newGymDays = await Services.fetchAllGymDays();
				setGymDays(newGymDays);
			} catch (error: any) {
				console.log(error.message);
			}
			setIsLoading(false);
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
