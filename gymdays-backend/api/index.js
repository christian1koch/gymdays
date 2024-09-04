import express from "express";
import multer from "multer";
import { uploadFile, getDownloadUrl } from "../s3.js";
import { generateUsername } from "unique-username-generator";
import { createBackup, getBackupURL, replaceBackup } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });
const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("WORKS");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send("Something broke!");
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log("Server is on Port " + port);
});

app.post("/backup", upload.single("file"), async (req, res) => {
    const file = req.file;
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

app.put("/backup/:id", upload.single("file"), async (req, res) => {
    console.log("req incoming");
    const file = req.file;
    const id = req.params.id;
    const backup = await getBackupURL(id);
    const backupId = backup.rows[0]?.backup_data;
    if (!backupId) {
        console.log("no backup id");
        res.status(404);
        return res.send(new Error("no backup id"));
    }
    try {
        const result = await uploadFile(file);
        await replaceBackup(id, result);

        res.status(201);
        res.json({ id: backupId });
        console.log("successful!");
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("error", error);
        res.status(500).send({ error });
    }
});
