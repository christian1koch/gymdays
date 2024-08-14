import { useEffect, useState } from "react";
import {
	AutocompleteDropdown,
	AutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import SetList from "./set-list";
import AddButton from "../ui/add-button";
import { BasicExercise } from "./data";
import { createNewExerciseType, getExerciseTypes } from "../db/db";
import * as services from "@services";
import { View } from "tamagui";
import { useAppSelector } from "app/hooks";
import { selectLastExerciseFromExerciseTypeAfterCurrent } from "app/store";
import { Text } from "tamagui";
import { SimpleSetList } from "./gym-day/exercise-card";
import { PortalGate } from "libs/portal/PortalContext";

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
	deleteMode?: boolean;
}

export default function Exercise({ exercise, deleteMode }: ExerciseProps) {
	const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
	const { weightsPerSet: weights } = exercise;
	console.log("sets", weights);
	const exerciseItems = exerciseTypesToExerciseItems(exerciseTypes);
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
	const onBlurSave = async () => {
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

	const onDeleteSet = (newWeights: number[]) => {
		services.updateSets(exercise.gymDay, exercise.id, newWeights);
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

	return (
		<View className="flex-1" bg="$background025">
			<View className="flex-col items-center my-10 mx-6 h-28 justify-between">
				{selectedItem && <Text>Last Sets of {selectedItem?.id}: </Text>}
				{getSetInfo()}
				<AutocompleteDropdown
					inputContainerStyle={{ width: 300 }}
					key={exerciseTypes.length}
					clearOnFocus={false}
					closeOnBlur={true}
					closeOnSubmit={true}
					onSubmit={onBlurSave}
					onBlur={onBlurSave}
					initialValue={
						selectedItem || basicExerciseToExerciseItem(exercise)
					} // or just '2'
					onSelectItem={(item) => onSelectItem(item)}
					dataSet={exerciseItems}
					showClear={false}
					emptyResultText="Create new Exercise"
					onChangeText={setText}
					textInputProps={{
						enterKeyHint: "done",
					}}
				/>
			</View>
			<SetList
				key={"set-of" + exercise.id}
				sets={weights}
				onEndEditingUpdate={onWeightChange}
				deleteMode={deleteMode}
				onDeleteSet={onDeleteSet}
			/>
			<PortalGate name="footer" isEntry>
				<AddButton
					onPress={() => {
						services.addNewSet(exercise.gymDay, exercise.id, 20);
					}}
					text="Add new set"
				/>
			</PortalGate>
		</View>
	);
}
