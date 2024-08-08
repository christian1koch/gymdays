import * as db from "@db";
import {
  addGymDay,
  upsertGymDays,
  removeGymDay,
  renameGymDay,
  addExercise,
  removeExercise,
  renameExercise,
} from "../../features/gym-days/gym-days-slice";
import { store } from "../store";

async function fetchAllGymDays() {
  const gymDays = await db.getGymDays();
  store.dispatch(upsertGymDays(gymDays));
  return gymDays;
}

async function fetchGymDayById(gymDayId: number) {
  const gymDay = await db.getGymDayById(gymDayId);
  addGymDay(gymDay);
  return gymDay;
}

async function createNewGymDay() {
  const gymDayId = await db.insertNewGymDay();
  const gymDay = await db.getGymDayById(gymDayId.insertedId);
  addGymDay(gymDay);
  return gymDay;
}

async function updateGymDayName(gymDayId: number, name: string) {
  await db.updateGymDayName(gymDayId, name);
  renameGymDay({ gymDayId, name });
}

async function createNewExercise(gymDayId: number, name: string) {
  const newExercise = await db.createNewExercise(gymDayId, name);
  store.dispatch(
    addExercise({
      gymDayId,
      exercise: newExercise,
    })
  );

  return newExercise;
}

async function updateExerciseName(
  gymDayId: number,
  exerciseId: number,
  name: string
) {
  await db.updateExerciseName(exerciseId, name);
  store.dispatch(renameExercise({ gymDayId, exerciseId, name }));
}

export {
  fetchAllGymDays,
  fetchGymDayById,
  createNewGymDay,
  updateGymDayName,
  createNewExercise,
  updateExerciseName,
};
