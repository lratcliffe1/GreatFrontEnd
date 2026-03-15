import type { Question } from "@/content/questions";

export function getUniqueCategories(questions: Question[]) {
	return Array.from(new Set(questions.map((q) => q.category))).sort();
}

export function isHttpUrl(value: string) {
	return /^https?:\/\//.test(value);
}
