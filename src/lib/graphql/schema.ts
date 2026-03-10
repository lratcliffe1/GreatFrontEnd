import { buildSchema, graphql } from "graphql";

import {
	getQuestionBySlug,
	getQuestionsByTrack,
	type Question,
	type Track,
} from "@/content/questions";

const schema = buildSchema(`
  type Question {
    id: String!
    questionNumber: Int!
    slug: String!
    title: String!
    track: String!
    category: String!
    difficulty: String!
    sourceUrl: String!
    solutionType: String!
    status: String!
    summary: String!
    approach: String!
    complexity: String!
    tags: [String!]!
  }

  type Query {
    questions(track: String!): [Question!]!
    question(track: String!, slug: String!): Question
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
