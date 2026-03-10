import { configureStore } from "@reduxjs/toolkit";

import { graphqlApi } from "@/lib/graphql/api";
import filtersReducer from "@/lib/store/filtersSlice";
import todoDemoReducer from "@/lib/store/todoDemoSlice";

export const store = configureStore({
	reducer: {
		filters: filtersReducer,
		todoDemo: todoDemoReducer,
		[graphqlApi.reducerPath]: graphqlApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
