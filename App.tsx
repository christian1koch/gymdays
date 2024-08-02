import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Exercise from "./checklist-page/exercise";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import GymDay from "./checklist-page/gym-day/gym-day";
import { gymDataMock, gymDataMocks, GymDayData } from "./checklist-page/data";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { default as theme } from "./theme/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import GimDayList from "./checklist-page/gym-day-list/gym-day-list";
import { useEffect, useState } from "react";
import { getGymDays, getTest, initDatabase } from "./db/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";

const dbForStudio = SQLite.openDatabaseSync("databaseName.db");

export default function App() {
  useDrizzleStudio(dbForStudio);
  const [gymDays, setGymDays] = useState<GymDayData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGymDays = async () => {
      setIsLoading(true);
      const newGymDays = await getGymDays();
      setGymDays(newGymDays);
      setIsLoading(false);
    };
    fetchGymDays();
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <AutocompleteDropdownContextProvider>
          <View className="flex-1 items-center justify-center bg-slate-200">
            <GimDayList gymDays={gymDays} />
            {/* <GymDay {...gymDataMock} /> */}
            {/* <Exercise /> */}
            {/* <Button onPress={() => getTest()} title="get test" /> */}
            <StatusBar style="auto" />
          </View>
        </AutocompleteDropdownContextProvider>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
