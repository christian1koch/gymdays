import { BasicExercise, GymDayData } from "../data";
import { View, FlatList } from "react-native";
import { dateToYearMonthDay } from "../../libs/utils/utils";
import { styled } from "nativewind";
import ExerciseCard from "./exercise-card";
import Divider from "../../ui/divider";
import { Text } from "@ui-kitten/components";
import { useState } from "react";
import HeaderNav, { MenuItemProps } from "../../ui/header-nav";
import AddButton from "../../ui/add-button";
import { Link } from "expo-router";
import * as services from "@services";
import * as db from "@db";
import { router } from "expo-router";

interface GymDayProps extends GymDayData {}

interface Listable<T> {
  item: T;
  index: number;
}

interface MainExeciseCardProps extends Listable<BasicExercise> {
  onLongPress: () => void;
}

interface SelectableExerciseCardProps extends Listable<BasicExercise> {
  selected?: boolean;
  onPress: () => void;
}

const SelectableExerciseCard = ({
  item,
  index,
  selected,
  onPress,
}: SelectableExerciseCardProps) => {
  return (
    <ExerciseCard
      key={index}
      name={item.name}
      sets={item.weightsPerSet}
      index={index}
      onPress={onPress}
      highlighted={selected}
    />
  );
};

const MainExerciseCard = ({
  item,
  index,
  onLongPress,
}: MainExeciseCardProps) => {
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
        onLongPress={onLongPress}
      />
    </Link>
  );
};

const StyledText = styled(Text);

const GymDay: React.FC<GymDayProps> = ({ id, name, date, exercises }) => {
  const [currentName, setCurrentName] = useState(name);
  const [selectMode, setSelectMode] = useState(false);
  const onEndEditing = async () => {
    services.renameGymDay(id, currentName);
  };
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

  const onAddExercise = async () => {
    const newExercise = await services.createNewExercise(id, "Bench Press");
    router.navigate({
      pathname: "/gym-days/exercises/[id]",
      params: { id: newExercise.id, gymDayId: id },
    });
  };

  const getMenuItems = () => {
    if (!selectMode) {
      return null;
    }
    const menuItems: MenuItemProps[] = [
      {
        title: "Stop Selecting",
        onPress: () => {
          setSelectMode(false);
          setSelectedExercises([]);
        },
      },
      {
        title: "Delete",
        onPress: () => {
          services.bulkDeleteExercises(id, selectedExercises);
        },
      },
    ];
    return menuItems;
  };

  const onLongPress = (id: number) => {
    setSelectMode(true);
    setSelectedExercises([...selectedExercises, id]);
  };

  const onSelectableCardPress = (id: number) => {
    if (!selectedExercises.includes(id)) {
      return setSelectedExercises([...selectedExercises, id]);
    }
    const newSelectedExercises = [...selectedExercises];
    const idIndex = newSelectedExercises.findIndex((ex) => ex === id);
    newSelectedExercises.splice(idIndex, 1);
    return setSelectedExercises(newSelectedExercises);
  };

  return (
    <View className="flex-1">
      <View>
        <HeaderNav
          title={currentName}
          isEditable
          onChangeText={setCurrentName}
          onEndEditing={onEndEditing}
          href={"/"}
          menuItems={getMenuItems()}
        />
        <StyledText className="self-center" appearance="hint">
          {dateToYearMonthDay(new Date(date))}
        </StyledText>
        <Divider className="mb-5" horizonal />
        <FlatList
          className="h-4/6"
          renderItem={({ item, index }) => {
            if (selectMode) {
              return (
                <SelectableExerciseCard
                  key={item.id}
                  item={item}
                  index={index}
                  onPress={() => onSelectableCardPress(item.id)}
                  selected={selectedExercises.some((ex) => ex === item.id)}
                />
              );
            }
            return (
              <MainExerciseCard
                key={item.id}
                item={item}
                index={index}
                onLongPress={() => onLongPress(item.id)}
              />
            );
          }}
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
