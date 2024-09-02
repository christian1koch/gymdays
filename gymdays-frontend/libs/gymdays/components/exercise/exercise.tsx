import { useEffect, useMemo, useState } from "react";
import {
	AutocompleteDropdown,
	AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddButton from "@ui/add-button";
import { BasicExercise, Set } from "../../types";
import { createNewExerciseType, getExerciseTypes } from "@gymDays/db";
import * as services from "libs/gymdays/features/services/services";
import { Button, Paragraph, SizableText, View } from "tamagui";
import { useAppSelector } from "app/hooks";
import { selectLastExerciseFromExerciseTypeAfterCurrent } from "app/store";
import { Text } from "tamagui";

import { PortalGate } from "libs/utils/portal/PortalContext";
import { getArrayLastElement } from "@utils/utils";
import { Plus } from "@tamagui/lucide-icons";
import { HorizontalList } from "@ui/horizontal-list";

interface ExerciseItem extends AutocompleteDropdownItem {}

function basicExerciseToExerciseItem(exercise: BasicExercise): ExerciseItem {
	return {
		id: "" + exercise.name,
		title: exercise.name,
	};
}

function exerciseTypesToExerciseItems(exerciseTypes: string[]): ExerciseItem[] {
	return exerciseTypes.map((type) => ({
		id: type,
		title: type,
	}));
}

interface ExerciseProps {
	exercise: BasicExercise;
}

const DEFAULT_SET_WEIGHT = 20;
const DEFAULT_SET_REPS = 10;

export default function Exercise({ exercise }: ExerciseProps) {
	const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
	const { sets } = exercise;

	const exerciseItems = useMemo(
		() => exerciseTypesToExerciseItems(exerciseTypes),
		[exerciseTypes]
	);
	const [selectedItem, setSelectedItem] = useState<ExerciseItem | null>(
		basicExerciseToExerciseItem(exercise)
	);
	const lastExerciseOfType = useAppSelector((state) =>
		selectLastExerciseFromExerciseTypeAfterCurrent(
			state,
			selectedItem?.id ?? "",
			exercise.id
		)
	);
	const [text, setText] = useState("");
	const onCreateExercise = async () => {
		if (text && !exerciseTypes.includes(text)) {
			const newExerciseTypes = [...exerciseTypes, text];
			setExerciseTypes(newExerciseTypes);
			setSelectedItem({ id: text, title: text });
			await createNewExerciseType(text);
		}
	};

	const onSelectItem = async (item: ExerciseItem | null) => {
		setSelectedItem(item);
		if (!item) {
			return;
		}
		if (item.title && item.title !== exercise.name) {
			await services.updateExerciseName(
				exercise.gymDay,
				exercise.id,
				item.title
			);
		}
	};

	useEffect(() => {
		const fetchExerciseTypes = async () => {
			const types = await getExerciseTypes();
			setExerciseTypes(types);
		};
		fetchExerciseTypes();
	}, []);

	const firstTimeExerciseText = "Your First time doing " + selectedItem?.id;

	const getSetInfo = () => {
		if (!lastExerciseOfType) {
			return <Text>{firstTimeExerciseText}</Text>;
		}
		if (lastExerciseOfType.sets.length <= 0) {
			return <Text>{firstTimeExerciseText}</Text>;
		}
		return (
			<HorizontalList
				list={lastExerciseOfType.sets.map((s) => (
					<View className="flex-row items-baseline content-baseline">
						<View
							bg={"$accentColor"}
							className="rounded-lg items-center justify-center"
						>
							<Paragraph className="m-1">
								{s.weights + "kg"}{" "}
							</Paragraph>
						</View>
						<Paragraph bg={"$black05"}> x{s.reps}</Paragraph>
					</View>
				))}
			/>
		);
	};

	const getNewDefaultWeight = () => {
		if (sets.length > 0) {
			const { weights } = getArrayLastElement(sets);
			return weights;
		}
		if (lastExerciseOfType && lastExerciseOfType.sets.length > 0) {
			const { sets } = lastExerciseOfType;
			const { weights } = getArrayLastElement(sets);
			return weights;
		}
		return DEFAULT_SET_WEIGHT;
	};

	const getNewDefaultSetValues = () => {
		const defaultValues = {
			weight: DEFAULT_SET_WEIGHT,
			reps: DEFAULT_SET_REPS,
		};
		if (lastExerciseOfType && lastExerciseOfType.sets.length > 0) {
			const { sets: setsOfLastExercise } = lastExerciseOfType;
			const { weights, reps } = getArrayLastElement(setsOfLastExercise);
			defaultValues.weight = weights;
			defaultValues.reps = reps;
		}
		if (sets.length > 0) {
			const { weights, reps } = getArrayLastElement(sets);
			defaultValues.weight = weights;
			defaultValues.reps = reps;
		}
		return defaultValues;
	};

	return (
		<View className="flex-1" bg="$background025">
			<View className="flex-col items-center my-10 mx-6 h-28 justify-between">
				{selectedItem && <Text>Last Sets of {selectedItem?.id}: </Text>}
				<View className="my-2">{getSetInfo()}</View>
				<AutocompleteDropdown
					inputContainerStyle={{ width: 300 }}
					key={exerciseTypes.length}
					clearOnFocus={true}
					closeOnBlur={true}
					closeOnSubmit={true}
					initialValue={
						selectedItem || basicExerciseToExerciseItem(exercise)
					}
					onSelectItem={(item) => onSelectItem(item)}
					dataSet={exerciseItems}
					showClear={false}
					emptyResultText="Create new Exercise"
					onChangeText={setText}
					textInputProps={{
						enterKeyHint: "done",
					}}
					EmptyResultComponent={
						<View className="flex-row items-center">
							<SizableText
								className="flex-1 text-center"
								size="$5"
							>
								Add new Exercise
							</SizableText>
							<Button
								onPress={onCreateExercise}
								theme="accent"
								icon={Plus}
							/>
						</View>
					}
				/>
			</View>
			<SetList key={"set-of" + exercise.id} sets={sets} />
			<PortalGate name="footer" isEntry>
				<AddButton
					onPress={() => {
						const { weight, reps } = getNewDefaultSetValues();
						services.addNewSet(exercise.id, weight, reps);
					}}
					text="Add new set"
				/>
			</PortalGate>
		</View>
	);
}
