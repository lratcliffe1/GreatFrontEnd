import filtersReducer, {
	resetFilters,
	setCategory,
	setSearch,
	setStatus,
} from "@/lib/store/filtersSlice";

describe("filtersSlice", () => {
	it("updates search, category, and status", () => {
		const withSearch = filtersReducer(undefined, setSearch("debounce"));
		const withCategory = filtersReducer(withSearch, setCategory("UI coding"));
		const withStatus = filtersReducer(withCategory, setStatus("done"));

		expect(withStatus).toEqual({
			search: "debounce",
			category: "UI coding",
			status: "done",
		});
	});

	it("resets filters to defaults", () => {
		const customized = filtersReducer(undefined, setSearch("todo"));
		const state = filtersReducer(
			filtersReducer(customized, setCategory("JavaScript functions")),
			resetFilters(),
		);

		expect(state).toEqual({
			search: "",
			category: "all",
			status: "all",
		});
	});
});
