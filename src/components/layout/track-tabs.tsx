"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PRIMARY_BUTTON_CLASSES } from "@/components/ui/tailwind-primitives";
import { getTrackLabel, TRACKS } from "@/lib/constants";

export function TrackTabs() {
	const searchParams = useSearchParams();
	const search = searchParams?.toString() ?? "";

	return (
		<div className="flex gap-2" data-testid="track-tabs">
			{TRACKS.map((track) => {
				const href = `/${track}${search ? `?${search}` : ""}`;
				return (
					<Link key={track} href={href} data-testid={`track-tab-${track}`} className={PRIMARY_BUTTON_CLASSES}>
						{getTrackLabel(track)}
					</Link>
				);
			})}
		</div>
	);
}
