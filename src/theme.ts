
import {
	createTheme,
	type CSSVariablesResolver,
} from "@mantine/core";

export const theme = createTheme({
	primaryColor: "brand",

	colors: {
		brand: [
			"#E8EEFF",
			"#C9D6FF",
			"#A3B8FF",
			"#7D9AFF",
			"#5C7FF7",
			"#3F6BEE",
			"#2861EB",
			"#2050C7",
			"#193FA0",
			"#112D75",
		],
	},

	defaultRadius: "md",

	fontFamily: "Inter, sans-serif",

	headings: {
		fontFamily: "Inter, sans-serif",
		fontWeight: "600",
	},
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
	variables: {},
	light: {},
	dark: {
		"--mantine-color-body": "var(--primary-background)",
		"--mantine-color-text": "var(--primary-text)",
		"--mantine-color-default": "var(--surface-secondary)",
		"--mantine-color-default-hover": "var(--surface-tertiary)",
		"--mantine-color-default-border": "var(--border-default)",
	},
});
