import * as FileSystem from "expo-file-system";
import * as db from "@gymDays/db";
export function getDBPath() {
	const pathToDb =
		FileSystem.documentDirectory +
		"SQLite/" +
		process.env.EXPO_PUBLIC_DEV_DB_NAME;
	return pathToDb;
}
async function getFileFromPath() {
	await db.createCheckPoint();
	const pathToDb = getDBPath();
	const fileRes = await fetch(pathToDb);
	const blob = await fileRes.blob();
	if (!process.env.EXPO_PUBLIC_DEV_DB_NAME) {
		throw new Error("No DB Found");
	}
	const file = new File([blob], process.env.EXPO_PUBLIC_DEV_DB_NAME, {
		type: "application/x-sqlite3",
	});
	return file;
}
interface BackupResponse {
	id: string;
}
export async function createBackup() {
	const pathToDb = getDBPath();
	const file = await getFileFromPath();
	const formData = new FormData();
	formData.append("file", {
		name: file.name,
		type: "application/x-sqlite3",
		uri: pathToDb,
	} as any);
	const response = await fetch("http://localhost:8081/backup", {
		method: "POST",
		body: formData,
	});
	const answer = await response.json();
	return answer as BackupResponse;
}

export async function updateBackup(backupId?: string) {
	const pathToDb = getDBPath();
	const file = await getFileFromPath();
	const formData = new FormData();
	formData.append("file", {
		name: file.name,
		type: "application/x-sqlite3",
		uri: pathToDb,
	} as any);
	const tempRes = await fetch(`http://localhost:8081/backup/${backupId}`, {
		method: "PUT",
		body: formData,
	});
	console.log("tempRES", tempRes);
	const res = await tempRes.json();
	if (!tempRes.ok) {
		throw new Error(res.m);
	}
	return res;
}

export async function restoreBackup(userId: string) {
	const pathToDb = getDBPath();
	const res = await fetch(`http://localhost:8081/backup/${userId}`);
	const res2 = await res.json();
	await FileSystem.deleteAsync(pathToDb);
	await FileSystem.deleteAsync(pathToDb + "-shm");
	await FileSystem.deleteAsync(pathToDb + "-wal");
	await FileSystem.downloadAsync(res2, pathToDb);
	await db.restartDb();
}
