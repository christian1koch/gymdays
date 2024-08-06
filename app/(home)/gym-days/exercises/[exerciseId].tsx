import { useLocalSearchParams } from "expo-router";
import { BasicExercise } from "../../../../checklist-page/data";
import { useEffect, useState } from "react";
import { getExerciseById } from "../../../../db/db";
import Exercise from "../../../../checklist-page/exercise";
import HeaderNav from "../../../../ui/header-nav";

export default function Page() {
  const { exerciseId } = useLocalSearchParams();
  const [exercise, setExercise] = useState<BasicExercise>();
  // const [isLoading, setIsLoading] = useState(true);
  console.log("page rendered");
  useEffect(() => {
    const fetchExercise = async () => {
      // setIsLoading(true);
      const newExercise = await getExerciseById(Number(exerciseId));
      setExercise(newExercise);
      // setIsLoading(false);
    };
    fetchExercise();
  }, [exerciseId]);
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  if (!exercise) {
    return null;
  }
  return (
    <>
      <HeaderNav
        title="Edit Exercise"
        href={{
          pathname: "/gym-days/[id]",
          params: { id: exercise.gymDay },
        }}
      />
      <Exercise exercise={exercise} />
    </>
  );
}
