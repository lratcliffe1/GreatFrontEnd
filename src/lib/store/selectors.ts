import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "@/lib/store";

const selectFiltersState = (state: RootState) => state.filters;

export const selectSearch = createSelector(
	selectFiltersState,
	(filters) => filters.search,
);

export const selectCategory = createSelector(
	selectFiltersState,
	(filters) => filters.category,
);

export const selectStatus = createSelector(
	selectFiltersState,
	(filters) => filters.status,
);

export const selectHasActiveFilters = createSelector(
	selectFiltersState,
	(filters) =>
		filters.search !== "" ||
		filters.category !== "all" ||
		filters.status !== "all",
);
