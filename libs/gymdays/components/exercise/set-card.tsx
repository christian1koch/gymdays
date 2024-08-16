import { View, Text, Button, H2 } from "tamagui";
import { styled } from "nativewind";
import classNames from "classnames";
import RNPickerSelect from "react-native-picker-select";
import { X } from "@tamagui/lucide-icons";
import { DEFAULT_WEIGHTS } from "libs/utils/utils";
import { Pressable, TouchableOpacity } from "react-native";
import { useSelectableItemContext } from "@gymDays/hooks/useSelectableItem";

const StyledText = styled(Text);

interface SetCardProps {
	index: number;
	weight: number;
	deleteMode?: boolean;
	className?: string;
	onChangeWeight: (newWeight: number) => void;
	onDelete: () => void;
	onEndEditing: () => void;
}

const weightArrayToLabelValue = (weights: number[]) =>
	weights.map((weight) => ({
		label: `${weight} kg`,
		value: weight,
	}));

export function SetCard({
	index,
	weight,
	className,
	onChangeWeight,
	onEndEditing,
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
				index={index}
				className={classNames(className)}
				onPress={() => onSelectableItemPress(index)}
				isSelected={isSelected}
			/>
		);
	}
	return (
		<RNPickerSelect
			onValueChange={onChangeWeight}
			placeholder={{}}
			items={weightArrayToLabelValue(DEFAULT_WEIGHTS)}
			value={weight}
			touchableWrapperProps={{ onLongPress: () => onLongPress(index) }}
			onClose={onEndEditing}
		>
			<SimpleSetCard
				weight={weight}
				index={index}
				className={className}
			/>
		</RNPickerSelect>
	);
}

interface SimpleSetCardProps
	extends Pick<SetCardProps, "className" | "weight" | "index"> {
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
				<View className="rounded-md" bg="$background025">
					<Text className="m-1">kg</Text>
				</View>
			</View>
			<View className="self-center">
				<H2>{weight}</H2>
			</View>
		</View>
	</Pressable>
);
