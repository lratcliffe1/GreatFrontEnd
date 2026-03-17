"use client";

import dynamic from "next/dynamic";

import type { Question, Track } from "@/content/questions";

type TrackQuestionsPageProps = {
	track: Track;
	questions: Question[];
};

const LazyTrackQuestionsPage = dynamic(() => import("@/questions/list/track-page").then((mod) => mod.TrackQuestionsPage), {
	ssr: false,
	loading: () => <div className="text-sm text-muted">Loading...</div>,
});

export function TrackQuestionsPageDynamic(props: TrackQuestionsPageProps) {
	return <LazyTrackQuestionsPage {...props} />;
}
