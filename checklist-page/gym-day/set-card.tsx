import { TextInputProps } from "react-native";
import { View, Input as TextInput, Button } from "tamagui";
import { Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import classNames from "classnames";
import { X } from "@tamagui/lucide-icons";

const StyledText = styled(Text);

interface SetCardProps extends TextInputProps {
  index: number;
  weight: number;
  deleteMode?: boolean;
  onDelete: () => void;
}

export function SetCard({
  index,
  weight,
  className,
  deleteMode,
  onDelete,
  ...rest
}: SetCardProps) {
  return (
    <View
      className={classNames(
        "w-40 h-40 rounded-2xl mt-24 flex-row justify-center gap-0",
        className
      )}
      backgroundColor={"$accentBackground"}
    >
      <View className="flex-row text-slate-200 absolute items-baseline justify-around w-full top-2">
        <StyledText category="s1" className="text-slate-200">
          Set {index}:
        </StyledText>
        <View className="rounded-md" bg="$background025">
          <StyledText category="c2" className="m-1">
            kg
          </StyledText>
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
        <TextInput
          {...rest}
          className="text-4xl font-medium"
          inputMode="decimal"
          bg="$background0"
          bw="$-0.25"
          col="$color1"
        >
          {weight}
        </TextInput>
      </View>
    </View>
  );
}
