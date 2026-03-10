import type { Track } from "@/content/questions";

export const TRACKS: Track[] = ["gfe75", "blind75"];

export function isTrack(value: string): value is Track {
  return TRACKS.includes(value as Track);
}

export function getTrackLabel(track: Track) {
  return track === "gfe75" ? "GFE 75" : "Blind 75";
}
