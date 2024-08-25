import { useEffect, useMemo, useState } from "react";
import {
	AutocompleteDropdown,
	AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddButton from "@ui/add-button";
import { BasicExercise } from "../../types";
import { createNewExerciseType, getExerciseTypes } from "@gymDays/db";
import * as services from "libs/gymdays/features/services/services";
import { Button, SizableText, View } from "tamagui";
import { useAppSelector } from "app/hooks";
import { selectLastExerciseFromExerciseTypeAfterCurrent } from "app/store";
import { Text } from "tamagui";
import { SimpleSetList } from "../gym-day/exercise-card";
import { PortalGate } from "libs/utils/portal/PortalContext";
import { getArrayLastElement } from "@utils/utils";
import { Plus } from "@tamagui/lucide-icons";

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

export default function Exercise({ exercise }: ExerciseProps) {
	const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
	const { weightsPerSet: weights } = exercise;

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

	const onWeightChange = (weights: number[]) => {
		services.updateSets(exercise.gymDay, exercise.id, weights);
	};

	const firstTimeExerciseText = "Your First time doing " + selectedItem?.id;

	const getSetInfo = () => {
		if (!lastExerciseOfType) {
			return <Text>{firstTimeExerciseText}</Text>;
		}
		if (lastExerciseOfType.weightsPerSet.length <= 0) {
			return <Text>{firstTimeExerciseText}</Text>;
		}
		return <SimpleSetList sets={lastExerciseOfType?.weightsPerSet ?? []} />;
	};

	const getNewDefaultWeight = () => {
		if (weights.length > 0) {
			return getArrayLastElement(weights);
		}
		if (lastExerciseOfType && lastExerciseOfType.weightsPerSet.length > 0) {
			const { weightsPerSet } = lastExerciseOfType;
			return getArrayLastElement(weightsPerSet);
		}
		return DEFAULT_SET_WEIGHT;
	};

	return (
		<View className="flex-1" bg="$background025">
			<View className="flex-col items-center my-10 mx-6 h-28 justify-between">
				{selectedItem && <Text>Last Sets of {selectedItem?.id}: </Text>}
				{getSetInfo()}
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
			<SetList
				key={"set-of" + exercise.id}
				sets={weights}
				onEndEditingUpdate={onWeightChange}
			/>
			<PortalGate name="footer" isEntry>
				<AddButton
					onPress={() => {
						services.addNewSet(
							exercise.gymDay,
							exercise.id,
							getNewDefaultWeight()
						);
					}}
					text="Add new set"
				/>
			</PortalGate>
		</View>
	);
}
