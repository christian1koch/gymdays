export interface BasicExercise {
	gymDay: number;
	id: number;
	name: string;
	sets: Set[];
}

export interface Set {
	id: number;
	weights: number;
	reps: number;
	exerciseId: number;
}

export interface GymDayData {
	id: number;
	name: string;
	date: string;
	exercises: BasicExercise[];
}
