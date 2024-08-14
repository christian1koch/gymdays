import * as db from "@db";
import * as actions from "@actions/gymDays";
import { store } from "../store";

async function fetchAllGymDays() {
	const gymDays = await db.getGymDays();
	store.dispatch(actions.upsertGymDays(gymDays));
	return gymDays;
}

async function fetchGymDayById(gymDayId: number) {
	const gymDay = await db.getGymDayById(gymDayId);
	actions.addGymDay(gymDay);
	return gymDay;
}

async function createNewGymDay() {
	const gymDayId = await db.insertNewGymDay();
	const gymDay = await db.getGymDayById(gymDayId.insertedId);
	store.dispatch(actions.addGymDay(gymDay));
	return gymDay;
}

async function updateGymDayName(gymDayId: number, name: string) {
	await db.updateGymDayName(gymDayId, name);
	actions.renameGymDay({ gymDayId, name });
}

async function createNewExercise(gymDayId: number, name: string) {
	const newExercise = await db.createNewExercise(gymDayId, name);
	store.dispatch(
		actions.addExercise({
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
	store.dispatch(actions.renameExercise({ gymDayId, exerciseId, name }));
}

async function addNewSet(gymId: number, exerciseId: number, weight: number) {
	const exerciseWithNewSet = await db.createNewSet(exerciseId, weight);
	store.dispatch(
		actions.updateSets({
			gymDayId: gymId,
			exerciseId: exerciseId,
			weightsPerSet: exerciseWithNewSet.weightsPerSet,
		})
	);
	return exerciseWithNewSet;
}

async function updateSets(gymId: number, exerciseId: number, sets: number[]) {
	const exerciseWithNewSet = await db.updateSets(
		exerciseId,
		exerciseId,
		sets
	);
	store.dispatch(
		actions.updateSets({
			gymDayId: gymId,
			exerciseId: exerciseId,
			weightsPerSet: exerciseWithNewSet.weightsPerSet,
		})
	);
	return exerciseWithNewSet;
}

async function bulkDeleteExercises(gymId: number, exerciseIds: number[]) {
	await db.bulkDeleteExercises(exerciseIds);
	store.dispatch(
		actions.bulkDeleteExercises({ gymDayId: gymId, exerciseIds })
	);
}

async function renameGymDay(gymDayId: number, newName: string) {
	await db.updateGymDayName(gymDayId, newName);
	store.dispatch(actions.renameGymDay({ gymDayId, name: newName }));
}

async function bulkDeleteGymDays(gymDayIds: number[]) {
	await db.bulkDeleteGymDays(gymDayIds);
	store.dispatch(actions.bulkDeleteGymDays(gymDayIds));
}

export {
	fetchAllGymDays,
	fetchGymDayById,
	createNewGymDay,
	updateGymDayName,
	createNewExercise,
	updateExerciseName,
	addNewSet,
	updateSets,
	bulkDeleteExercises,
	renameGymDay,
	bulkDeleteGymDays,
};
