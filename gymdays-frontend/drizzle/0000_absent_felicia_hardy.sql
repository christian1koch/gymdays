
CREATE TABLE `set` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`weights` integer NOT NULL,
	`reps` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
-- //TODO: Fix migration
--> statement-breakpoint
INSERT INTO "set" (exercise_id, weights, reps)
SELECT 
    id AS exercise_id, 
    json_extract(weightsPerSet, '$') AS weights, 
    10 AS reps -- Assuming reps are 10 for this example, modify if needed
FROM exercise;

--> statement-breakpoint
ALTER TABLE exercise DROP COLUMN weightsPerSet;
