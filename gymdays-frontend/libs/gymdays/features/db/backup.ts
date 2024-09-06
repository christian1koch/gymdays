import * as FileSystem from "expo-file-system";
import * as db from "@gymDays/db";
const dbName = __DEV__
	? process.env.EXPO_PUBLIC_DEV_DB_NAME
	: process.env.EXPO_PUBLIC_PROD_DB_NAME;
export function getDBPath() {
	const pathToDb = FileSystem.documentDirectory + "SQLite/" + dbName;
	return pathToDb;
}
async function getFileFromPath() {
	await db.createCheckPoint();
	const pathToDb = getDBPath();
	const fileRes = await fetch(pathToDb);
	const blob = await fileRes.blob();
	if (!dbName) {
		throw new Error("No DB Found");
	}
	const file = new File([blob], dbName, {
		type: "application/x-sqlite3",
	});
	return file;
}
interface BackupResponse {
	id: string;
}

const BASE_URL = __DEV__
	? process.env.EXPO_PUBLIC_DEV_API_URL
	: process.env.EXPO_PUBLIC_PROD_API_URL;
export async function createBackup() {
	const pathToDb = getDBPath();
	const file = await getFileFromPath();
	const formData = new FormData();
	formData.append("file", {
		name: file.name,
		type: "application/x-sqlite3",
		uri: pathToDb,
	} as any);
	const response = await fetch(BASE_URL!, {
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
	const tempRes = await fetch(`${BASE_URL}/${backupId}`, {
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
	const res = await fetch(`${BASE_URL}/${userId}`);
	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const res2 = await res.json();
	console.log("pathToDB", pathToDb);
	try {
		await FileSystem.deleteAsync(pathToDb);
		await FileSystem.deleteAsync(pathToDb + "-shm");
		await FileSystem.deleteAsync(pathToDb + "-wal");
	} catch (error) {
		console.log(error);
	}
	await FileSystem.downloadAsync(res2, pathToDb);
	await db.restartDb();
}
