import { useRef } from 'react';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone as DropzoneUI, MIME_TYPES } from '@mantine/dropzone';
import classes from './Dropzone.module.css';

export function Dropzone() {
	const theme = useMantineTheme();
	const openRef = useRef<() => void>(null);

	return (
		<div className={classes.wrapper}>
			<DropzoneUI
				openRef={openRef}
				onDrop={() => {}}
				className={classes.dropzone}
				radius="md"
				accept={[MIME_TYPES.csv]}
				maxSize={30 * 1024 ** 2}
				aria-label="Drop files here"
			>
				<div style={{ pointerEvents: 'none' }}>
					<Group justify="center">
						<DropzoneUI.Accept>
							<IconDownload size={50} color={theme.colors.blue[6]} stroke={1.5} />
						</DropzoneUI.Accept>
						<DropzoneUI.Reject>
							<IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
						</DropzoneUI.Reject>
						<DropzoneUI.Idle>
							<IconCloudUpload size={50} stroke={1.5} className={classes.icon} />
						</DropzoneUI.Idle>
					</Group>

					<Text ta="center" fw={700} fz="lg" mt="xl">
						<DropzoneUI.Accept>Drop files here</DropzoneUI.Accept>
						<DropzoneUI.Reject>Csv file less than 30mb</DropzoneUI.Reject>
						<DropzoneUI.Idle>Upload resume</DropzoneUI.Idle>
					</Text>

					<Text className={classes.description}>
						Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
						are less than 30mb in size.
					</Text>
				</div>
			</DropzoneUI>

			<Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
				Select files
			</Button>
		</div>
	);
}