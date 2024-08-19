import express from "express";

import * as db from "./database.js";
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
    console.log("working", exerciseTypes);
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

app.use((err, req, res, next) => {
    res.status(500).send("Something broke!");
});

app.listen(8081, () => {
    // eslint-disable-next-line no-console
    console.log("Server is on Port 8081");
});
