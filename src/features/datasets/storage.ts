import { openDB } from 'idb';
import type { Dataset } from './types';

const DB_NAME = "data-studio";
const STORE_NAME = "datasets";

function getDb() {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			db.createObjectStore(STORE_NAME, {
				keyPath: "id",
			});
		},
	});
}

export async function saveDataset(dataset: Dataset) {
	const db = await getDb();

	await db.put(STORE_NAME, dataset);
}

export async function getDatasets(): Promise<Dataset[] | undefined> {
	const db = await getDb();

	return db.getAll(STORE_NAME);
}

export async function getDataset(
	id: string,
): Promise<Dataset | undefined> {
	const db = await getDb();

	return db.get(STORE_NAME, id);
}

export async function deleteDataset(id: string) {
	const db = await getDb();

	await db.delete(STORE_NAME, id);
}
