import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { ExecutionResult } from "graphql";

import type { Question, Track } from "@/content/questions";
import { QuestionDetailPage } from "@/features/questions/question-detail-page";
import { QUESTION_QUERY } from "@/lib/graphql/documents";
import { executeGraphQLQuery } from "@/lib/graphql/schema";
import type { QuestionResponse } from "@/lib/graphql/types";
import { getTrackLabel, isTrack } from "@/lib/tracks";

function toPlainQuestion(result: ExecutionResult<QuestionResponse>): Question | null {
	if (result?.data?.question == null) return null;

	return {
		...result.data.question,
		tags: [...result.data.question.tags],
	};
}

const getQuestionFromGraphQL = cache(async (track: Track, path: string): Promise<Question | null> => {
	const result = (await executeGraphQLQuery(QUESTION_QUERY, {
		track,
		path,
	})) as ExecutionResult<QuestionResponse>;

	if (result.errors?.length) {
		return null;
	}

	return toPlainQuestion(result);
});

export async function generateMetadata({ params }: { params: Promise<{ track: string; path: string }> }): Promise<Metadata> {
	const { track, path } = await params;
	if (!isTrack(track)) {
		return { title: "Not Found" };
	}
	const question = await getQuestionFromGraphQL(track, path);
	if (!question) {
		return { title: "Question Not Found" };
	}
	const trackLabel = getTrackLabel(track);
	return {
		title: `${question.title} | ${trackLabel} | GreatFrontEnd Portfolio`,
		description: question.summary,
	};
}

export default async function QuestionPage({ params }: { params: Promise<{ track: string; path: string }> }) {
	const { track, path } = await params;

	if (!isTrack(track)) {
		notFound();
	}

	const question = await getQuestionFromGraphQL(track, path);
	if (!question) {
		notFound();
	}

	return <QuestionDetailPage question={question} />;
}
