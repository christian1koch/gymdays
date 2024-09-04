import React from "react";
import { Pressable, PressableProps } from "react-native";
import { View, SizableText } from "tamagui";
import { Set } from "@gymDays/types";
import { BasicCard } from "@ui/basic-card";

interface ExerciseCardProps extends PressableProps {
	name: string;
	sets: Set[];
	index: number;
	highlighted?: boolean;
	onLongPress?: () => void;
	onPress?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
	name,
	sets,
	index,
	highlighted,
	onLongPress,
	onPress,
}) => {
	return (
		<Pressable onLongPress={onLongPress} onPress={onPress}>
			<View
				bg={"$accentBackground"}
				borderColor={highlighted ? "$color" : "$colorTransparent"}
				className="rounded-xl overflow-hidden"
				borderWidth={highlighted ? "$1" : "$0"}
			>
				<View className="items-center justify-center my-1">
					<SizableText size={"$4"}>{name}</SizableText>
				</View>
				<View minHeight={64}>
					<HorizontalSetRenderer sets={sets} />
				</View>
			</View>
		</Pressable>
	);
};

export default ExerciseCard;

export const HorizontalSetRenderer = ({ sets }: { sets: Set[] }) => {
	return (
		<View className="flex-row flex-wrap gap-1">
			{sets.map((set, index) => {
				return (
					<BasicCard
						key={set.id}
						title={set.weights + "kg"}
						footer={set.reps + "x"}
					/>
				);
			})}
		</View>
	);
};
