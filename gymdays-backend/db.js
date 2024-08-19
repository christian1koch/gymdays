import { sql } from "@vercel/postgres";

export async function createBackup(userId = "", link = "") {
    const result =
        await sql`INSERT INTO backup (user_Id, backup_data) VALUES (${userId}, ${link})`;
    return result;
}
