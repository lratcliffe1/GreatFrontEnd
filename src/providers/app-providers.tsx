"use client";

import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";

import { makeStore, type AppStore } from "@/lib/store";

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

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

type AppProvidersProps = {
	children: React.ReactNode;
	store?: AppStore;
};

export function AppProviders({ children, store }: AppProvidersProps) {
	const appStore = useMemo(() => store ?? makeStore(), [store]);

	return (
		<Provider store={appStore}>
			<ThemeWrapper>{children}</ThemeWrapper>
		</Provider>
	);
}
