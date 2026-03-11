import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { graphqlApi } from "@/lib/graphql/api";
import filtersReducer from "@/lib/store/filtersSlice";
import todoDemoReducer from "@/lib/store/todoDemoSlice";

const rootReducer = combineReducers({
	filters: filtersReducer,
	todoDemo: todoDemoReducer,
	[graphqlApi.reducerPath]: graphqlApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: RootState) =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware),
		preloadedState,
	});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
