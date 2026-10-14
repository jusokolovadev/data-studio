import { Container, Grid, SimpleGrid } from '@mantine/core';
import type { ReactNode } from 'react';

interface IProps { leadItem: ReactNode, restItems: any[], renderItem: (item: any) => ReactNode }

export function LeadGrid({ leadItem, restItems, renderItem }: IProps) {
	return (
		<Container my="md">
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				{leadItem}
				<Grid gap="md">
					{restItems.map((item, index) => (
						<Grid.Col span={index === 0 ? undefined : 6}>
							{renderItem(item)}
						</Grid.Col>
					))}
				</Grid>
			</SimpleGrid>
		</Container>
	);
}