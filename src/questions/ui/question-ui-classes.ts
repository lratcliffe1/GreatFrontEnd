import { MUTED_TEXT_CLASS } from "@/components/ui/primitives";

export const QUESTION_UI_CLASSES = {
	bodyText: "[color:var(--foreground)]",
	mutedText: MUTED_TEXT_CLASS,
	panelHeading: "text-xl font-semibold [color:var(--foreground)]",
	primaryLink:
		"text-link underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
	secondaryLink: "[color:var(--muted)] underline",
} as const;
