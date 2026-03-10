import type { Question } from "@/content/questions";

export function isHttpUrl(value: string) {
	return /^https?:\/\//.test(value);
}

export function formatQuestionStatus(status: Question["status"] | "all") {
	if (status === "in-progress") {
		return "In progress";
	}

	if (status === "todo") {
		return "To do";
	}

	if (status === "done") {
		return "Done";
	}

	return "All";
}

export function getGraphQlErrorMessage(error: unknown) {
	return error instanceof Error ? error.message : "Unknown GraphQL error.";
}
