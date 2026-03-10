"use client";

import { useMediaQuery } from "@mui/material";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { store } from "@/lib/store";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const theme = createTheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: "#0f766e",
			},
			...(prefersDarkMode && {
				text: {
					secondary: "#cbd5e1",
				},
			}),
		},
		typography: {
			fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
		},
		components: {
			MuiFormControl: {
				styleOverrides: {
					root: {
						minWidth: 220,
						width: 220,
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						backgroundColor: "var(--input-bg)",
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: prefersDarkMode
						? {
								color: "#cbd5e1",
							}
						: undefined,
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<ThemeWrapper>{children}</ThemeWrapper>
		</Provider>
	);
}
