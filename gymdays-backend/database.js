import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        pasword: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    })
    .promise();

// export async function getNotes() {
//     const [rows] = await pool.query("SELECT * FROM notes");
//     return rows;
// }

// export async function getNote(id) {
//     const [[rows]] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
//     return rows;
// }

// export async function createNote(title, content) {
//     const [result] = await pool.query(
//         "INSERT INTO notes (title, contents) VALUES(?,?)",
//         [title, content],
//     );
//     return getNote(result.insertId);
// }

export async function intiDb() {
    pool.query(`
    CREATE TABLE IF NOT EXISTS gym_day (
      id INT PRIMARY KEY AUTO_INCREMENT,
      date DATE NOT NULL,
      name VARCHAR(255) NOT NULL
    );`);
    pool.query(
        `CREATE TABLE IF NOT EXISTS exercise_type (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255));`,
    );
    pool.query(`CREATE TABLE IF NOT EXISTS exercise (
      id INT PRIMARY KEY AUTO_INCREMENT,
      exercise_type INT NOT NULL,
      gym_day INT NOT NULL,
      weightsPerSet VARCHAR(255),
      FOREIGN KEY(exercise_type) REFERENCES exercise_type(id),
      FOREIGN KEY(gym_day) REFERENCES gym_day(id) ON DELETE CASCADE
    );`);
    createDefaultExerciseTypes();
}

async function createDefaultExerciseTypes() {
    const [rows] = await pool.query(`SELECT * FROM exercise_type`);
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
    if (rows.length === 0) {
        for (const exercise of defaultValues) {
            await pool.query(`INSERT into exercise_type (name) VALUES(?)`, [
                exercise,
            ]);
        }
    }
}

export async function getGymDays() {
    const [rows] = await pool.query("SELECT * FROM gym_day");
    return rows;
}
export async function getExerciseTypes() {
    const [rows] = await pool.query("SELECT * FROM exercise_type");
    return rows;
}
