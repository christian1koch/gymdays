import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { exercise, gymDay } from "./schema";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { parseDBGymDay } from "./helper";

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
