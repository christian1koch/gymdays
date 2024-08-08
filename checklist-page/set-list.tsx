import React, { useState } from "react";
import { FlatList, View } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./gym-day/set-card";
import { List } from "@ui-kitten/components";
import * as Services from "@services";
interface SetListProps {
  sets: number[];
  onEndEditingUpdate: (weights: number[]) => void;
}

interface SetRendererProps {
  weight: number;
  index: number;
  onWeightChange: (newWeight: number) => void;
  onEndEditing: () => void;
}

const SetRenderer = ({
  weight,
  index,
  onWeightChange,
  onEndEditing,
}: SetRendererProps) => (
  <SetCard
    index={index + 1}
    weight={weight}
    key={index}
    onChangeText={(weight) => onWeightChange(Number(weight))}
    onEndEditing={onEndEditing}
  />
);
const SetList: React.FC<SetListProps> = ({ sets, onEndEditingUpdate }) => {
  const [weights, setWeights] = useState(sets);

  const onChangeWeight = (index: number, newWeight: number) => {
    const newWeights = [...weights];
    newWeights[index] = newWeight;
    setWeights(newWeights);
  };

  const handleOnEndEditing = () => {
    onEndEditingUpdate(weights);
  };

  return (
    <List
      data={weights}
      numColumns={2}
      columnWrapperStyle={{ gap: 5 }}
      style={{ alignSelf: "center" }}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item, index }) => (
        <SetRenderer
          index={index}
          weight={item}
          onWeightChange={(weight) => onChangeWeight(index, weight)}
          onEndEditing={handleOnEndEditing}
        />
      )}
    />
  );
};

export default SetList;
