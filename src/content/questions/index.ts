import type { Question, Track } from "./types";
import { BLIND75_QUESTIONS } from "./blind75";
import { GFE75_QUESTIONS } from "./gfe75";

export { Category, Difficulty, QuestionStatus, SolutionType, Tag, Track } from "./types";
export type { Question } from "./types";

export const QUESTIONS: Question[] = [...GFE75_QUESTIONS, ...BLIND75_QUESTIONS];

export function getQuestionsByTrack(track: Track): Question[] {
	return QUESTIONS.filter((question) => question.track === track);
}

export function getQuestionByPath(track: Track, path: string): Question | null {
	return QUESTIONS.find((question) => question.track === track && question.path === path) ?? null;
}
