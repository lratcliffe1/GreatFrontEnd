import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TrackQuestionsPage } from "@/features/questions/track-questions-page";
import { getTrackLabel, isTrack } from "@/lib/tracks";

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

	return (
		<div>
			<Suspense
				fallback={
					<div className="animate-pulse space-y-4">
						<div className="h-8 w-48 rounded bg-background" />
						<div className="h-4 w-32 rounded bg-background" />
						<div className="h-10 w-full rounded bg-background" />
						<div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
							{[1, 2, 3, 4].map((i) => (
								<div key={i} className="h-40 rounded-lg bg-background" />
							))}
						</div>
					</div>
				}
			>
				<TrackQuestionsPage track={track} />
			</Suspense>
		</div>
	);
}
