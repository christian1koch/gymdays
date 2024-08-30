import { BasicExercise, GymDayData } from "@gymDays/types";
import { DBExerciseWithSets, DBGymDayWithExercises } from "./schema";

export function parseDBGymDay(dbGymDay: DBGymDayWithExercises): GymDayData {
	console.log("gym day", dbGymDay);
	const exercises = dbGymDay.exercises.map((e) => parseDBExercise(e));
	const newGymDayData = {
		name: dbGymDay.name,
		date: dbGymDay.date,
		id: dbGymDay.id,
		exercises: [...exercises],
	};
	return newGymDayData;
}

export function parseDBExercise(dbExercise: DBExerciseWithSets): BasicExercise {
	const newExercise: BasicExercise = {
		id: dbExercise.id,
		gymDay: dbExercise.gymDay,
		name: dbExercise.exerciseType,
		sets: dbExercise.sets,
	};
	return newExercise;
}
