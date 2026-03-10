import type { Question } from "@/content/questions";

export type QuestionsResponse = {
	questions: Question[];
};

export type QuestionResponse = {
	question: Question | null;
};

export type GraphQLError = {
	message: string;
};

export type GraphQLSuccessResponse<T> = {
	data: T;
	errors?: never;
};

export type GraphQLErrorResponse = {
	data?: never;
	errors: GraphQLError[];
};

export type GraphQLResponse<T> =
	| GraphQLSuccessResponse<T>
	| GraphQLErrorResponse;
