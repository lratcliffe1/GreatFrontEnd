import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { Difficulty, QuestionStatus, Track } from "@/content/questions";
import { DEFAULT_TRACK_FILTERS } from "@/lib/constants";

type TrackFilters = {
	search: string;
	category: string;
	status: QuestionStatus | "all";
	difficulty: Difficulty | "all";
};

type FiltersState = {
	byTrack: Record<Track, TrackFilters>;
};

type TrackScopedPayload<TValue> = {
	track: Track;
	value: TValue;
};

function createDefaultTrackFilters(): TrackFilters {
	return { ...DEFAULT_TRACK_FILTERS };
}

const initialState: FiltersState = {
	byTrack: {
		[Track.Gfe75]: createDefaultTrackFilters(),
		[Track.Blind75]: createDefaultTrackFilters(),
	},
};

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<TrackScopedPayload<string>>) {
			state.byTrack[action.payload.track].search = action.payload.value;
		},
		setCategory(state, action: PayloadAction<TrackScopedPayload<string>>) {
			state.byTrack[action.payload.track].category = action.payload.value;
		},
		setStatus(state, action: PayloadAction<TrackScopedPayload<QuestionStatus | "all">>) {
			state.byTrack[action.payload.track].status = action.payload.value;
		},
		setDifficulty(state, action: PayloadAction<TrackScopedPayload<Difficulty | "all">>) {
			state.byTrack[action.payload.track].difficulty = action.payload.value;
		},
		hydrateFiltersFromQuery(
			state,
			action: PayloadAction<{
				track: Track;
				search: string;
				category: string;
				status: QuestionStatus | "all";
				difficulty: Difficulty | "all";
			}>,
		) {
			state.byTrack[action.payload.track] = {
				search: action.payload.search,
				category: action.payload.category,
				status: action.payload.status,
				difficulty: action.payload.difficulty,
			};
		},
		// Kept for future UX flows (e.g. "Clear filters" button).
		resetFilters(state) {
			state.byTrack[Track.Gfe75] = createDefaultTrackFilters();
			state.byTrack[Track.Blind75] = createDefaultTrackFilters();
		},
		resetFiltersForTrack(state, action: PayloadAction<Track>) {
			state.byTrack[action.payload] = createDefaultTrackFilters();
		},
	},
});

export const { setSearch, setCategory, setStatus, setDifficulty, hydrateFiltersFromQuery, resetFilters, resetFiltersForTrack } = filtersSlice.actions;

export default filtersSlice.reducer;
