"use client";

import type { Track } from "@/content/questions";
import { getGraphQlErrorMessage } from "@/features/questions/helpers";
import { useQuestionQuery, useQuestionsQuery } from "@/lib/graphql/api";

export function useQuestions(track: Track) {
	const { data, error, isLoading } = useQuestionsQuery(
		{ track },
		{ skip: !track },
	);

	return {
		data: data ?? [],
		error: error
			? `Unable to load questions from GraphQL endpoint. ${getGraphQlErrorMessage(error)}`
			: null,
		isLoading,
	};
}

export function useQuestion(track: Track, slug: string) {
	const { data, error, isLoading } = useQuestionQuery(
		{ track, slug },
		{ skip: !track || slug.length === 0 },
	);

	return {
		data: data ?? null,
		error: error
			? `Unable to load question details. ${getGraphQlErrorMessage(error)}`
			: null,
		isLoading,
	};
}
