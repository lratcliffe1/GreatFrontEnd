import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { QuestionStatus } from "@/content/questions";

type FiltersState = {
	search: string;
	category: string;
	status: QuestionStatus | "all";
};

const initialState: FiltersState = {
	search: "",
	category: "all",
	status: "all",
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
		setCategory(state, action: PayloadAction<string>) {
			state.category = action.payload;
		},
		setStatus(state, action: PayloadAction<QuestionStatus | "all">) {
			state.status = action.payload;
		},
		// Kept for future UX flows (e.g. "Clear filters" button).
		resetFilters(state) {
			state.search = "";
			state.category = "all";
			state.status = "all";
		},
	},
});

export const { setSearch, setCategory, setStatus, resetFilters } =
	filtersSlice.actions;

export default filtersSlice.reducer;
