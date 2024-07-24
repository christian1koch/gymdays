export interface BasicExercise {
  name: string;
  weightsPerSet: number[];
}

export interface GymDayData {
  name: string;
  date: Date;
  exercises: BasicExercise[];
}
export const exercisesMock: BasicExercise[] = [
  { name: "Dumbell Bench Press", weightsPerSet: [20, 25, 20, 20] },
  { name: "Barbel Bench Press", weightsPerSet: [20, 25, 20, 20] },
  { name: "Dumbell Shoulder Press", weightsPerSet: [20, 25, 20, 20] },
  { name: "Dumbell Curls", weightsPerSet: [10, 12, 10] },
];

export const gymDataMock = {
  name: "Chest Day",
  date: new Date(),
  exercises: exercisesMock,
};
