import { Track } from "@/content/questions";

export const TRACKS: Track[] = [Track.Gfe75, Track.Blind75];

export function isTrack(value: string): value is Track {
	return value === Track.Gfe75 || value === Track.Blind75;
}

export function getTrackLabel(track: Track) {
	return track === Track.Gfe75 ? "GFE 75" : "Blind 75";
}
