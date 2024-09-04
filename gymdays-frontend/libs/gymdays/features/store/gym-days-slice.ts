import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasicExercise, GymDayData, Set } from "@gymDays/types";

export interface GymDaysState {
	gymDays: GymDayData[];
}

const initialState: GymDaysState = {
	gymDays: [],
};

export const gymDaysSlice = createSlice({
	name: "gymDays",
	initialState,
	reducers: {
		addGymDay: (state, action: PayloadAction<GymDayData>) => {
			state.gymDays.unshift(action.payload);
		},
		upsertGymDays: (state, action: PayloadAction<GymDayData[]>) => {
			state.gymDays = action.payload;
		},
		removeGymDay: (state, action: PayloadAction<number>) => {
			state.gymDays = state.gymDays.filter(
				(gymDay) => gymDay.id !== action.payload
			);
		},
		renameGymDay: (
			state,
			action: PayloadAction<{ gymDayId: number; name: string }>
		) => {
			const gymDay = state.gymDays.find(
				(gymDay) => gymDay.id === action.payload.gymDayId
			);
			if (gymDay) {
				gymDay.name = action.payload.name;
			}
		},
		addExercise: (
			state,
			action: PayloadAction<{ gymDayId: number; exercise: BasicExercise }>
		) => {
			const gymDay = state.gymDays.find(
				(gymDay) => gymDay.id === action.payload.gymDayId
			);
			if (gymDay) {
				gymDay.exercises.push(action.payload.exercise);
			}
		},
		addNewSet: (
			state,
			action: PayloadAction<{
				exerciseId: number;
				set: Set;
			}>
		) => {
			const gymDay = state.gymDays.find((gymDay) =>
				gymDay.exercises.find(
					(exercise) => exercise.id === action.payload.exerciseId
				)
			);
			const exercise = gymDay?.exercises.find(
				(exercise) => exercise.id === action.payload.exerciseId
			);
			if (exercise) {
				exercise.sets.push(action.payload.set);
			}
		},
		updateSet: (
			state,
			action: PayloadAction<{
				exerciseId: number;
				setId: number;
				weight: number;
				reps: number;
			}>
		) => {
			const gymDay = state.gymDays.find((gymDay) =>
				gymDay.exercises.find(
					(exercise) => exercise.id === action.payload.exerciseId
				)
			);
			const exercise = gymDay?.exercises.find(
				(exercise) => exercise.id === action.payload.exerciseId
			);
			const set = exercise?.sets.find(
				(s) => s.id === action.payload.setId
			);
			if (set) {
				set.reps = action.payload.reps;
				set.weights = action.payload.weight;
			}
		},
		removeSet: (
			state,
			action: PayloadAction<{
				exerciseId: number;
				setId: number;
			}>
		) => {
			const gymDay = state.gymDays.find((gymDay) =>
				gymDay.exercises.find(
					(exercise) => exercise.id === action.payload.exerciseId
				)
			);
			const exercise = gymDay?.exercises.find(
				(exercise) => exercise.id === action.payload.exerciseId
			);
			if (exercise) {
				exercise.sets = exercise?.sets.filter(
					(s) => s.id !== action.payload.setId
				);
			}
		},
		removeExercise: (
			state,
			action: PayloadAction<{ gymDayId: number; exerciseId: number }>
		) => {
			const gymDay = state.gymDays.find(
				(gymDay) => gymDay.id === action.payload.gymDayId
			);
			if (gymDay) {
				gymDay.exercises = gymDay.exercises.filter(
					(exercise) => exercise.id !== action.payload.exerciseId
				);
			}
		},
		renameExercise: (
			state,
			action: PayloadAction<{
				gymDayId: number;
				exerciseId: number;
				name: string;
			}>
		) => {
			const gymDay = state.gymDays.find(
				(gymDay) => gymDay.id === action.payload.gymDayId
			);
			if (gymDay) {
				const exercise = gymDay.exercises.find(
					(exercise) => exercise.id === action.payload.exerciseId
				);
				if (exercise) {
					exercise.name = action.payload.name;
				}
			}
		},
		bulkDeleteExercises: (
			state,
			action: PayloadAction<{
				gymDayId: number;
				exerciseIds: number[];
			}>
		) => {
			const gymDay = state.gymDays.find(
				(gymDay) => gymDay.id === action.payload.gymDayId
			);
			if (gymDay) {
				gymDay.exercises = gymDay.exercises.filter(
					(exercise) =>
						!action.payload.exerciseIds.includes(exercise.id)
				);
			}
		},
		bulkDeleteGymDays: (state, action: PayloadAction<number[]>) => {
			state.gymDays = state.gymDays.filter(
				(gymDay) => !action.payload.includes(gymDay.id)
			);
		},
		bulkDeleteSets: (
			state,
			action: PayloadAction<{
				setIds: number[];
				exerciseId: number;
			}>
		) => {
			const gymDay = state.gymDays.find((gymDay) =>
				gymDay.exercises.find(
					(exercise) => exercise.id === action.payload.exerciseId
				)
			);
			const exercise = gymDay?.exercises.find(
				(exercise) => exercise.id === action.payload.exerciseId
			);
			if (exercise) {
				exercise.sets = exercise?.sets.filter(
					(s) => !action.payload.setIds.includes(s.id)
				);
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addGymDay,
	upsertGymDays,
	removeGymDay,
	renameGymDay,
	addExercise,
	removeExercise,
	renameExercise,
	addNewSet,
	removeSet,
	updateSet,
	bulkDeleteSets,
	bulkDeleteExercises,
	bulkDeleteGymDays,
} = gymDaysSlice.actions;

export default gymDaysSlice.reducer;
