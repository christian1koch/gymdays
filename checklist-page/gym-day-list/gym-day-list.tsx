import { Card, Layout, List, Text, useTheme } from "@ui-kitten/components";
import { GymDayData } from "../data";
import {
  bulkNumberToWeightString,
  dateToYearMonthDay,
} from "../../libs/utils/utils";
import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
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
      <Text category="h4">{name}</Text>
      <StyledLayout
        className="rounded-full p-1 mx-2"
        style={{
          backgroundColor: theme["color-primary-500"],
        }}
      >
        <Text status="control" category="label">
          {dateToYearMonthDay(date)}
        </Text>
      </StyledLayout>
    </StyledLayout>
  );
};

const renderGymDay = ({ item, index }: { item: GymDayData; index: number }) => {
  console.log(item.id);
  return (
    <Link
      href={{
        pathname: "/gym-days/[id]",
        params: { id: item.id },
      }}
      asChild
    >
      <Card
        style={{ marginVertical: 4 }}
        header={<Header date={item.date} name={item.name} />}
      >
        <StyledLayout className="flex-row">
          <StyledLayout>
            {item.exercises.map((exercise, i) => (
              <Text category="p1" key={i}>
                {exercise.name}
              </Text>
            ))}
          </StyledLayout>
          <StyledLayout className="flex-1 items-end">
            {item.exercises.map((exercise, i) => (
              <Text key={i} category="p1">
                {bulkNumberToWeightString(exercise.weightsPerSet)}
              </Text>
            ))}
          </StyledLayout>
        </StyledLayout>
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
      <List className="h-5/6" data={gymDays} renderItem={renderGymDay} />
      <AddButton onPress={onPressInsert} />
    </View>
  );
}
