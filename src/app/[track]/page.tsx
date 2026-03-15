import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PortfolioHero } from "@/components/portfolio-hero";
import { getQuestionsByTrack } from "@/content/questions";
import { TrackQuestionsPageClient } from "@/features/questions/track-questions-page-client";
import { getTrackLabel, isTrack, TRACKS } from "@/lib/tracks";

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

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
	const { track } = await params;

	if (!isTrack(track)) {
		notFound();
	}

	const questions = getQuestionsByTrack(track);

	return (
		<div className="space-y-6">
			<PortfolioHero />
			<TrackQuestionsPageClient key={track} track={track} questions={questions} />
		</div>
	);
}
