"use client";

import Link from "next/link";

import type { Track } from "@/content/questions";
import { getTrackLabel } from "@/lib/tracks";

export function TrackTabs() {
	const tabs: Track[] = ["gfe75", "blind75"];

	return (
		<div className="flex gap-2" data-testid="track-tabs">
			{tabs.map((track) => {
				const href = `/${track}`;
				return (
					<Link
						key={track}
						href={href}
						data-testid={`track-tab-${track}`}
						className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
					>
						{getTrackLabel(track)}
					</Link>
				);
			})}
		</div>
	);
}
