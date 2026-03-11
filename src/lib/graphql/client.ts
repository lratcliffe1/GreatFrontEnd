"use client";

import { GraphQLClient } from "graphql-request";

import type { Track } from "@/content/questions";
import type { QuestionResponse, QuestionsResponse } from "@/lib/graphql/types";

function getClient() {
	const endpoint =
		typeof window === "undefined"
			? "http://127.0.0.1:3000/api/graphql"
			: `${window.location.origin}/api/graphql`;
	return new GraphQLClient(endpoint);
}

const QUESTIONS_QUERY = /* GraphQL */ `
	query GetQuestions($track: String!) {
		questions(track: $track) {
			id
			questionNumber
			slug
			title
			track
			category
			difficulty
			sourceUrl
			solutionType
			status
			summary
			cardSummary
			approach
			complexity
			tags
		}
	}
`;

const QUESTION_QUERY = /* GraphQL */ `
	query GetQuestion($track: String!, $slug: String!) {
		question(track: $track, slug: $slug) {
			id
			questionNumber
			slug
			title
			track
			category
			difficulty
			sourceUrl
			solutionType
			status
			summary
			cardSummary
			approach
			complexity
			tags
		}
	}
`;

export async function fetchQuestions(track: Track) {
	const response = await getClient().request<QuestionsResponse>(
		QUESTIONS_QUERY,
		{ track },
	);
	return response.questions;
}

export async function fetchQuestion(track: Track, slug: string) {
	const response = await getClient().request<QuestionResponse>(QUESTION_QUERY, {
		track,
		slug,
	});
	return response.question;
}
