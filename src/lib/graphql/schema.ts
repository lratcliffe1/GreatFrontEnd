import { buildSchema, graphql } from "graphql";

import { getQuestionByPath, getQuestionsByTrack, type Question, type Track } from "@/content/questions";

const schema = buildSchema(`
	enum Track {
		gfe75
		blind75
	}

	enum Difficulty {
		Easy
		Medium
		Hard
	}

	enum QuestionStatus {
		todo
		in_progress
		done
	}

	enum SolutionType {
		ui_demo
		algo_visualizer
		code_and_tests
		writeup
	}

	type Question {
		id: String!
		questionNumber: Int!
		path: String!
		title: String!
		track: Track!
		category: String!
		difficulty: Difficulty!
		sourceUrl: String!
		solutionType: SolutionType!
		status: QuestionStatus!
		summary: String!
		cardSummary: String!
		approach: String!
		complexity: String!
		tags: [String!]!
	}

	type Query {
		questions(track: Track!): [Question!]!
		question(track: Track!, path: String!): Question
	}
`);

const root = {
	questions: ({ track }: { track: Track }): Question[] => getQuestionsByTrack(track),
	question: ({ track, path }: { track: Track; path: string }): Question | null => getQuestionByPath(track, path),
};

export async function executeGraphQLQuery(query: string, variables?: Record<string, unknown>) {
	return graphql({
		schema,
		source: query,
		rootValue: root,
		variableValues: variables,
	});
}
