import { useLocalSearchParams } from "expo-router";
import Exercise from "@gymDays/components/exercise/exercise";
import HeaderNav, { MenuItemProps } from "@ui/header-nav";
import { useAppSelector } from "../../../hooks";
import { Footer } from "@gymDays/components/shared/footer";
import { useState } from "react";
import {
	SelectableItemContext,
	useSelectableItem,
} from "@gymDays/hooks/useSelectableItem";

import * as services from "@gymDays/services";

export default function Page() {
	const searchParams = useLocalSearchParams();
	const { gymDayId, exerciseId } = searchParams;
	const gymDays = useAppSelector((state) => state.gymDays.gymDays);
	const gymDay = gymDays.find((g) => g.id === Number(gymDayId));
	const exercise = gymDay?.exercises.find((e) => e.id === Number(exerciseId));

	const selectableItemProps = useSelectableItem();

	const { selectModeOn, setSelectModeOff, selectedItemsArr } =
		selectableItemProps;

	const getSelectedItemsToWeights = () => {
		if (!exercise) {
			return [];
		}
		const newWeightsWithNull: (number | null)[] = [
			...exercise.weightsPerSet,
		];
		for (const indexValue of selectedItemsArr) {
			newWeightsWithNull[indexValue] = null;
		}
		const newWeights: number[] = newWeightsWithNull.filter(
			(v) => v != null
		);
		return newWeights;
	};

	const getMenuItems = () => {
		if (!selectModeOn) {
			return null;
		}
		const menuItems: MenuItemProps[] = [
			{
				title: "Stop Selecting",
				onPress: () => {
					setSelectModeOff();
				},
			},
			{
				title: "Delete",
				onPress: async () => {
					if (!exercise) {
						return null;
					}
					await services.updateSets(
						exercise.gymDay,
						exercise.id,
						getSelectedItemsToWeights()
					);
					setSelectModeOff();
				},
			},
		];
		return menuItems;
	};
	const [deleteMode, setDeleteMode] = useState(false);

	if (!exercise) {
		return null;
	}
	return (
		<SelectableItemContext.Provider value={selectableItemProps}>
			<HeaderNav
				title="Edit Exercise"
				href={{
					pathname: "/gym-days/[id]",
					params: { id: exercise.gymDay },
				}}
				menuItems={getMenuItems()}
			/>
			<Exercise exercise={exercise} deleteMode={deleteMode} />
			<Footer />
		</SelectableItemContext.Provider>
	);
}
