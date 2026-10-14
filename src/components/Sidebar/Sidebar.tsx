import { NavLink } from "react-router";
import { Stack } from "@mantine/core";
import {
	IconHomeUp,
	IconSettings,
} from "@tabler/icons-react";
import classes from './Sidebar.module.css';

interface IProps {
	isOpen: boolean;
}

export function Sidebar({ isOpen }: IProps) {
	return (
		<Stack gap="xs">
			<NavLink
				to="/"
				end
				className={({ isActive }) =>
					`${classes.link} ${isActive ? classes.active : ""}`
				}
			>
				<IconHomeUp size={18} />
				{isOpen && 'Главная'}
			</NavLink>

			<NavLink
				to="/settings"
				className={({ isActive }) =>
					`${classes.link} ${isActive ? classes.active : ""}`
				}
			>
				<IconSettings size={18} />
				{isOpen && 'Настройки'}
			</NavLink>
		</Stack>
	);
}
