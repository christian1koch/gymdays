export interface BasicExercise {
  gymDay: number;
  id: number;
  name: string;
  weightsPerSet: number[];
}

export interface GymDayData {
  id: number;
  name: string;
  date: string;
  exercises: BasicExercise[];
}
