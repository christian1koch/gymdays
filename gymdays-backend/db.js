import { sql } from "@vercel/postgres";

export async function createBackup(userId = "", link = "") {
    const result =
        await sql`INSERT INTO backup (user_Id, backup_data) VALUES (${userId}, ${link})`;
    return result;
}

export async function getBackupURL(userId = "") {
    const result =
        await sql`SELECT backup_data FROM backup WHERE user_id = ${userId}`;
    return result;
}
