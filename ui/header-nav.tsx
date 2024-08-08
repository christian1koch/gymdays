import { ListItem, Popover, Button as TamaguiButton } from "tamagui";
import { MoreHorizontal, Star } from "@tamagui/lucide-icons";
import {
  Button,
  Icon,
  IconElement,
  Input,
  MenuItem,
  OverflowMenu,
  Text,
} from "@ui-kitten/components";
import { Href, Link } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { View } from "react-native";
import { Adapt } from "tamagui";

const BackIcon = (props: any): IconElement => (
  <Icon {...props} name="arrow-back-outline" />
);
const ThreeDots = (props: any): IconElement => (
  <Icon {...props} name="more-horizontal-outline" />
);

interface MenuItemProps {
  title: string;
  onPress: () => void;
}

interface HeaderNavProps {
  title: string;
  href?: Href<string>;
  onChangeText?: (text: string) => void;
  isEditable?: boolean;
  onBlur?: () => void;
  menuItems?: MenuItemProps[];
}

const StyledButton = styled(Button);
const StyledInput = styled(Input);

export default function HeaderNav({
  title,
  href,
  onChangeText,
  isEditable,
  onBlur,
  menuItems,
}: HeaderNavProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const onInputBlur = () => {
    if (onBlur) {
      onBlur();
    }
    setIsEditingTitle(false);
  };
  return (
    <View className="items-center justify-center flex-row my-4">
      {href && !isEditingTitle && (
        <Link href={href} asChild>
          <StyledButton
            className="absolute right-80 rounded-full w-6 h-6 bg-slate-50"
            appearance="outline"
            accessoryLeft={BackIcon}
          />
        </Link>
      )}
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
      {menuItems && menuItems.length > 0 && <OptionsMenu2 />}
    </View>
  );
}

const StyledMenuItem = styled(MenuItem);

const OptionsMenu = ({ menuItems }: { menuItems: MenuItemProps[] }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const renderToggleButton = () => (
    <StyledButton
      className="absolute left-12 -top-5 rounded-full w-6 h-6 bg-slate-50"
      appearance="outline"
      accessoryLeft={ThreeDots}
      onPress={() => setIsMenuVisible(true)}
    />
  );

  return (
    <OverflowMenu
      visible={isMenuVisible}
      anchor={renderToggleButton}
      onBackdropPress={() => setIsMenuVisible(false)}
    >
      <>
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.title}
            title={menuItem.title}
            onPress={menuItem.onPress}
          />
        ))}
      </>
    </OverflowMenu>
  );
};

const OptionsMenu2 = () => {
  return (
    <Popover placement="bottom-start" size={"$5"}>
      <Popover.Trigger asChild>
        <TamaguiButton icon={MoreHorizontal}></TamaguiButton>
      </Popover.Trigger>

      <Popover.Content
        padding="$1"
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow />
        {<TamaguiButton>Delete Set</TamaguiButton>}
        <Popover.Close />
        {/* ScrollView is optional, can just put any contents inside if not scrollable */}
        {/* ... */}
      </Popover.Content>
    </Popover>
  );
};
