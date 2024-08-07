import { useLocalSearchParams } from "expo-router";
import GymDay from "../../../checklist-page/gym-day/gym-day";
import { useAppSelector } from "../../hooks";

export default function Page() {
  const { gymdayId } = useLocalSearchParams();
  const gymDays = useAppSelector((state) => state.gymDays.gymDays);
  const gymDay = gymDays.find((g) => g.id === Number(gymdayId));

  if (!gymDay) {
    return null;
  }
  return <GymDay {...gymDay} />;
}
