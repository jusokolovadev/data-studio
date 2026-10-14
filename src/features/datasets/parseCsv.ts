import Papa from 'papaparse';
import type { CsvRow, Dataset } from './types';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export function parseCsv(file: File): Promise<Dataset> {
	return new Promise((resolve, reject) => {
		if (!file.name.toLowerCase().endsWith(".csv")) {
			reject(new Error("Выбери файл с расширением .csv"));
			return;
		}

		if (file.size === 0) {
			reject(new Error("Файл пустой"));
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			reject(new Error("Файл больше 100 МБ"));
			return;
		}

		Papa.parse<CsvRow>(file, {
			header: true,
			skipEmptyLines: "greedy",
			worker: true,

			complete: (result) => {
				if (result.errors.length > 0) {
					reject(
						new Error(
							`Не удалось корректно прочитать CSV: ${result.errors[0].message}`,
						),
					);
					return;
				}

				const columns = result.meta.fields ?? [];

				if (columns.length === 0) {
					reject(new Error("В файле не найдены колонки"));
					return;
				}

				resolve({
					id: crypto.randomUUID(),
					name: file.name,
					columns,
					rows: result.data,
					rowCount: result.data.length,
					fileSize: file.size,
				});
			},

			error: (error) => reject(error),
		});
	});
}
