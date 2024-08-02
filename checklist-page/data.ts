export interface BasicExercise {
  gymDay: number;
  id: number;
  name: string;
  weightsPerSet: number[];
}

export interface GymDayData {
  id: number;
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
const gymDataMock2: GymDayData = {
  name: "Leg Day",
  date: new Date(),
  exercises: [
    { name: "Squats", weightsPerSet: [50, 60, 70, 80] },
    { name: "Lunges", weightsPerSet: [20, 25, 20, 20] },
    { name: "Leg Press", weightsPerSet: [100, 120, 100, 100] },
  ],
};

const gymDataMock3: GymDayData = {
  name: "Back Day",
  date: new Date(),
  exercises: [
    { name: "Deadlifts", weightsPerSet: [60, 70, 80, 90] },
    { name: "Rows", weightsPerSet: [40, 45, 40, 40] },
  ],
};

const gymDataMock4: GymDayData = {
  name: "Arm Day",
  date: new Date(),
  exercises: [
    { name: "Bicep Curls", weightsPerSet: [15, 20, 15, 15] },
    { name: "Hammer Curls", weightsPerSet: [10, 12, 10] },
  ],
};

export const gymDataMocks = [
  gymDataMock,
  gymDataMock2,
  gymDataMock3,
  gymDataMock4,
];
export const newExerciseMock: BasicExercise = {
  name: "Barbel Bench Press",
  weightsPerSet: [20, 25, 20, 20],
};
