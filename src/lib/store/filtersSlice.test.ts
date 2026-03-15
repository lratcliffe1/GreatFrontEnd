import { Difficulty, QuestionStatus, Track } from "@/content/questions";
import filtersReducer, {
	hydrateFiltersFromQuery,
	resetFilters,
	resetFiltersForTrack,
	setCategory,
	setDifficulty,
	setSearch,
	setStatus,
} from "@/lib/store/filtersSlice";

describe("filtersSlice", () => {
	it("updates search, category, status, and difficulty for a single track", () => {
		const withSearch = filtersReducer(undefined, setSearch({ track: Track.Gfe75, value: "debounce" }));
		const withCategory = filtersReducer(withSearch, setCategory({ track: Track.Gfe75, value: "UI coding" }));
		const withStatus = filtersReducer(withCategory, setStatus({ track: Track.Gfe75, value: QuestionStatus.Done }));
		const withDifficulty = filtersReducer(withStatus, setDifficulty({ track: Track.Gfe75, value: Difficulty.Medium }));

		expect(withDifficulty).toEqual({
			byTrack: {
				gfe75: {
					search: "debounce",
					category: "UI coding",
					status: QuestionStatus.Done,
					difficulty: Difficulty.Medium,
				},
				blind75: {
					search: "",
					category: "all",
					status: "all",
					difficulty: "all",
				},
			},
		});
	});

	it("hydrates a track from URL filters", () => {
		const state = filtersReducer(
			undefined,
			hydrateFiltersFromQuery({
				track: Track.Blind75,
				search: "twosum",
				category: "ignored",
				status: QuestionStatus.InProgress,
				difficulty: Difficulty.Hard,
			}),
		);

		expect(state.byTrack.blind75).toEqual({
			search: "twosum",
			category: "ignored",
			status: QuestionStatus.InProgress,
			difficulty: Difficulty.Hard,
		});
	});

	it("resets one track to defaults", () => {
		const customized = filtersReducer(undefined, setSearch({ track: Track.Gfe75, value: "todo" }));
		const state = filtersReducer(customized, resetFiltersForTrack(Track.Gfe75));

		expect(state.byTrack.gfe75).toEqual({
			search: "",
			category: "all",
			status: "all",
			difficulty: "all",
		});
	});

	it("resets all tracks to defaults", () => {
		const withGfeSearch = filtersReducer(undefined, setSearch({ track: Track.Gfe75, value: "todo" }));
		const withBlindStatus = filtersReducer(withGfeSearch, setStatus({ track: Track.Blind75, value: QuestionStatus.Done }));
		const state = filtersReducer(withBlindStatus, resetFilters());

		expect(state).toEqual({
			byTrack: {
				gfe75: {
					search: "",
					category: "all",
					status: "all",
					difficulty: "all",
				},
				blind75: {
					search: "",
					category: "all",
					status: "all",
					difficulty: "all",
				},
			},
		});
	});
});
