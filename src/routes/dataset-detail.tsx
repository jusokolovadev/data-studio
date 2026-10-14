import { IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Alert, Button, Group, Loader, Stack, Text, Title } from "@mantine/core";

import { getDataset } from "../features/datasets/storage";
import type { Dataset } from "../features/datasets/types";

export default function DatasetDetail() {
	const { datasetId } = useParams();
	const navigate = useNavigate();

	const [dataset, setDataset] = useState<Dataset | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function loadDataset() {
			if (!datasetId) {
				setError("Не указан ID датасета");
				setLoading(false);
				return;
			}

			try {
				const result = await getDataset(datasetId);

				if (cancelled) return;

				if (!result) {
					setError("Датасет не найден");
					return;
				}

				setDataset(result);
			} catch {
				if (!cancelled) {
					setError("Не удалось загрузить датасет");
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		void loadDataset();

		return () => {
			cancelled = true;
		};
	}, [datasetId]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <Alert color="red">{error}</Alert>;
	}

	if (!dataset) {
		return null;
	}

	return (
		<Stack>
			<Group gap="sm" align="center">
				<Button
					variant="outline"
					onClick={() => {
						navigate(-1);
					}}
				>
					<IconArrowLeft size={18} />
				</Button>
				<Title order={1}>{dataset.name}</Title>
			</Group>

			<Text c="dimmed">
				{dataset.rowCount} строк · {dataset.columns.length} колонок
			</Text>

			<Title order={2}>Колонки</Title>

			{dataset.columns.map((column) => (
				<Text key={column}>{column}</Text>
			))}

			<Title order={2}>Строки</Title>

			{dataset.rows.map((row) => (
				<Text key={row.id}>{row.name}</Text>
			))}
		</Stack>
	);
}
