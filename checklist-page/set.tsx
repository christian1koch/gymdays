import { useEffect, useState } from "react";
import {
  AutocompleteDropdownItem,
  AutocompleteDropdown,
} from "react-native-autocomplete-dropdown";

const generateDefaultWeightItems = (): WeightItem[] => {
  const items: WeightItem[] = [];
  for (let i = 0; i < 100; i++) {
    items.push({ id: i.toString(), title: i.toString() });
  }
  return items;
};

const DEFAULT_WEIGHTS = generateDefaultWeightItems();

export interface WeightItem extends AutocompleteDropdownItem {}

interface SetProps {
  currentItem: string;
  onClear: () => void;
  onChangeWeight: (v: string) => void;
}

const Set: React.FC<SetProps> = ({ currentItem, onClear, onChangeWeight }) => {
  return (
    <AutocompleteDropdown
      containerStyle={{ marginRight: 5 }}
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      initialValue={DEFAULT_WEIGHTS.find((w) => w.title === currentItem)} // or just '2'
      dataSet={DEFAULT_WEIGHTS}
      onSelectItem={(w) => onChangeWeight(w?.title || "20")}
      showClear={false}
    
    />
  );
};

export default Set;
