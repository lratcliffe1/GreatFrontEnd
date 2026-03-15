"use client";

import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

function getGraphQLEndpoint() {
	if (typeof window === "undefined") {
		return "http://127.0.0.1:3000/api/graphql";
	}
	return `${window.location.origin}/api/graphql`;
}

const client = new GraphQLClient(getGraphQLEndpoint());

export const graphqlApi = createApi({
	reducerPath: "graphqlApi",
	baseQuery: graphqlRequestBaseQuery({ client }),
	tagTypes: ["Tasks", "Feed"],
	endpoints: () => ({}),
});
