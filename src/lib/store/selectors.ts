import { createSelector } from "@reduxjs/toolkit";

import type { Track } from "@/content/questions";
import { DEFAULT_TRACK_FILTERS } from "@/lib/constants/filters";
import type { RootState } from "@/lib/store";

const selectTrackFilters = (state: RootState, track: Track) => state.filters.byTrack[track] ?? DEFAULT_TRACK_FILTERS;

export const selectSearch = createSelector(selectTrackFilters, (filters) => filters.search);

export const selectCategory = createSelector(selectTrackFilters, (filters) => filters.category);

export const selectStatus = createSelector(selectTrackFilters, (filters) => filters.status);

export const selectDifficulty = createSelector(selectTrackFilters, (filters) => filters.difficulty);
