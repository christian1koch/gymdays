import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { GymDayData } from "../../checklist-page/data";
import { getGymDayById, getGymDays } from "../../db/db";
import GymDay from "../../checklist-page/gym-day/gym-day";
import { useSafeAreaInsetsStyles } from "../app.helpers";

export default function Page() {
  const { gymdayId } = useLocalSearchParams();
  const [gymDay, setGymDay] = useState<GymDayData>();
  // const [isLoading, setIsLoading] = useState(true);
  const styles = useSafeAreaInsetsStyles();
  useEffect(() => {
    const fetchGymDay = async () => {
      // setIsLoading(true);
      const newGymDay = await getGymDayById(Number(gymdayId));
      setGymDay(newGymDay);
      // setIsLoading(false);
    };
    fetchGymDay();
  }, []);
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  if (!gymDay) {
    return null;
  }
  return (
    <View style={styles.safeArea}>
      <GymDay {...gymDay} />
    </View>
  );
}
