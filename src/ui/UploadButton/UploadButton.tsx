import { useState } from 'react';
import { Button, Progress, rgba, useMantineTheme } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import classes from './UploadButton.module.css';

export function UploadButton() {
	const theme = useMantineTheme();
	const [progress, setProgress] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const interval = useInterval(
		() =>
			setProgress((current) => {
				if (current < 100) {
					return current + 1;
				}

				interval.stop();
				setLoaded(true);
				return 0;
			}),
		20
	);

	return (
		<Button
			fullWidth
			className={classes.button}
			onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
			color={loaded ? 'teal' : theme.primaryColor}
			radius="md"
		>
			<div className={classes.label}>
				{progress !== 0 ? 'Загрузка...' : loaded ? 'Файлы загружены' : 'Загрузить файлы'}
			</div>
			{progress !== 0 && (
				<Progress
					value={progress}
					className={classes.progress}
					color={rgba(theme.colors.blue[2], 0.35)}
					radius="sm"
				/>
			)}
		</Button>
	);
}