import express from "express";
import * as db from "./database.js";
import multer from "multer";
import { uploadFile, getDownloadUrl } from "./s3.js";
import { generateUsername } from "unique-username-generator";
import { createBackup, getBackupURL } from "./db.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

db.intiDb();
const app = express();

app.use(express.json());

app.get("/notes", async (req, res) => {
    const notes = await db.getNotes();
    res.send(notes);
});
app.get("/gymdays", async (req, res) => {
    const gymDays = await db.getGymDays();
    res.send(gymDays);
});
app.get("/exercise-types", async (req, res) => {
    const exerciseTypes = await db.getExerciseTypes();
    res.send(exerciseTypes);
});

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await db.getNote(id);
    res.send(note);
});

app.get("/", async (req, res) => {
    res.send("WORKS");
});

app.post("/notes", async (req, res) => {
    const { title, contents } = req.body;
    const note = await db.createNote(title, contents);
    res.status(201).send(note);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send("Something broke!");
});

app.listen(8081, () => {
    // eslint-disable-next-line no-console
    console.log("Server is on Port 8081");
});

app.post("/backup", upload.single("file"), async (req, res) => {
    const file = req.file;
    console.log("file", file);
    try {
        const result = await uploadFile(file);
        const newUserName = generateUsername("", 0, 15);
        await createBackup(newUserName, result);
        res.status(201);
        res.json({ id: newUserName });
    } catch (error) {
        res.status(400);
        res.json({ message: error.message });
    }
});

app.get("/backup/:id", async (req, res) => {
    const id = req.params.id;
    const backup = await getBackupURL(id);
    const backupId = backup.rows[0].backup_data;
    const downloadUrl = await getDownloadUrl(backupId);
    res.json(downloadUrl);

    res.status(200);
});
