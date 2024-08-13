import { TextInputProps } from "react-native";
import { View, Text, Button, H2 } from "tamagui";
import { styled } from "nativewind";
import classNames from "classnames";
import RNPickerSelect from "react-native-picker-select";
import { X } from "@tamagui/lucide-icons";
import { DEFAULT_WEIGHTS } from "libs/utils/utils";

const StyledText = styled(Text);

interface SetCardProps {
  index: number;
  weight: number;
  deleteMode?: boolean;
  className?: string;
  onChangeWeight: (newWeight: number) => void;
  onDelete: () => void;
  onEndEditing: () => void;
}

const weightArrayToLabelValue = (weights: number[]) =>
  weights.map((weight) => ({
    label: `${weight} kg`,
    value: weight,
  }));

export function SetCard({
  index,
  weight,
  className,
  deleteMode,
  onDelete,
  onChangeWeight,
  onEndEditing,
}: SetCardProps) {
  return (
    <RNPickerSelect
      onValueChange={onChangeWeight}
      placeholder={{}}
      items={weightArrayToLabelValue(DEFAULT_WEIGHTS)}
      onDonePress={onEndEditing}
      value={weight}
    >
      <View
        className={classNames(
          "w-40 h-40 rounded-2xl mt-24 flex-row justify-center gap-0",
          className
        )}
        backgroundColor={"$accentBackground"}
      >
        <View className="flex-row text-slate-200 absolute items-baseline justify-around w-full top-2">
          <StyledText className="text-slate-200">Set {index}:</StyledText>
          <View className="rounded-md" bg="$background025">
            <Text className="m-1">kg</Text>
          </View>
        </View>
        {deleteMode && (
          <Button
            className="absolute rounded-full w-6 h-6 -right-0"
            backgroundColor={"$red8Dark"}
            size={"$2"}
            icon={<X color={"$color.red1Light"} size={"$1"} />}
            onPress={onDelete}
          />
        )}
        <View className="self-center">
          <H2>{weight}</H2>
        </View>
      </View>
    </RNPickerSelect>
  );
}
