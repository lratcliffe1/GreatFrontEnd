"use client";

import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

import { GRAPHQL_PATH } from "@/lib/constants/api";

function getGraphQLEndpoint() {
	if (typeof window === "undefined") {
		return `http://127.0.0.1:3000${GRAPHQL_PATH}`;
	}
	return `${window.location.origin}${GRAPHQL_PATH}`;
}

const client = new GraphQLClient(getGraphQLEndpoint());

export const graphqlApi = createApi({
	reducerPath: "graphqlApi",
	baseQuery: graphqlRequestBaseQuery({ client }),
	tagTypes: ["Tasks", "Feed"],
	endpoints: () => ({}),
});
