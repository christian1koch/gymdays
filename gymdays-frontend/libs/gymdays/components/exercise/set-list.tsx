import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import "react-native-get-random-values";
import { SetCard } from "./set-card";

interface SetListProps {
	sets: number[];
	onEndEditingUpdate: (weights: number[]) => void;
	deleteMode?: boolean;
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
		onEndEditing={onEndEditing}
		index={index}
		weight={weight}
		key={index}
		onChangeWeight={(weight) => {
			onWeightChange(weight);
		}}
	/>
);

const SetList: React.FC<SetListProps> = ({ sets, onEndEditingUpdate }) => {
	const [weights, setWeights] = useState(sets);

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
				/>
			)}
		/>
	);
};

export default SetList;
