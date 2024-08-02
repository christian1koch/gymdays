import { Button, Icon, IconElement, Input, Text } from "@ui-kitten/components";
import { Href, Link } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { View } from "react-native";

const BackIcon = (props: any): IconElement => (
  <Icon {...props} name="arrow-back-outline" />
);

interface HeaderNavProps {
  title: string;
  href?: Href<string>;
  onChangeText?: (text: string) => void;
  isEditable?: boolean;
  onBlur?: () => void;
}

const StyledButton = styled(Button);
const StyledInput = styled(Input);

export default function HeaderNav({
  title,
  href,
  onChangeText,
  isEditable,
  onBlur,
}: HeaderNavProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const onInputBlur = () => {
    if (onBlur) {
      onBlur();
    }
    setIsEditingTitle(false);
  };
  return (
    <View className="items-center my-4">
      {isEditingTitle ? (
        <StyledInput
          autoFocus
          textStyle={{
            fontWeight: "800",
            fontSize: 25,
            textAlign: "center",
          }}
          onBlur={onInputBlur}
          value={title}
          onChangeText={onChangeText}
        />
      ) : (
        <Text
          onPress={() => {
            if (isEditable) {
              setIsEditingTitle(true);
            }
          }}
          category="h4"
        >
          {title}
        </Text>
      )}
      {href && !isEditingTitle && (
        <Link href={href} asChild>
          <StyledButton
            className="relative right-36 -top-8 rounded-full w-6 h-6 bg-slate-50"
            appearance="outline"
            accessoryLeft={BackIcon}
          />
        </Link>
      )}
    </View>
  );
}
