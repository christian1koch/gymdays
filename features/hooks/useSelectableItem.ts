import { useState } from "react";

export function useSelectableItem() {
  const [selectedItems, setSelectedItems] = useState<number[]>();

  const onLongPress = (id: number) => {
    setSelectedItems([id]);
  };

  const onSelectableItemPress = (id: number) => {
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
  };

  const setSelectModeOff = () => setSelectedItems(undefined);
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
