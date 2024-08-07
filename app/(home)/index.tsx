import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GymDayData } from "../../checklist-page/data";

import GimDayList from "../../checklist-page/gym-day-list/gym-day-list";
import { useEffect, useState } from "react";
import { getGymDays } from "../../db/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import * as Services from "../services/services";
import { useAppSelector } from "../hooks";

const dbForStudio = SQLite.openDatabaseSync("databaseName.db");

const StyledText = styled(Text);

export default function App() {
  useDrizzleStudio(dbForStudio);
  const [gymDays, setGymDays] = useState<GymDayData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const gymDaysInStore = useAppSelector((state) => state.gymDays.gymDays);
  useEffect(() => {
    const fetchGymDays = async () => {
      setIsLoading(true);
      const newGymDays = await Services.fetchAllGymDays();
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
      <GimDayList gymDays={gymDaysInStore} />
      <StatusBar style="auto" />
    </View>
  );
}
