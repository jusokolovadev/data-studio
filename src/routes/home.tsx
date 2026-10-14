import { Alert, Loader } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { LeadGrid } from '../components/LeadGrid';
import { DatasetCard } from '../features/datasets/DatasetCard.tsx';
import { getDatasets } from '../features/datasets/storage.ts';
import type { Dataset } from '../features/datasets/types.ts';

import { CsvUploader } from '../features/datasets/CvsUploader.tsx';

export default function Home() {
	const [datasets, setDatasets] = useState<Dataset[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [firstDataset, ...restDatasets] = datasets ?? [];

	const handleFetchDatasets = useCallback(async () => {
		let cancelled = false;

		async function loadDataset() {
			try {
				const result = await getDatasets();

				if (cancelled) return;

				if (!result) {
					setError("Датасеты не найдены");
					return;
				}

				setDatasets(result);
			} catch {
				if (!cancelled) {
					setError("Не удалось загрузить датасеты");
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
	}, []);

	useEffect(() => {
		handleFetchDatasets();
	}, [handleFetchDatasets]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <Alert color="red">{error}</Alert>;
	}

	return (
		<div>
			<CsvUploader />
			{datasets?.length && (
				<LeadGrid
					leadItem={<DatasetCard {...firstDataset} refetchDatasets={handleFetchDatasets} />}
					restItems={restDatasets}
					renderItem={(item) => <DatasetCard {...item} refetchDatasets={handleFetchDatasets} />}
				/>
			)}
		</div>
	)
}