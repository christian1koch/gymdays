import React from "react";
import { Pressable, PressableProps } from "react-native";
import Divider from "../../ui/divider";
import { View, Paragraph } from "tamagui";
import { boolean } from "drizzle-orm/mysql-core";

interface ExerciseCardProps extends PressableProps {
  name: string;
  sets: number[];
  index: number;
  highlighted?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  sets,
  index,
  highlighted,
  ...presableProps
}) => {
  return (
    <Pressable {...presableProps}>
      <View
        className="h-24 mt-2 rounded-lg p-2 px-4 flex-row border-2"
        bg={!highlighted ? "$background" : "$borderColor"}
        borderColor={"$accentBackground"}
        borderTopWidth="$-1.5"
      >
        <View
          bg={"$color05"}
          className="rounded-3xl h-5 w-5 justify-center items-center mr-2"
        >
          <Paragraph>{index + 1}</Paragraph>
        </View>
        <View className="justify-between">
          <Paragraph className=" font-semibold">{name}</Paragraph>
          <View className="flex-row">
            {sets.map((set, i) => (
              <View key={i}>
                <View className="flex-row">
                  <Paragraph className="">{set + " kg"}</Paragraph>
                  {i < sets.length - 1 && <Divider className="mx-2" />}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ExerciseCard;
