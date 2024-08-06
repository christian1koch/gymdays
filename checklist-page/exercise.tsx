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
import { createNewExerciseType, updateExerciseName } from "../db/db";

interface ExerciseItem extends AutocompleteDropdownItem {}

function basicExerciseToExerciseItem(exercise: BasicExercise): ExerciseItem {
  return {
    id: "" + exercise.id,
    title: exercise.name,
  };
}

function exerciseTypesToExerciseItems(exerciseTypes: string[]): ExerciseItem[] {
  return exerciseTypes.map((type) => ({
    id: type,
    title: type,
  }));
}

interface ExerciseProps {
  exercise: BasicExercise;
  exerciseTypes: string[];
}

export default function Exercise({ exercise, exerciseTypes }: ExerciseProps) {
  const { weightsPerSet: weights } = exercise;
  const [currentExerciseTypes, setCurrentExerciseTypes] =
    useState(exerciseTypes);
  const exerciseItems = exerciseTypesToExerciseItems(currentExerciseTypes);
  const [selectedItem, setSelectedItem] = useState<ExerciseItem | null>(
    exerciseItems.find((type) => type.id === exercise.name) ?? null
  );
  const [text, setText] = useState("");
  const onBlurSave = async () => {
    if (text && !exerciseTypes.includes(text)) {
      const newExerciseTypes = [...currentExerciseTypes, text];
      setCurrentExerciseTypes(newExerciseTypes);
      setSelectedItem({ id: text, title: text });
      await createNewExerciseType(text);
    }
  };

  const onSelectItem = async (item: ExerciseItem | null) => {
    // setSelectedItem(item);
    if (!item) {
      return;
    }
    if (item.title && item.title !== exercise.name) {
      await updateExerciseName(exercise.id, item.title);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center my-10 mx-6">
        <AutocompleteDropdown
          key={currentExerciseTypes.length}
          containerStyle={{ flex: 4, width: 20 }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={true}
          onSubmit={onBlurSave}
          initialValue={selectedItem ?? "1"} // or just '2'
          onSelectItem={(item) => onSelectItem(item)}
          dataSet={exerciseItems}
          showClear={false}
          emptyResultText="Create new Exercise"
          onChangeText={setText}
        />
      </View>
      <SetList sets={weights} />
      <View className="justify-center h-26 mx-6">
        <AddButton onPress={() => {}} text="Add new set" />
      </View>
    </View>
  );
}
