import { View, Text, H2, SizableText } from "tamagui";
import { styled } from "nativewind";
import classNames from "classnames";
import RNPickerSelect from "react-native-picker-select";
import { DEFAULT_REPS, DEFAULT_WEIGHTS } from "libs/utils/utils";
import { Pressable } from "react-native";
import { useSelectableItemContext } from "@gymDays/hooks/useSelectableItem";
import { Set } from "@gymDays/types";
import { useState } from "react";
import * as services from "@gymDays/services";

const StyledText = styled(Text);

interface SetCardProps {
	index: number;
	set: Set;
	deleteMode?: boolean;
	className?: string;
	// onChangeReps: (newReps: number) => void;
	// onChangeWeight: (newWeight: number) => void;
	// handleWeightsEditEnd: () => void;
	// handleRepsEditEnd: () => void;
}

const weightArrayToLabelValue = (weights: number[]) =>
	weights.map((weight) => ({
		label: `${weight} kg`,
		value: weight,
	}));

const repsInLevelValue = (defaultReps: number[]) => {
	return defaultReps.map((reps) => ({ label: "" + reps, value: reps }));
};

export function SetCard({ index, className, set }: SetCardProps) {
	const {
		onSelectableItemPress,
		selectModeOn,
		selectedItemsArr,
		onLongPress,
	} = useSelectableItemContext();

	const [currentWeight, setCurrentWeight] = useState(set.weights);
	const [currentReps, setCurrentReps] = useState(set.reps);

	const handleWeightChange = (newWeight: number) => {
		setCurrentWeight(newWeight);
	};
	const handleRepsChange = (newReps: number) => {
		setCurrentReps(newReps);
	};

	const handleSetEndEditing = () => {
		services.updateSet(set.exerciseId, set.id, currentWeight, currentReps);
	};

	const isSelected = selectedItemsArr.includes(set.id);

	// if (selectModeOn) {
	// 	return (
	// 		<SimpleSetCard

	// 			index={index}
	// 			className={classNames(className)}
	// 			onPress={() => onSelectableItemPress(index)}
	// 			isSelected={isSelected}
	// 		/>
	// 	);
	// }
	return (
		<Pressable
			style={{ zIndex: 200 }}
			onLongPress={() => onLongPress(set.id)}
			onPress={
				selectModeOn ? () => onSelectableItemPress(set.id) : undefined
			}
		>
			<View
				className={classNames(
					"w-40 h-40 rounded-2xl mt-24 flex-row justify-center gap-0 border-2",
					className
				)}
				backgroundColor={"$accentBackground"}
				borderColor={isSelected ? "$color" : "$colorTransparent"}
			>
				<View className="flex-row text-slate-200 absolute items-baseline justify-around w-full top-2">
					<StyledText className="text-slate-200">
						Set {index + 1}:
					</StyledText>
					<RNPickerSelect
						disabled={selectModeOn}
						onValueChange={handleRepsChange}
						placeholder={{}}
						items={repsInLevelValue(DEFAULT_REPS)}
						value={currentReps}
						onClose={handleSetEndEditing}
					>
						<View
							className="rounded-md justify-center flex-row w-12"
							bg="$background025"
						>
							<Text className="m-1">{currentReps}x</Text>
						</View>
					</RNPickerSelect>
				</View>
				<View className="self-center">
					<RNPickerSelect
						disabled={selectModeOn}
						onValueChange={handleWeightChange}
						placeholder={{}}
						items={weightArrayToLabelValue(DEFAULT_WEIGHTS)}
						value={currentWeight}
						onClose={handleSetEndEditing}
					>
						<View className="self-center flex-row items-baseline">
							<H2>{currentWeight}</H2>
							<SizableText size={"$5"}>kg</SizableText>
						</View>
					</RNPickerSelect>
				</View>
			</View>
		</Pressable>
	);
}

// interface SimpleSetCardProps
// 	extends Pick<SetCardProps, "className" | "weight" | "index" | "reps"> {
// 	onRepsPress?: () => void;
// 	onPress?: () => void;
// 	isSelected?: boolean;
// 	onLongPress?: () => void;
// }

// const SimpleSetCard = ({
// 	className,
// 	weight,
// 	index,
// 	onPress,
// 	isSelected,
// 	reps,
// }: SimpleSetCardProps) => (
// 	<Pressable style={{ zIndex: 200 }} onPress={onPress}>
// 		<View
// 			className={classNames(
// 				"w-40 h-40 rounded-2xl mt-24 flex-row justify-center gap-0 border-2",
// 				className
// 			)}
// 			backgroundColor={"$accentBackground"}
// 			borderColor={isSelected ? "$color" : "$colorTransparent"}
// 		>
// 			<View className="flex-row text-slate-200 absolute items-baseline justify-around w-full top-2">
// 				<StyledText className="text-slate-200">
// 					Set {index + 1}:
// 				</StyledText>
// 				<Pressable style={{ zIndex: 200 }}>
// 					<View className="rounded-md p-1" bg="$background025">
// 						<Text className="m-1">{reps}x</Text>
// 					</View>
// 				</Pressable>
// 			</View>
// 			<View className="self-center flex-row items-baseline">
// 				<H2>{weight}</H2>
// 				<SizableText size={"$5"}>kg</SizableText>
// 			</View>
// 		</View>
// 	</Pressable>
// );
