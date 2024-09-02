import React from "react";
import { FlatList, Pressable, PressableProps } from "react-native";
import Divider from "@ui/divider";
import { View, Paragraph, SizableText } from "tamagui";
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
		<View
			bg={"$accentBackground"}
			borderColor={highlighted ? "$color" : "$colorTransparent"}
			className="rounded-xl overflow-hidden"
			borderWidth={highlighted ? "$1" : "$0"}
		>
			<Pressable onLongPress={onLongPress} onPress={onPress}>
				<View className="items-center justify-center my-1">
					<SizableText size={"$4"}>{name}</SizableText>
				</View>
			</Pressable>
			<View minHeight={64}>
				<HorizontalSetRenderer sets={sets} />
			</View>
		</View>
	);
};

export default ExerciseCard;

export const HorizontalSetRenderer = ({ sets }: { sets: Set[] }) => {
	return (
		<View>
			<FlatList
				data={sets}
				horizontal
				keyExtractor={(item) => "" + item.id}
				renderItem={({ item: set, index }) => {
					return (
						<BasicCard
							key={set.id}
							className={index < sets.length - 1 ? " mr-1 " : ""}
							title={set.weights + "kg"}
							footer={set.reps + "x"}
						/>
					);
				}}
			/>
		</View>
	);
};
