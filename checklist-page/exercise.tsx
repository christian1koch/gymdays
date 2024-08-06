import { useState } from "react";
import { View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddSetButton from "./add-set-button";
import AddButton from "../ui/add-button";
import { BasicExercise } from "./data";

interface ExerciseItem extends AutocompleteDropdownItem {}

const DEFAULT_EXERCISES: ExerciseItem[] = [
  { id: "1", title: "Bench Press" },
  { id: "2", title: "Squats" },
  { id: "3", title: "Deadlifts" },
  { id: "4", title: "Pull-ups" },
  { id: "5", title: "Push-ups" },
  { id: "6", title: "Dumbell Curls" },
  { id: "7", title: "Dumbell Chest Press" },
  { id: "8", title: "Dumbell Shoulder Press" },
  { id: "9", title: "Dumbell Rows" },
];

const DEFAULT_WEIGHT = "20";

function basicExerciseToExerciseItem(exercise: BasicExercise): ExerciseItem {
  return {
    id: "" + exercise.id,
    title: exercise.name,
  };
}

interface ExerciseProps {
  exercise: BasicExercise;
}

export default function Exercise({ exercise }: ExerciseProps) {
  const [selectedItem, setSelectedItem] = useState<ExerciseItem | null>(
    basicExerciseToExerciseItem(exercise)
  );
  const { weightsPerSet: weights } = exercise;
  // const [weights, setWeights] = useState<string[]>(["20"]);

  // const onChangeIndividualWeight = (i: number, v: string) => {
  //   const newWeights = [...weights];
  //   newWeights[i] = v;
  //   setWeights(newWeights);
  // };

  // const onAddNewSet = () => {
  //   setWeights([...weights, DEFAULT_WEIGHT]);
  // };

  // const onItemClear = (i: number) => {
  //   setWeights(weights.toSpliced(i, 1));
  // };

  // console.log(weights);

  return (
    <View className="flex-1">
      <View className="flex-row items-center my-10 mx-6">
        <AutocompleteDropdown
          containerStyle={{ flex: 4, width: 20 }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: "1" }} // or just '2'
          onSelectItem={setSelectedItem}
          dataSet={DEFAULT_EXERCISES}
          showClear={false}
        />
      </View>
      <SetList sets={[20, 20, 20, 40, 50, 60, 20, 22.5]} />
      <View className="justify-center h-26 mx-6">
        <AddButton onPress={() => {}} text="Add new set" />
      </View>
    </View>
  );
}
