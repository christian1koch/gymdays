import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddSetButton from "./add-set-button";
import AddButton from "../ui/add-button";
import { BasicExercise } from "./data";
import { createNewExerciseType, getExerciseTypes } from "../db/db";
import { updateExerciseName } from "../app/services/services";

interface ExerciseItem extends AutocompleteDropdownItem {}

function basicExerciseToExerciseItem(exercise: BasicExercise): ExerciseItem {
  return {
    id: "" + exercise.name,
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
}

export default function Exercise({ exercise }: ExerciseProps) {
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const { weightsPerSet: weights } = exercise;

  const exerciseItems = exerciseTypesToExerciseItems(exerciseTypes);
  const [selectedItem, setSelectedItem] = useState<ExerciseItem | null>(
    basicExerciseToExerciseItem(exercise)
  );
  const [text, setText] = useState("");
  const onBlurSave = async () => {
    if (text && !exerciseTypes.includes(text)) {
      const newExerciseTypes = [...exerciseTypes, text];
      setExerciseTypes(newExerciseTypes);
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
      await updateExerciseName(exercise.gymDay, exercise.id, item.title);
    }
  };

  useEffect(() => {
    const fetchExerciseTypes = async () => {
      const types = await getExerciseTypes();
      setExerciseTypes(types);
    };
    fetchExerciseTypes();
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row items-center my-10 mx-6">
        <AutocompleteDropdown
          key={exerciseTypes.length}
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
