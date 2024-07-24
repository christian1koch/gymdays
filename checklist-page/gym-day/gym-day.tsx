import { GymDayData } from "../data";
import { View, Text } from "react-native";
import { dateToYearMonthDay } from "../../libs/utils/utils";
import { styled } from "nativewind";
import ExerciseCard from "./exercise-card";
import Divider from "../../ui/divider";

interface GymDayProps extends GymDayData {}

const GymDay: React.FC<GymDayProps> = ({ name, date, exercises }) => {
  return (
    <View className="w-full h-full mt-40 px-5">
      <View>
        <Text className="text-4xl font-semibold text-slate-900">{name}</Text>
        <Text className="text-base text-slate-500">
          {dateToYearMonthDay(date)}
        </Text>
        <Divider className="my-5" horizonal />
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            name={exercise.name}
            sets={exercise.weightsPerSet}
            index={index}
          />
        ))}
      </View>
    </View>
  );
};

export default GymDay;
