import React from "react";
import { FlatList, View } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./gym-day/set-card";
import { List } from "@ui-kitten/components";

interface SetListProps {
  sets: number[];
}
const setRenderer = (s: number, i: number) => (
  <View className="gap-1">
    <SetCard index={i + 1} weight={s} key={i} />
  </View>
);
const SetList: React.FC<SetListProps> = ({ sets }) => {
  return (
    <List
      data={sets}
      numColumns={2}
      columnWrapperStyle={{ gap: 5 }}
      style={{ alignSelf: "center" }}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item, index }) => setRenderer(item, index)}
    />
  );
};

export default SetList;
