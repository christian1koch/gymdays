import { sql } from "@vercel/postgres";

const isDevMode = () => {
    if (!process.env.DEV_MODE) {
        return false;
    }
    if (process.env.DEV_MODE.toLocaleLowerCase() === "false") {
        return false;
    }
    return true;
};

export async function createBackup(userId = "", link = "") {
    if (isDevMode()) {
        return await sql`INSERT INTO backup_dev (user_Id, backup_data) VALUES (${userId}, ${link})`;
    }
    return await sql`INSERT INTO backup_prod (user_Id, backup_data) VALUES (${userId}, ${link})`;
}

export async function replaceBackup(userId = "", link = "") {
    if (isDevMode()) {
        return await sql`UPDATE backup_dev SET backup_data = ${link} WHERE user_id = ${userId}`;
    }
    return await sql`UPDATE backup_prod SET backup_data = ${link} WHERE user_id = ${userId}`;
}

export async function getBackupURL(userId = "") {
    if (isDevMode()) {
        return await sql`SELECT backup_data FROM backup_dev WHERE user_id = ${userId}`;
    }
    return await sql`SELECT backup_data FROM backup_prod WHERE user_id = ${userId}`;
}
