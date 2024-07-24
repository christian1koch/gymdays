import React from "react";
import { View, Text } from "react-native";
import Divider from "../../ui/divider";

type ExerciseCardProps = {
  name: string;
  sets: number[];
  index: number;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ name, sets, index }) => {
  return (
    <View className="bg-slate-100  h-24 mt-2 rounded-lg p-2 px-4 flex-row">
      <View className="bg-slate-200 rounded-3xl h-5 w-5 justify-center items-center mr-2">
        <Text className="text-slate-800">{index + 1}</Text>
      </View>
      <View className="justify-between">
        <Text className="text-slate-900 font-semibold">{name}</Text>
        <View className="flex-row">
          {sets.map((set, i) => (
            <View key={i}>
              <View className="flex-row">
                <Text className="text-slate-800">{set + " kg"}</Text>
                {i < sets.length - 1 && <Divider className="mx-2" />}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ExerciseCard;
