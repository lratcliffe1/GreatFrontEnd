import { Difficulty, QuestionStatus, Track } from "@/content/questions";
import { selectCategory, selectDifficulty, selectHasActiveFilters, selectSearch, selectStatus } from "@/lib/store/selectors";
import { graphqlApi } from "@/lib/graphql/api";
import filtersReducer, { resetFilters, setCategory, setDifficulty, setSearch, setStatus } from "@/lib/store/filtersSlice";

function getState(filters: ReturnType<typeof filtersReducer>) {
	return {
		filters,
		[graphqlApi.reducerPath]: graphqlApi.reducer(undefined, { type: "init" }),
	};
}

describe("selectors", () => {
	const track = Track.Gfe75;

	it("selectSearch returns search value", () => {
		const state = getState(filtersReducer(undefined, setSearch({ track, value: "debounce" })));
		expect(selectSearch(state, track)).toBe("debounce");
	});

	it("selectCategory returns category value", () => {
		const state = getState(filtersReducer(undefined, setCategory({ track, value: "JavaScript functions" })));
		expect(selectCategory(state, track)).toBe("JavaScript functions");
	});

	it("selectStatus returns status value", () => {
		const state = getState(filtersReducer(undefined, setStatus({ track, value: QuestionStatus.Done })));
		expect(selectStatus(state, track)).toBe(QuestionStatus.Done);
	});

	it("selectDifficulty returns difficulty value", () => {
		const state = getState(filtersReducer(undefined, setDifficulty({ track, value: Difficulty.Hard })));
		expect(selectDifficulty(state, track)).toBe(Difficulty.Hard);
	});

	it("selectHasActiveFilters returns true when difficulty is not all", () => {
		const state = getState(filtersReducer(undefined, setDifficulty({ track, value: Difficulty.Easy })));
		expect(selectHasActiveFilters(state, track)).toBe(true);
	});

	it("selectHasActiveFilters returns false when all default", () => {
		const state = getState(filtersReducer(undefined, { type: "init" }));
		expect(selectHasActiveFilters(state, track)).toBe(false);
	});

	it("selectHasActiveFilters returns true when search is set", () => {
		const state = getState(filtersReducer(undefined, setSearch({ track, value: "todo" })));
		expect(selectHasActiveFilters(state, track)).toBe(true);
	});

	it("selectHasActiveFilters returns true when category is not all", () => {
		const state = getState(filtersReducer(undefined, setCategory({ track, value: "Quiz" })));
		expect(selectHasActiveFilters(state, track)).toBe(true);
	});

	it("selectHasActiveFilters returns false after resetFilters", () => {
		const state = getState(filtersReducer(filtersReducer(undefined, setSearch({ track, value: "x" })), resetFilters()));
		expect(selectHasActiveFilters(state, track)).toBe(false);
	});

	it("keeps filters isolated by track", () => {
		const state = getState(filtersReducer(undefined, setSearch({ track: Track.Blind75, value: "two sum" })));

		expect(selectSearch(state, Track.Blind75)).toBe("two sum");
		expect(selectSearch(state, Track.Gfe75)).toBe("");
	});
});
