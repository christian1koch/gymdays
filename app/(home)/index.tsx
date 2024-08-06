import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { GymDayData } from "../../checklist-page/data";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import GimDayList from "../../checklist-page/gym-day-list/gym-day-list";
import { useEffect, useState } from "react";
import { getGymDays } from "../../db/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import HeaderNav from "../../ui/header-nav";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSafeAreaInsetsStyles } from "../app.helpers";

const dbForStudio = SQLite.openDatabaseSync("databaseName.db");

const StyledText = styled(Text);

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
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  return (
    <View className="h-full">
      <GimDayList gymDays={gymDays} />
      {/* <GymDay {...gymDataMock} /> */}
      {/* <Exercise /> */}
      {/* <Button onPress={() => getTest()} title="get test" /> */}
      <StatusBar style="auto" />
    </View>
  );
}
