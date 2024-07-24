import { useState } from "react";
import { StyleSheet, Button, Pressable, Text, View } from "react-native";
import {
  AutocompleteDropdown,
  AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddSetButton from "./add-set-button";
import { WeightItem } from "./set";

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

export default function Exercise() {
  const [selectedItem, setSelectedItem] = useState<ExerciseItem | null>(null);
  const [weights, setWeights] = useState<string[]>(["20"]);

  const onChangeIndividualWeight = (i: number, v: string) => {
    const newWeights = [...weights];
    newWeights[i] = v;
    setWeights(newWeights);
  };

  const onAddNewSet = () => {
    setWeights([...weights, DEFAULT_WEIGHT]);
  };

  const onItemClear = (i: number) => {
    setWeights(weights.toSpliced(i, 1));
  };

  console.log(weights);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
        <AddSetButton onPress={onAddNewSet} />
      </View>
      <SetList
        onItemClear={onItemClear}
        sets={weights}
        onChangeIndividualWeight={onChangeIndividualWeight}
      />
    </View>
  );
}
