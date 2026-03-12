"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme-preference";

function getStoredPreference(): ThemePreference {
	if (typeof window === "undefined") return "system";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark" || stored === "system") return stored;
	return "system";
}

function getSystemMode(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	try {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	} catch {
		return "light";
	}
}

type ThemeContextValue = {
	preference: ThemePreference;
	resolvedMode: "light" | "dark";
	setPreference: (p: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [preference, setPreferenceState] = useState<ThemePreference>(getStoredPreference);
	const [systemMode, setSystemMode] = useState<"light" | "dark">(getSystemMode);
	const resolvedMode = preference === "system" ? systemMode : preference;

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", preference === "system" ? "" : preference);
	}, [preference]);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => setSystemMode(mq.matches ? "dark" : "light");
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const setPreference = useCallback((p: ThemePreference) => {
		setPreferenceState(p);
		localStorage.setItem(STORAGE_KEY, p);
	}, []);

	const value = useMemo(
		() => ({ preference, resolvedMode, setPreference }),
		[preference, resolvedMode, setPreference],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
	return ctx;
}
