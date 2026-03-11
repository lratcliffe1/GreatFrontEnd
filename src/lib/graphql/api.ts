"use client";

import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

import type { Question, Track } from "@/content/questions";
import type { QuestionResponse, QuestionsResponse } from "@/lib/graphql/types";

function getGraphQLEndpoint() {
	if (typeof window === "undefined") {
		return "http://127.0.0.1:3000/api/graphql";
	}
	return `${window.location.origin}/api/graphql`;
}

const client = new GraphQLClient(getGraphQLEndpoint());

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

export const graphqlApi = createApi({
	reducerPath: "graphqlApi",
	baseQuery: graphqlRequestBaseQuery({ client }),
	endpoints: (builder) => ({
		questions: builder.query<Question[], { track: Track }>({
			query: ({ track }) => ({
				document: QUESTIONS_QUERY,
				variables: { track },
			}),
			transformResponse: (response: QuestionsResponse) => response.questions,
		}),
		question: builder.query<Question | null, { track: Track; slug: string }>({
			query: ({ track, slug }) => ({
				document: QUESTION_QUERY,
				variables: { track, slug },
			}),
			transformResponse: (response: QuestionResponse) => response.question,
		}),
	}),
});

export const { useQuestionsQuery, useQuestionQuery } = graphqlApi;
