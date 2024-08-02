import { BasicExercise, GymDayData } from "../checklist-page/data";
import { DBExercise, DBGymDay, DBGymDayWithExercises } from "./schema";

export function parseDBGymDay(dbGymDay: DBGymDayWithExercises): GymDayData {
  const exercises = dbGymDay.exercises.map((e) => parseDBExercise(e));
  const newGymDayData = {
    name: dbGymDay.name,
    date: new Date(dbGymDay.date),
    id: dbGymDay.id,
    exercises: [...exercises],
  };
  return newGymDayData;
}

export function parseDBExercise(dbExercise: DBExercise): BasicExercise {
  const newExercise: BasicExercise = {
    id: dbExercise.id,
    gymDay: dbExercise.gymDay,
    name: dbExercise.exerciseType,
    weightsPerSet: JSON.parse(dbExercise.weightsPerSet || "[]") as number[],
  };
  return newExercise;
}
