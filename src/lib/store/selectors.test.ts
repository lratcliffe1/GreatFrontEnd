import { Difficulty, QuestionStatus, Track } from "@/content/questions";
import { selectCategory, selectDifficulty, selectSearch, selectStatus } from "@/lib/store/selectors";
import { graphqlApi } from "@/lib/graphql/api";
import filtersReducer, { setCategory, setDifficulty, setSearch, setStatus } from "@/lib/store/filtersSlice";

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

	it("keeps filters isolated by track", () => {
		const state = getState(filtersReducer(undefined, setSearch({ track: Track.Blind75, value: "two sum" })));

		expect(selectSearch(state, Track.Blind75)).toBe("two sum");
		expect(selectSearch(state, Track.Gfe75)).toBe("");
	});
});
