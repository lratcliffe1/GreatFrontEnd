"use client";

import { useMemo } from "react";
import { Provider } from "react-redux";

import { makeStore, type AppStore } from "@/lib/store";
import { ThemeProvider as AppThemeProvider } from "@/lib/theme-context";

type AppProvidersProps = {
	children: React.ReactNode;
	store?: AppStore;
};

export function AppProviders({ children, store }: AppProvidersProps) {
	const appStore = useMemo(() => store ?? makeStore(), [store]);

	return (
		<Provider store={appStore}>
			<AppThemeProvider>{children}</AppThemeProvider>
		</Provider>
	);
}
