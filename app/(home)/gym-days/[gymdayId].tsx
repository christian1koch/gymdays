import { useLocalSearchParams } from "expo-router";
import GymDay from "../../../checklist-page/gym-day/gym-day";
import { useAppSelector } from "../../hooks";
import { Footer } from "checklist-page/footer";
import { View } from "react-native";

export default function Page() {
  const { gymdayId } = useLocalSearchParams();
  const gymDays = useAppSelector((state) => state.gymDays.gymDays);
  const gymDay = gymDays.find((g) => g.id === Number(gymdayId));

  if (!gymDay) {
    return null;
  }
  return (
    <View className="flex-1">
      <GymDay {...gymDay} />
      <Footer />
    </View>
  );
}
