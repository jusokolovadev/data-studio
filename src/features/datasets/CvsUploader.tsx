import { useState } from "react";
import {
	Alert,
	Group,
	Text,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { useNavigate } from 'react-router';

import { parseCsv } from "./parseCsv";
import { saveDataset } from './storage';

export function CsvUploader() {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleDrop(files: File[]) {
		const file = files[0];

		if (!file) return;

		setLoading(true);
		setError(null);

		try {
			const dataset = await parseCsv(file);
			await saveDataset(dataset);
			navigate(`/datasets/${dataset.id}`);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Не удалось обработать файл",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Dropzone
				onDrop={handleDrop}
				accept={["text/csv"]}
				maxFiles={1}
				loading={loading}
			>
				<Group justify="center" p="xl">
					<IconFileTypeCsv size={36} />
					<Text>Перетащи CSV сюда или нажми для выбора</Text>
				</Group>
			</Dropzone>

			{error && (
				<Alert color="red" mt="md">
					{error}
				</Alert>
			)}
		</>
	);
}
