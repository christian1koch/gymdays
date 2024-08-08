import { BasicExercise, GymDayData } from "../data";
import { View, FlatList } from "react-native";
import { dateToYearMonthDay } from "../../libs/utils/utils";
import { styled } from "nativewind";
import ExerciseCard from "./exercise-card";
import Divider from "../../ui/divider";
import { Text } from "@ui-kitten/components";
import { useState } from "react";
import HeaderNav from "../../ui/header-nav";
import AddButton from "../../ui/add-button";
import { Link } from "expo-router";
import * as services from "@services";
import * as db from "@db";
import { router } from "expo-router";

interface GymDayProps extends GymDayData {}

const renderExercise = ({
  item,
  index,
}: {
  item: BasicExercise;
  index: number;
}) => {
  return (
    <Link
      href={{
        pathname: "/gym-days/exercises/[id]",
        params: { id: item.id, gymDayId: item.gymDay },
      }}
      asChild
    >
      <ExerciseCard
        key={index}
        name={item.name}
        sets={item.weightsPerSet}
        index={index}
      />
    </Link>
  );
};

const StyledText = styled(Text);

const GymDay: React.FC<GymDayProps> = ({ id, name, date, exercises }) => {
  const [currentName, setCurrentName] = useState(name);

  const onBlur = async () => {
    const res = await db.updateGymDayName(id, currentName);
  };

  const onAddExercise = async () => {
    const newExercise = await services.createNewExercise(id, "Bench Press");
    router.navigate({
      pathname: "/gym-days/exercises/[id]",
      params: { id: newExercise.id, gymDayId: id },
    });
  };

  return (
    <View className="flex-1">
      <View>
        <HeaderNav
          title={currentName}
          isEditable
          onChangeText={setCurrentName}
          onBlur={onBlur}
          href={"/"}
        />
        <StyledText className="self-center" appearance="hint">
          {dateToYearMonthDay(new Date(date))}
        </StyledText>
        <Divider className="mb-5" horizonal />
        <FlatList
          className="h-4/6"
          renderItem={renderExercise}
          data={exercises}
        />
        <View className="mx-6">
          <AddButton text="Add New Exercise" onPress={onAddExercise} />
        </View>
      </View>
    </View>
  );
};

export default GymDay;
