import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./gym-day/set-card";
import * as Services from "@services";
interface SetListProps {
  sets: number[];
  onEndEditingUpdate: (weights: number[]) => void;
  deleteMode?: boolean;
  onDeleteSet: (weights: number[]) => void;
}

interface SetRendererProps {
  weight: number;
  index: number;
  onWeightChange: (newWeight: number) => void;
  onEndEditing: () => void;
  isOnDeleteMode?: boolean;
  onDelete: () => void;
}

const SetRenderer = ({
  weight,
  index,
  onWeightChange,
  onEndEditing,
  isOnDeleteMode,
  onDelete,
}: SetRendererProps) => (
  <SetCard
    index={index + 1}
    weight={weight}
    key={index}
    onChangeText={(weight) => {
      let newWeight = weight;
      newWeight = newWeight.replace(",", ".");
      onWeightChange(Number(newWeight));
    }}
    onEndEditing={onEndEditing}
    deleteMode={isOnDeleteMode}
    onDelete={onDelete}
  />
);

const SetList: React.FC<SetListProps> = ({
  sets,
  onEndEditingUpdate,
  onDeleteSet,
  deleteMode,
}) => {
  const [weights, setWeights] = useState(sets);

  const _onDeleteSet = (setIndex: number) => {
    const newWeights = [...weights];
    newWeights.splice(setIndex, 1);
    setWeights(newWeights);
    console.log("new Weights", newWeights);
    onDeleteSet(newWeights);
  };

  useEffect(() => {
    setWeights(sets);
  }, [sets]);

  const onChangeWeight = (index: number, newWeight: number) => {
    const newWeights = [...weights];
    newWeights[index] = newWeight;
    setWeights(newWeights);
  };

  const handleOnEndEditing = () => {
    onEndEditingUpdate(weights);
  };

  return (
    <FlatList
      data={weights}
      numColumns={2}
      columnWrapperStyle={{ gap: 5 }}
      style={{ alignSelf: "center", backgroundColor: "none" }}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item, index }) => (
        <SetRenderer
          index={index}
          weight={item}
          onWeightChange={(weight) => onChangeWeight(index, weight)}
          onEndEditing={handleOnEndEditing}
          isOnDeleteMode={deleteMode}
          onDelete={() => _onDeleteSet(index)}
        />
      )}
    />
  );
};

export default SetList;
