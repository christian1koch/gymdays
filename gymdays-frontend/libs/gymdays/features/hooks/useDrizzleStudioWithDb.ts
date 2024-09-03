import { getDBSync, initDatabase } from "@gymDays/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
export default function useDrizzleStudioWithDB() {
	const database = getDBSync();
	if (__DEV__) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useDrizzleStudio(database);
	}
}
