import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const gymDay = sqliteTable("gym_day", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	date: text("date").notNull(),
	name: text("name").notNull(),
});

export const exerciseType = sqliteTable("exercise_type", {
	name: text("name").primaryKey(),
});

export const exercise = sqliteTable("exercise", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	exerciseType: text("exerciseType")
		.references(() => exerciseType.name)
		.notNull(),
	gymDay: integer("gym_day")
		.references(() => gymDay.id, { onDelete: "cascade" })
		.notNull(),
	weightsPerSet: text("weightsPerSet"), // Storing as comma-separated string
});
// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, {
//     fields: [posts.authorId],
//     references: [users.id],
//   }),
// }));

export const userSettings = sqliteTable("user_settings", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	backupId: text("backup_id").notNull(),
});
export const exerciseRelations = relations(exercise, ({ one }) => ({
	gymDay: one(gymDay, {
		fields: [exercise.gymDay],
		references: [gymDay.id],
	}),
}));

export const gymDayRelations = relations(gymDay, ({ many }) => ({
	exercises: many(exercise),
}));

export type DBGymDay = typeof gymDay.$inferSelect;
export type DBExercise = typeof exercise.$inferSelect;
export type DBExerciseType = typeof exerciseType.$inferSelect;
export type DBUserSettings = typeof userSettings.$inferSelect;
export interface DBGymDayWithExercises extends DBGymDay {
	exercises: DBExercise[];
}
