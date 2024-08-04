import { useLocalSearchParams } from "expo-router";
import { BasicExercise } from "../../../checklist-page/data";
import { useEffect, useState } from "react";
import { getExerciseById } from "../../../db/db";
import Exercise from "../../../checklist-page/exercise";

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
  }, []);
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  if (!exercise) {
    return null;
  }
  return <Exercise />;
}
