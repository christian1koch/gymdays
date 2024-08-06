import { View, ViewProps } from "react-native";
import { Text } from "@ui-kitten/components";
import { styled } from "nativewind";
import classNames from "classnames";

const StyledText = styled(Text);

interface SetCardProps extends ViewProps {
  index: number;
  weight: number;
}

export function SetCard({ index, weight, className, ...rest }: SetCardProps) {
  return (
    <View
      {...rest}
      className={classNames(
        "bg-slate-900 w-40 h-40 rounded-2xl mt-24 flex-row justify-center",
        className
      )}
    >
      <View className="flex-row text-slate-200 absolute items-baseline justify-around w-full top-2">
        <StyledText category="s1" className="text-slate-200">
          Set {index}:
        </StyledText>
        <View className="bg-slate-400 rounded-md">
          <StyledText category="c2" className="m-1">
            kg
          </StyledText>
        </View>
      </View>
      <View className="self-center">
        <StyledText className="text-slate-200 text-4xl font-medium">
          {weight}
        </StyledText>
      </View>
    </View>
  );
}
