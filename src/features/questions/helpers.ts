import type { Question } from "@/content/questions";
import { QuestionStatus } from "@/content/questions";
import { STATUS_LABELS } from "@/lib/constants/filters";

export function getUniqueCategories(questions: Question[]) {
	return Array.from(new Set(questions.map((q) => q.category))).sort();
}

export function isHttpUrl(value: string) {
	return /^https?:\/\//.test(value);
}

export function formatQuestionStatus(status: QuestionStatus | "all") {
	if (status === "all") return "All";
	return STATUS_LABELS[status];
}

export function getGraphQlErrorMessage(error: unknown) {
	if (error instanceof Error) {
		return error.message;
	}

	if (error && typeof error === "object" && "message" in error) {
		return String((error as { message: unknown }).message);
	}

	return "Unknown GraphQL error.";
}
