import * as FileSystem from "expo-file-system";

export function getDBPath() {
	const pathToDb =
		FileSystem.documentDirectory +
		"SQLite/" +
		process.env.EXPO_PUBLIC_DEV_DB_NAME;
	return pathToDb;
}

export async function createBackup() {
	const pathToDb = getDBPath();
	const fileRes = await fetch(pathToDb);
	const blob = await fileRes.blob();
	console.log("bolb", blob);
	if (!process.env.EXPO_PUBLIC_DEV_DB_NAME) {
		throw new Error("No DB Found");
	}
	const file = new File([blob], process.env.EXPO_PUBLIC_DEV_DB_NAME, {
		type: "application/x-sqlite3",
	});
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
	console.log(answer);
	return response;
}

export async function restoreBackup(userId: string) {}
