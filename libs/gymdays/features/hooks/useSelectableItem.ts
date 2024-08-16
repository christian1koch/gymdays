import { useCallback, useState } from "react";

export function useSelectableItem() {
	const [selectedItems, setSelectedItems] = useState<number[]>();

	const onLongPress = useCallback((id: number) => {
		setSelectedItems([id]);
	}, []);

	const onSelectableItemPress = useCallback(
		(id: number) => {
			if (!selectedItems) {
				return;
			}
			if (!selectedItems.includes(id)) {
				return setSelectedItems([...selectedItems, id]);
			}
			const newSelectedItems = [...selectedItems];
			const idIndex = newSelectedItems.findIndex((ex) => ex === id);
			newSelectedItems.splice(idIndex, 1);
			return setSelectedItems(newSelectedItems);
		},
		[selectedItems]
	);

	const setSelectModeOff = useCallback(() => setSelectedItems(undefined), []);
	const selectedItemsArr = selectedItems ?? [];
	const selectModeOn = selectedItems != null;

	return {
		onLongPress,
		onSelectableItemPress,
		setSelectModeOff,
		selectModeOn,
		selectedItemsArr,
	} as const;
}
