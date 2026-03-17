import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioHero } from "@/components/layout/portfolio-hero";
import { getQuestionsByTrack } from "@/content/questions";
import { TrackQuestionsPageDynamic } from "@/questions/list/track-page-dynamic";
import { getTrackLabel, isTrack, TRACKS } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
	return TRACKS.map((track) => ({ track }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }): Promise<Metadata> {
	const { track } = await params;
	if (!isTrack(track)) {
		return { title: "Not Found" };
	}
	const label = getTrackLabel(track);
	return {
		title: `${label} | GreatFrontEnd Portfolio`,
		description: `Interview solutions for ${label} in React + TypeScript`,
	};
}

export default async function TrackRoute({ params }: { params: Promise<{ track: string }> }) {
	const { track } = await params;

	if (!isTrack(track)) {
		notFound();
	}

	const questions = getQuestionsByTrack(track);

	return (
		<div className="space-y-6">
			<PortfolioHero />
			<TrackQuestionsPageDynamic key={track} track={track} questions={questions} />
		</div>
	);
}
