import { buildSchema, graphql } from "graphql";

import {
	getQuestionBySlug,
	getQuestionsByTrack,
	type Question,
	type Track,
} from "@/content/questions";

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
		slug: String!
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
		question(track: Track!, slug: String!): Question
	}
`);

const root = {
	questions: ({ track }: { track: Track }): Question[] =>
		getQuestionsByTrack(track),
	question: ({
		track,
		slug,
	}: {
		track: Track;
		slug: string;
	}): Question | null => getQuestionBySlug(track, slug),
};

export async function executeGraphQLQuery(
	query: string,
	variables?: Record<string, unknown>,
) {
	return graphql({
		schema,
		source: query,
		rootValue: root,
		variableValues: variables,
	});
}
