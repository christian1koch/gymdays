import { BasicExercise, GymDayData, newExerciseMock } from "../data";
import { View, FlatList } from "react-native";
import { dateToYearMonthDay } from "../../libs/utils/utils";
import { styled } from "nativewind";
import ExerciseCard from "./exercise-card";
import Divider from "../../ui/divider";
import { Button, Icon, Text } from "@ui-kitten/components";
import { useState } from "react";
import HeaderNav from "../../ui/header-nav";
import AddButton from "../../ui/add-button";
import { updateGymDayName } from "../../db/db";

interface GymDayProps extends GymDayData {}

const renderExercise = ({
  item,
  index,
}: {
  item: BasicExercise;
  index: number;
}) => {
  return (
    <ExerciseCard
      key={index}
      name={item.name}
      sets={item.weightsPerSet}
      index={index}
    />
  );
};

const StyledText = styled(Text);

const GymDay: React.FC<GymDayProps> = ({ id, name, date, exercises }) => {
  const [currentExercises, setCurrentExercises] = useState(exercises);
  const [currentName, setCurrentName] = useState(name);
  const handleOnAddExercise = () => {
    setCurrentExercises((prev) => [...prev, newExerciseMock]);
  };

  const onBlur = async () => {
    const res = await updateGymDayName(id, currentName);
    console.log("blurred", res);
  };

  return (
    <View className="w-full h-full">
      <View>
        <HeaderNav
          title={currentName}
          isEditable
          onChangeText={setCurrentName}
          onBlur={onBlur}
          href={"/"}
        />
        <StyledText className="self-center" appearance="hint">
          {dateToYearMonthDay(date)}
        </StyledText>
        <Divider className="mb-5" horizonal />
        <FlatList
          className="h-4/6"
          renderItem={renderExercise}
          data={currentExercises}
        />
        <AddButton onPress={handleOnAddExercise} />
      </View>
    </View>
  );
};

export default GymDay;
