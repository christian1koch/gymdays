import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./set-card";
import { NOT_IMPLEMENTED_REPS } from "../shared/todos";

interface SetListProps {
	sets: number[];
	onEndEditingUpdate: (weights: number[]) => void;
	deleteMode?: boolean;
}

const SetList: React.FC<SetListProps> = ({ sets, onEndEditingUpdate }) => {
	const [weights, setWeights] = useState(sets);
	const [repsList, setRepsList] = useState([
		NOT_IMPLEMENTED_REPS,
		NOT_IMPLEMENTED_REPS + 1,
		NOT_IMPLEMENTED_REPS - 1,
		NOT_IMPLEMENTED_REPS + 2,
	]);

	useEffect(() => {
		setWeights(sets);
	}, [sets]);

	const onChangeWeight = (index: number, newWeight: number) => {
		const newWeights = [...weights];
		newWeights[index] = newWeight;
		setWeights(newWeights);
	};

	const onChangeReps = (index: number, newRep: number) => {
		const newRepsList = [...repsList];
		newRepsList[index] = newRep;
		setRepsList(newRepsList);
	};

	const handleWeightsEndEditing = () => {
		onEndEditingUpdate(weights);
	};

	const handleRepsEndEditing = () => {
		console.log(weights);
	};

	return (
		<FlatList
			data={weights}
			numColumns={2}
			columnWrapperStyle={{ gap: 5 }}
			style={{ alignSelf: "center", backgroundColor: "none" }}
			contentContainerStyle={{ gap: 5 }}
			renderItem={({ item, index }) => (
				<SetCard
					index={index}
					weight={item}
					reps={repsList[index]}
					onChangeWeight={(weight) => onChangeWeight(index, weight)}
					onChangeReps={(reps) => onChangeReps(index, reps)}
					handleWeightsEditEnd={handleWeightsEndEditing}
					handleRepsEditEnd={handleRepsEndEditing}
				/>
			)}
		/>
	);
};

export default SetList;
