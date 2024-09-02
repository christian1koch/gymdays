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
					await services.bulkDeleteSets(
						selectedItemsArr,
						exercise.id
					);
					setSelectModeOff();
				},
			},
		];
		return menuItems;
	};

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
			<Exercise exercise={exercise} />
			<Footer />
		</SelectableItemContext.Provider>
	);
}
