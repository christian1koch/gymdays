import { configureStore, createSelector } from "@reduxjs/toolkit";
import gymDaysReducer from "../features/gym-days/gym-days-slice";

export const store = configureStore({
  reducer: { gymDays: gymDaysReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const selectGymDays = (state: RootState) => state.gymDays.gymDays;

export const selectGymDaysSortedByDate = createSelector(
  [selectGymDays],
  (gymDays) => {
    const sortedGymDays = [...gymDays];

    return sortedGymDays
      .sort((a, b) => {
        const res = new Date(a.date).getTime() - new Date(b.date).getTime();
        return res;
      })
      .reverse();
  }
);

const selectExerciseType = (state: RootState, exerciseType: string) =>
  exerciseType;
const selectExerciseId = (
  state: RootState,
  exerciseType: string,
  exerciseId: number
) => exerciseId;

export const selectLastExerciseFromExerciseTypeAfterCurrent = createSelector(
  [selectGymDaysSortedByDate, selectExerciseType, selectExerciseId],
  (gymDays, exerciseType, exerciseId) => {
    for (const gymDay of gymDays) {
      for (const exercise of gymDay.exercises) {
        const isLastExercise =
          exerciseType === exercise.name &&
          exercise.weightsPerSet.length > 0 &&
          exercise.id !== exerciseId;
        if (isLastExercise) {
          return exercise;
        }
      }
    }
  }
);

export const selectTodaysGymDay = createSelector(
  [selectGymDaysSortedByDate],
  (gymDays) => {
    const todaysGymDay = gymDays.find((gymDay) => {
      const today = new Date();
      const gymDayDate = new Date(gymDay.date);
      return (
        today.getDate() === gymDayDate.getDate() &&
        today.getMonth() === gymDayDate.getMonth() &&
        today.getFullYear() === gymDayDate.getFullYear()
      );
    });
    return todaysGymDay;
  }
);
