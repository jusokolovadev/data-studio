export type CsvRow = Record<string, string>;

export interface Dataset {
	id: string;
	name: string;
	columns: string[];
	rows: CsvRow[];
	rowCount: number;
	fileSize: number;
}