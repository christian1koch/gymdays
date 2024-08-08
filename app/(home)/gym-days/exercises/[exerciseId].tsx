import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { BasicExercise } from "../../../../checklist-page/data";
import { useEffect, useState } from "react";
import { getExerciseById, getExerciseTypes } from "../../../../db/db";
import Exercise from "../../../../checklist-page/exercise";
import HeaderNav from "../../../../ui/header-nav";
import { useAppSelector } from "../../../hooks";

export default function Page() {
  const searchParams = useLocalSearchParams();
  const { gymDayId, exerciseId } = searchParams;
  const gymDays = useAppSelector((state) => state.gymDays.gymDays);
  const gymDay = gymDays.find((g) => g.id === Number(gymDayId));
  const exercise = gymDay?.exercises.find((e) => e.id === Number(exerciseId));
  // Move into the component
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
        menuItems={[{ title: "Test", onPress: () => console.log("pressed") }]}
      />
      <Exercise exercise={exercise} />
    </>
  );
}
