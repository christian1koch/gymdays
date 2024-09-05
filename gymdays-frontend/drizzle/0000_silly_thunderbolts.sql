CREATE TABLE IF NOT EXISTS `exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exerciseType` text NOT NULL,
	`gym_day` integer NOT NULL,
	FOREIGN KEY (`exerciseType`) REFERENCES `exercise_type`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`gym_day`) REFERENCES `gym_day`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `exercise_type` (
	`name` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `gym_day` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `set` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`weights` integer NOT NULL,
	`reps` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`backup_id` text NOT NULL
);

--> statement-breakpoint
INSERT INTO `set` (exercise_id, weights, reps)
SELECT 
    e.id AS exercise_id, 
    json_extract(value, '$') AS weights, 
    10 AS reps
FROM exercise e, json_each(e.weightsPerSet);

--> statement-breakpoint
ALTER TABLE `exercise` DROP COLUMN weightsPerSet;
