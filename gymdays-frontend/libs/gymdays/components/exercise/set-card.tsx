import { View, Text, H2, SizableText } from "tamagui";
import { styled } from "nativewind";
import classNames from "classnames";
import RNPickerSelect from "react-native-picker-select";
import { DEFAULT_REPS, DEFAULT_WEIGHTS } from "libs/utils/utils";
import { Pressable } from "react-native";
import { useSelectableItemContext } from "@gymDays/hooks/useSelectableItem";

const StyledText = styled(Text);

interface SetCardProps {
	index: number;
	weight: number;
	reps: number;
	deleteMode?: boolean;
	className?: string;
	onChangeReps: (newReps: number) => void;
	onChangeWeight: (newWeight: number) => void;
	handleWeightsEditEnd: () => void;
	handleRepsEditEnd: () => void;
}

const weightArrayToLabelValue = (weights: number[]) =>
	weights.map((weight) => ({
		label: `${weight} kg`,
		value: weight,
	}));

const repsInLevelValue = (defaultReps: number[]) => {
	return defaultReps.map((reps) => ({ label: "" + reps, value: reps }));
};

export function SetCard({
	index,
	weight,
	reps,
	className,
	onChangeReps,
	onChangeWeight,
	handleWeightsEditEnd,
	handleRepsEditEnd,
}: SetCardProps) {
	const {
		onSelectableItemPress,
		selectModeOn,
		selectedItemsArr,
		onLongPress,
	} = useSelectableItemContext();

	const isSelected = selectedItemsArr.includes(index);

	if (selectModeOn) {
		return (
			<SimpleSetCard
				weight={weight}
				reps={reps}
				index={index}
				className={classNames(className)}
				onPress={() => onSelectableItemPress(index)}
				isSelected={isSelected}
			/>
		);
	}
	return (
		<Pressable
			style={{ zIndex: 200 }}
			onLongPress={() => onLongPress(index)}
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
						onValueChange={onChangeReps}
						placeholder={{}}
						items={repsInLevelValue(DEFAULT_REPS)}
						value={reps}
						onClose={handleRepsEditEnd}
					>
						<View
							className="rounded-md justify-center flex-row w-12"
							bg="$background025"
						>
							<Text className="m-1">{reps}x</Text>
						</View>
					</RNPickerSelect>
				</View>
				<View className="self-center">
					<RNPickerSelect
						onValueChange={onChangeWeight}
						placeholder={{}}
						items={weightArrayToLabelValue(DEFAULT_WEIGHTS)}
						value={weight}
						onClose={handleWeightsEditEnd}
					>
						<View className="self-center flex-row items-baseline">
							<H2>{weight}</H2>
							<SizableText size={"$5"}>kg</SizableText>
						</View>
					</RNPickerSelect>
				</View>
			</View>
		</Pressable>
	);
}

interface SimpleSetCardProps
	extends Pick<SetCardProps, "className" | "weight" | "index" | "reps"> {
	onRepsPress?: () => void;
	onPress?: () => void;
	isSelected?: boolean;
	onLongPress?: () => void;
}

const SimpleSetCard = ({
	className,
	weight,
	index,
	onPress,
	isSelected,
	reps,
}: SimpleSetCardProps) => (
	<Pressable style={{ zIndex: 200 }} onPress={onPress}>
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
				<Pressable style={{ zIndex: 200 }}>
					<View className="rounded-md p-1" bg="$background025">
						<Text className="m-1">{reps}x</Text>
					</View>
				</Pressable>
			</View>
			<View className="self-center flex-row items-baseline">
				<H2>{weight}</H2>
				<SizableText size={"$5"}>kg</SizableText>
			</View>
		</View>
	</Pressable>
);
