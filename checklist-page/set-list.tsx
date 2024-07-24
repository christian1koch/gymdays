import React from "react";
import { FlatList, View } from "react-native";
import Set, { WeightItem } from "./set";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import RemoveSetButton from "./remove-set-button";

interface SetListProps {
  sets: string[];
  onItemClear: (i: number) => void;
  onChangeIndividualWeight: (i: number, v: string) => void;
}
const SetList: React.FC<SetListProps> = ({
  sets,
  onItemClear,
  onChangeIndividualWeight,
}) => {
  return (
    <View
      style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}
    >
      {sets.map((s, i) => (
        <Set
          onClear={() => onItemClear(i)}
          key={i}
          currentItem={s}
          onChangeWeight={(v: string) => onChangeIndividualWeight(i, v)}
        />
      ))}
      <RemoveSetButton onPress={() => onItemClear(sets.length - 1)} />
    </View>
  );
};

export default SetList;
