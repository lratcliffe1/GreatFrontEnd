import { Difficulty, QuestionStatus } from "@/content/questions";

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
