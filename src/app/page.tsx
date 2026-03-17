import type { Metadata } from "next";

import { PortfolioHero } from "@/components/layout/portfolio-hero";
import { getQuestionsByTrack, Track } from "@/content/questions";
import { TrackQuestionsPageDynamic } from "@/questions/list/track-page-dynamic";

export const metadata: Metadata = {
	title: "GFE 75 | GreatFrontEnd Portfolio",
	description: "Interview solutions for GFE 75 in React + TypeScript",
};

export default function Home() {
	const questions = getQuestionsByTrack(Track.Gfe75);

	return (
		<div className="space-y-6">
			<PortfolioHero />
			<TrackQuestionsPageDynamic key="gfe75" track={Track.Gfe75} questions={questions} />
		</div>
	);
}
