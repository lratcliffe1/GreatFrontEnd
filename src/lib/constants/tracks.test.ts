import { Track } from "@/content/questions";
import { getTrackLabel, isTrack, TRACKS } from "@/lib/constants/tracks";

describe("tracks", () => {
	describe("TRACKS", () => {
		it("includes gfe75 and blind75", () => {
			expect(TRACKS).toEqual([Track.Gfe75, Track.Blind75]);
		});
	});

	describe("isTrack", () => {
		it("returns true for gfe75", () => {
			expect(isTrack("gfe75")).toBe(true);
		});

		it("returns true for blind75", () => {
			expect(isTrack("blind75")).toBe(true);
		});

		it("returns false for invalid values", () => {
			expect(isTrack("")).toBe(false);
			expect(isTrack("gfe76")).toBe(false);
			expect(isTrack("blind74")).toBe(false);
			expect(isTrack("other")).toBe(false);
		});
	});

	describe("getTrackLabel", () => {
		it("returns GFE 75 for gfe75", () => {
			expect(getTrackLabel(Track.Gfe75)).toBe("GFE 75");
		});

		it("returns Blind 75 for blind75", () => {
			expect(getTrackLabel(Track.Blind75)).toBe("Blind 75");
		});
	});
});
