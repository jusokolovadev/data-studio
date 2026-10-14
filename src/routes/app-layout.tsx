import { AppShell, Group, Image, Text, Button } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

export default function AppLayout() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<AppShell
			navbar={{
				width: isOpen ? 240 : 75,
				breakpoint: "sm",
			}}
			padding="md"
		>
			<AppShell.Navbar p="md">
				<Group gap="sm" mb="xl" wrap="nowrap">
					<Image
						src="/favicon.svg"
						alt=""
						w={42}
						h={42}
						fit="contain"
					/>

					{isOpen && (
						<Text fw={700} size="lg">
							Data Studio
						</Text>
					)}
				</Group>

				<Sidebar isOpen={isOpen} />

				<Button size="xs" ml="auto" mt="auto" onClick={() => setIsOpen(prev => !prev)}>
					{isOpen ? <IconArrowLeft size={18} /> : <IconArrowRight size={18} />}
				</Button>
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
