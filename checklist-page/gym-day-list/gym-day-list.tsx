import { Layout, List, useTheme } from "@ui-kitten/components";
import { GymDayData } from "../data";
import {
  Button,
  Card,
  CardHeader,
  H3,
  H4,
  Paragraph,
  Text,
  View,
  XStack,
} from "tamagui";
import {
  bulkNumberToWeightString,
  dateToYearMonthDay,
} from "../../libs/utils/utils";
import { styled } from "tamagui";
import { ViewProps } from "react-native";
import { Link } from "expo-router";
import AddButton from "../../ui/add-button";
import HeaderNav from "../../ui/header-nav";
import { insertNewGymDay } from "../../db/db";
import { router } from "expo-router";
interface GimDayListProps {
  gymDays: GymDayData[];
}

interface HeaderProps extends ViewProps {
  date: Date;
  name: string;
}
const StyledLayout = styled(Layout);

const Header = ({ date, name, ...viewProps }: HeaderProps) => {
  const theme = useTheme();
  return (
    <StyledLayout
      {...viewProps}
      className="flex-row items-center justify-between"
    >
      <H3>{name}</H3>
      <StyledLayout
        className="rounded-full p-1 mx-2"
        style={{
          backgroundColor: theme["color-primary-500"],
        }}
      >
        <Paragraph>{dateToYearMonthDay(new Date(date))}</Paragraph>
      </StyledLayout>
    </StyledLayout>
  );
};

const renderGymDay = ({ item, index }: { item: GymDayData; index: number }) => {
  return (
    <Link
      href={{
        pathname: "/gym-days/[id]",
        params: { id: item.id },
      }}
      asChild
    >
      <Card className="mb-3">
        <Card.Header>
          <Header date={new Date(item.date)} name={item.name} />
        </Card.Header>

        <View className="flex-row p-6">
          <View>
            {item.exercises.map((exercise, i) => (
              <Paragraph key={i}>{exercise.name}</Paragraph>
            ))}
          </View>
          <View className="flex-1 items-end">
            {item.exercises.map((exercise, i) => (
              <Paragraph key={i}>
                {bulkNumberToWeightString(exercise.weightsPerSet)}
              </Paragraph>
            ))}
          </View>
        </View>
      </Card>
    </Link>
  );
};
const StyledList = styled(List);
export default function GimDayList({ gymDays }: GimDayListProps) {
  const onPressInsert = async () => {
    const res = await insertNewGymDay();
    router.replace({
      pathname: "/gym-days/[id]",
      params: { id: res.insertedId },
    });
  };
  return (
    <View className="w-full h-full">
      <HeaderNav title="Gym Days" />
      <List
        style={{ backgroundColor: "transparent" }}
        className="h-5/6"
        data={gymDays}
        renderItem={renderGymDay}
      />
      <AddButton onPress={onPressInsert} />
    </View>
  );
}
