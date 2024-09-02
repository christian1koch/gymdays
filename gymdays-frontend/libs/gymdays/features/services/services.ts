import * as db from "@gymDays/db";
import * as actions from "@gymDays/actions";
import { store } from "../../../../app/store";

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

async function addNewSet(exerciseId: number, weight: number, reps: number) {
	const newSet = await db.createNewSet(exerciseId, weight, reps);
	if (!newSet) {
		return;
	}

	store.dispatch(
		actions.addNewSet({
			exerciseId: exerciseId,
			set: newSet,
		})
	);
	return newSet;
}

async function updateSet(
	exerciseId: number,
	setId: number,
	weight: number,
	reps: number
) {
	const exerciseWithNewSet = await db.updateSet(setId, weight, reps);
	store.dispatch(
		actions.updateSet({
			exerciseId,
			setId,
			weight,
			reps,
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

async function bulkDeleteSets(setIds: number[], exerciseId: number) {
	await db.bulkDeleteSets(setIds);
	store.dispatch(actions.bulkDeleteSets({ setIds, exerciseId }));
}

export {
	fetchAllGymDays,
	fetchGymDayById,
	createNewGymDay,
	updateGymDayName,
	createNewExercise,
	updateExerciseName,
	addNewSet,
	updateSet,
	bulkDeleteSets,
	bulkDeleteExercises,
	renameGymDay,
	bulkDeleteGymDays,
};
