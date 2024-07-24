import { BasicExercise, GymDayData } from "../data";
import { View, Pressable, FlatList } from "react-native";
import { dateToYearMonthDay } from "../../libs/utils/utils";
import { styled } from "nativewind";
import ExerciseCard from "./exercise-card";
import Divider from "../../ui/divider";
import { Button, Icon, Text } from "@ui-kitten/components";

interface GymDayProps extends GymDayData {}

const renderExercise = ({
  item,
  index,
}: {
  item: BasicExercise;
  index: number;
}) => {
  return (
    <ExerciseCard
      key={index}
      name={item.name}
      sets={item.weightsPerSet}
      index={index}
    />
  );
};

const StyledText = styled(Text);

const PlusIcon = (props: any) => <Icon name="plus" {...props} />;

const GymDay: React.FC<GymDayProps> = ({ name, date, exercises }) => {
  return (
    <View className="w-full h-full mt-40 px-5">
      <View>
        <StyledText category="h2">{name}</StyledText>
        <StyledText className="text-base" appearance="hint">
          {dateToYearMonthDay(date)}
        </StyledText>
        <Divider className="my-5" horizonal />
        <FlatList
          className="h-[450]"
          renderItem={renderExercise}
          data={exercises}
        />
        <View className="mt-16">
          <Button accessoryLeft={PlusIcon}></Button>
        </View>
      </View>
    </View>
  );
};

export default GymDay;
