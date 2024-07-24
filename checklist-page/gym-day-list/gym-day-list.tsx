import { Card, Layout, List, Text, useTheme } from "@ui-kitten/components";
import { BasicExercise, GymDayData } from "../data";
import {
  bulkNumberToWeightString,
  dateToYearMonthDay,
} from "../../libs/utils/utils";
import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
import Divider from "../../ui/divider";

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
  return (
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
  );
};
const StyledList = styled(List);
export default function GimDayList({ gymDays }: GimDayListProps) {
  return (
    <List
      style={{
        width: "100%",
        marginTop: 40,
      }}
      data={gymDays}
      renderItem={renderGymDay}
    />
  );
}
