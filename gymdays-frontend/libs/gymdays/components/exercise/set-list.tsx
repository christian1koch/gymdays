import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./set-card";
import { NOT_IMPLEMENTED_REPS } from "../shared/todos";
import { Set } from "@gymDays/types";

interface SetListProps {
	sets: Set[];
	deleteMode?: boolean;
}

const SetList: React.FC<SetListProps> = ({ sets }) => {
	return (
		<FlatList
			data={sets}
			numColumns={2}
			columnWrapperStyle={{ gap: 5 }}
			style={{ alignSelf: "center", backgroundColor: "none" }}
			contentContainerStyle={{ gap: 5 }}
			renderItem={({ item, index }) => (
				<SetCard index={index} set={item} />
			)}
		/>
	);
};

export default SetList;
