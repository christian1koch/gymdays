-- Create the new 'set' table
CREATE TABLE `set` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exercise_id INTEGER NOT NULL,
    weights INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
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
