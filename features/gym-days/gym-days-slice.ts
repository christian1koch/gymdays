import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BasicExercise, GymDayData } from "../../checklist-page/data";

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
      state.gymDays.push(action.payload);
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
    updateSets: (
      state,
      action: PayloadAction<{
        gymDayId: number;
        exerciseId: number;
        weightsPerSet: number[];
      }>
    ) => {
      const gymDay = state.gymDays.find(
        (gymDay) => gymDay.id === action.payload.gymDayId
      );
      if (!gymDay) {
        return state;
      }
      const exercise = gymDay.exercises.find(
        (exercise) => exercise.id === action.payload.exerciseId
      );
      if (!exercise) {
        return state;
      }
      exercise.weightsPerSet = action.payload.weightsPerSet;
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
  updateSets,
} = gymDaysSlice.actions;

export default gymDaysSlice.reducer;
