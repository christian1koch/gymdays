import { createContext, useCallback, useContext, useState } from "react";

interface SelectableItemType {
	readonly onLongPress: (id: number) => void;
	readonly onSelectableItemPress: (id: number) => void;
	readonly setSelectModeOff: () => void;
	readonly selectModeOn: boolean;
	readonly selectedItemsArr: number[];
}

export function useSelectableItem(): SelectableItemType {
	const [selectedItems, setSelectedItems] = useState<number[]>();

	const onLongPress = useCallback((id: number) => {
		setSelectedItems([id]);
	}, []);

	const onSelectableItemPress = useCallback(
		(id: number) => {
			console.log(selectedItems, id, "done");
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

type SelectableItemContextType = SelectableItemType;

export const SelectableItemContext = createContext<SelectableItemType | null>(
	null
);

export const useSelectableItemContext = () => {
	const selectableItemContext = useContext(SelectableItemContext);

	if (!selectableItemContext) {
		throw new Error(
			"selectableItemContext has to be used within <SelectableItemContext.Provider>"
		);
	}

	return selectableItemContext;
};
