import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { exercise, exerciseType, gymDay } from "./schema";
import { eq, inArray } from "drizzle-orm";
import * as schema from "./schema";
import { parseDBExercise, parseDBGymDay } from "./helper";
import { dateToYearMonthDay } from "@utils/utils";

const dbName = __DEV__
	? process.env.EXPO_PUBLIC_DEV_DB_NAME
	: process.env.EXPO_PUBLIC_PROD_DB_NAME;

if (!dbName) {
	throw new Error("DB name not found");
}

export const getDB = async () => {
	const expo = await SQLite.openDatabaseAsync(dbName);
	const db = drizzle(expo, { schema: { ...schema } });
	return db;
};

export const getDBAndConnection = async () => {
	const expo = await SQLite.openDatabaseAsync(dbName);
	const db = drizzle(expo, { schema: { ...schema } });
	return { db, connection: expo };
};

export const getDBSync = () => {
	const db = SQLite.openDatabaseSync(dbName);
	return db;
};

export const restartDb = async () => {
	let expo = await SQLite.openDatabaseAsync(dbName);
	await expo.closeAsync();
	expo = await SQLite.openDatabaseAsync(dbName);
};

export const createCheckPoint = async () => {
	const db = await SQLite.openDatabaseAsync(dbName);
	db.execAsync(`pragma wal_checkpoint`);
};

export const initDatabase = async () => {
	let dbName = process.env.EXPO_PUBLIC_DEV_DB_NAME;
	if (!__DEV__) {
		dbName = process.env.EXPO_PUBLIC_PROD_DB_NAME;
	}
	console.log("DB name", dbName);
	if (!dbName) {
		throw new Error("DB name not found");
	}
	const db = await SQLite.openDatabaseAsync(dbName);

	await db.execAsync(`
   PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS gym_day (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      name TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS exercise_type (
      name TEXT PRIMARY KEY NOT NULL
    );
    CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exerciseType TEXT NOT NULL,
      gym_day INTEGER NOT NULL,
      weightsPerSet TEXT,
      FOREIGN KEY(exerciseType) REFERENCES exercise_type(name),
      FOREIGN KEY(gym_day) REFERENCES gym_day(id) ON DELETE CASCADE
    );
	CREATE TABLE IF NOT EXISTS user_settings (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		backup_id TEXT NOT NULL
	);
	`);

	const defaultValues = [
		"Bench Press",
		"Deadlift",
		"Squats",
		"Shoulder Press",
		"Lateral Raise",
		"Bicep Curls",
		"Tricep Pull-down",
		"Back Row",
		"Lat Pulldown",
	];

	for (const value of defaultValues) {
		await db.execAsync(`
        INSERT INTO exercise_type (name)
        SELECT '${value}'
        WHERE NOT EXISTS (SELECT 1 FROM exercise_type WHERE name = '${value}');
      `);
	}
	return db;
};

export const getTest = async () => {
	const db = await SQLite.openDatabaseAsync(dbName);
	const result = await db.getAllAsync("SELECT * FROM test");
	return result;
};

export const getGymDays = async () => {
	const expo = await SQLite.openDatabaseAsync(dbName);
	const db = drizzle(expo, { schema: { ...schema } });
	const gymDays = await db.query.gymDay.findMany({
		with: {
			exercises: {
				with: {
					sets: true,
				},
			},
		},
	});
	console.log("gymDays", gymDays);
	return gymDays.map((gymDay) => parseDBGymDay(gymDay));
};

export const getGymDayById = async (id: number) => {
	const expo = await SQLite.openDatabaseAsync(dbName);
	const db = drizzle(expo, { schema: { ...schema } });
	const gymDay = await db.query.gymDay.findFirst({
		where: (gymDay, { eq }) => eq(gymDay.id, id),
		with: {
			exercises: {
				with: {
					sets: true,
				},
			},
		},
	});
	if (!gymDay) {
		throw new Error("Cannot find this GymDay");
	}
	return parseDBGymDay(gymDay);
};

export const insertNewGymDay = async () => {
	const expo = await SQLite.openDatabaseAsync(dbName);
	const db = drizzle(expo, { schema: { ...schema } });
	const date = new Date();
	console.log(dateToYearMonthDay(date));
	const insertedIds = await db
		.insert(gymDay)
		.values({ name: "New Gym Day", date: date.toUTCString() })
		.returning({ insertedId: gymDay.id });
	return insertedIds[0];
};

export const updateGymDayName = async (id: number, name: string) => {
	const db = await getDB();
	const res = await db
		.update(gymDay)
		.set({ name: name })
		.where(eq(gymDay.id, id))
		.returning({ updatedId: gymDay.id });
	return res;
};

// Exercises
export const getExerciseById = async (id: number) => {
	const db = await getDB();
	const dbExercise = await db.query.exercise.findFirst({
		where: (exercise, { eq }) => eq(exercise.id, id),
		with: {
			sets: true,
		},
	});
	console.log("exercise from DB", dbExercise);
	if (!dbExercise) {
		throw new Error("Cannot find this Exercise");
	}
	return parseDBExercise(dbExercise);
};

export const getExerciseTypes = async () => {
	const db = await getDB();
	const exerciseTypes = await db.query.exerciseType.findMany();
	return exerciseTypes.map((exerciseType) => exerciseType.name);
};

export const createNewExerciseType = async (name: string) => {
	const db = await getDB();
	const res = await db.insert(exerciseType).values({ name: name });
	return res;
};

export const updateExerciseName = async (id: number, name: string) => {
	const db = await getDB();
	const res = await db
		.update(exercise)
		.set({ exerciseType: name })
		.where(eq(exercise.id, id))
		.returning({ updatedId: exercise.id });
	return res;
};

export const createNewExercise = async (gymDayId: number, name: string) => {
	const db = await getDB();
	const res = await db
		.insert(exercise)
		.values({ exerciseType: name, gymDay: gymDayId })
		.returning({ insertedId: exercise.id });
	return await getExerciseById(res[0].insertedId);
};

export const createNewSet = async (
	exerciseId: number,
	weight: number,
	reps: number
) => {
	const db = await getDB();
	const newSetId = await db
		.insert(schema.set)
		.values({ exerciseId, weights: weight, reps })
		.returning({ inseredId: schema.set.id });
	const newSet = db.query.set.findFirst({
		where: (set, { eq }) => eq(set.id, newSetId[0].inseredId),
	});
	return newSet;
};

export const updateSet = async (
	setId: number,
	weight: number,
	reps: number
) => {
	const db = await getDB();
	const newSetId = await db
		.update(schema.set)
		.set({ weights: weight, reps: reps })
		.where(eq(schema.set.id, setId));
	return newSetId;
};

export const deleteSet = async (setId: number) => {
	const db = await getDB();
	await db.delete(schema.set).where(eq(schema.set.id, setId));
};

export const bulkDeleteExercises = async (exerciseIds: number[]) => {
	const db = await getDB();
	const res = await db
		.delete(exercise)
		.where(inArray(exercise.id, exerciseIds));
	return res;
};

export const bulkDeleteGymDays = async (gymDayIds: number[]) => {
	const db = await getDB();
	const res = await db.delete(gymDay).where(inArray(gymDay.id, gymDayIds));
	return res;
};

export const getBackupId = async () => {
	const db = await getDB();
	console.log("finding usersettings");
	const userSettings = await db.query.userSettings.findFirst();
	console.log("user settings", userSettings);
	return userSettings?.backupId;
};

export const createNewBackup = async (backupId: string) => {
	const db = await getDB();
	await db.insert(schema.userSettings).values({ backupId });
};
