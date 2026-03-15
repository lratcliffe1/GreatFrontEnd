import { Difficulty, QuestionStatus } from "@/content/questions";

/** Single source of truth for default filter values. Used by filtersSlice, selectors, and use-url-filters. */
export const DEFAULT_TRACK_FILTERS = {
	search: "",
	category: "all",
	status: "all" as const,
	difficulty: "all" as const,
} as const;

export const STATUS_LABELS: Record<QuestionStatus, string> = {
	[QuestionStatus.Todo]: "To do",
	[QuestionStatus.InProgress]: "In progress",
	[QuestionStatus.Done]: "Done",
};

export const STATUS_OPTIONS: { value: QuestionStatus; label: string }[] = [QuestionStatus.Todo, QuestionStatus.InProgress, QuestionStatus.Done].map(
	(value) => ({ value, label: STATUS_LABELS[value] }),
);

export const DIFFICULTY_LEVELS = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard] as const;

export const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = DIFFICULTY_LEVELS.map((value) => ({ value, label: value }));
