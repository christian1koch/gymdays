import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { exercise, exerciseType, gymDay } from "./schema";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { parseDBExercise, parseDBGymDay } from "./helper";
import { dateToYearMonthDay } from "../libs/utils/utils";

const getDB = async () => {
  const expo = await SQLite.openDatabaseAsync("databaseName.db");
  const db = drizzle(expo, { schema: { ...schema } });
  return db;
};

export const initDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");
  const query = await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);
  return db;
};

export const getTest = async () => {
  const db = await SQLite.openDatabaseAsync("databaseName.db");
  const result = await db.getAllAsync("SELECT * FROM test");
  console.log("result", result);
  return result;
};

export const getGymDays = async () => {
  const expo = await SQLite.openDatabaseAsync("databaseName.db");
  const db = drizzle(expo, { schema: { ...schema } });
  const gymDays = await db.query.gymDay.findMany({
    with: {
      exercises: true,
    },
  });
  return gymDays.map((gymDay) => parseDBGymDay(gymDay));
};

export const getGymDayById = async (id: number) => {
  const expo = await SQLite.openDatabaseAsync("databaseName.db");
  const db = drizzle(expo, { schema: { ...schema } });
  const gymDay = await db.query.gymDay.findFirst({
    where: (gymDay, { eq }) => eq(gymDay.id, id),
    with: {
      exercises: true,
    },
  });
  if (!gymDay) {
    throw new Error("Cannot find this GymDay");
  }
  return parseDBGymDay(gymDay);
};

export const insertNewGymDay = async () => {
  const expo = await SQLite.openDatabaseAsync("databaseName.db");
  const db = drizzle(expo, { schema: { ...schema } });
  const date = new Date();
  const insertedIds = await db
    .insert(gymDay)
    .values({ name: "New Gym Day", date: dateToYearMonthDay(date) })
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
  console.log("id", id);
  return res;
};

// Exercises
export const getExerciseById = async (id: number) => {
  const db = await getDB();
  const dbExercise = await db.query.exercise.findFirst({
    where: (exercise, { eq }) => eq(exercise.id, id),
  });
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
