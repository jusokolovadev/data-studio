import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { deleteDataset } from './storage.ts';
import type { Dataset } from './types.ts';
import classes from './DatasetCard.module.css';
import { Link } from 'react-router';

interface IProps extends Dataset {
	refetchDatasets: VoidFunction;
}

export function DatasetCard({ columns, rowCount, fileSize, id, name, refetchDatasets }: IProps) {
	const stats = [{
		title: 'Колонки',
		value: columns.length,
	}, {
		title: 'Ряды',
		value: rowCount,
	}, {
		title: 'Размер',
		value: fileSize,
	}];

	const items = stats.map((stat) => (
		<div key={stat.title}>
			<Text size="xs" c="dimmed">
				{stat.title}
			</Text>
			<Text fw={500} size="sm">
				{stat.value}
			</Text>
		</div>
	));

	return (
		<Card
			withBorder
			padding="lg"
			radius="md"
			className={classes.card}
			component={Link}
			to={`/datasets/${id}`}
		>
			<Group justify="space-between" align="flex-start">
				<Stack mb="lg">
					<Text className={classes.title}>{name}</Text>
					<Text fz="xs" c="dimmed">
						{id}
					</Text>
				</Stack>
				<Button
					variant="white"
					onClick={(event) => {
						event.preventDefault();
						deleteDataset(id);
						refetchDatasets();
					}}
				>
					<IconTrash size={18} />
				</Button>
			</Group>
			<Card.Section className={classes.footer}>{items}</Card.Section>
		</Card>
	);
}