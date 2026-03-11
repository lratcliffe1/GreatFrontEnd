import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getQuestionBySlug } from "@/content/questions";
import { QuestionDetailPage } from "@/features/questions/question-detail-page";
import { getTrackLabel, isTrack } from "@/lib/tracks";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ track: string; slug: string }>;
}): Promise<Metadata> {
	const { track, slug } = await params;
	if (!isTrack(track)) {
		return { title: "Not Found" };
	}
	const question = getQuestionBySlug(track, slug);
	if (!question) {
		return { title: "Question Not Found" };
	}
	const trackLabel = getTrackLabel(track);
	return {
		title: `${question.title} | ${trackLabel} | GreatFrontEnd Portfolio`,
		description: question.summary,
	};
}

export default async function QuestionPage({
	params,
}: {
	params: Promise<{ track: string; slug: string }>;
}) {
	const { track, slug } = await params;

	if (!isTrack(track)) {
		notFound();
	}

	const question = getQuestionBySlug(track, slug);
	if (!question) {
		notFound();
	}

	return <QuestionDetailPage question={question} />;
}
