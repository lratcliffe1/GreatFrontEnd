import { NextResponse } from "next/server";

import { executeGraphQLQuery } from "@/lib/graphql/schema";
import type { GraphQLError } from "@/lib/graphql/types";

type GraphQLRequestBody = {
	query?: string;
	variables?: Record<string, unknown>;
};

export async function POST(request: Request) {
	const body = (await request.json()) as GraphQLRequestBody;

	if (!body.query) {
		const errors: GraphQLError[] = [
			{ message: "GraphQL query is required." },
		];
		return NextResponse.json({ errors }, { status: 400 });
	}

	const result = await executeGraphQLQuery(body.query, body.variables);

	if (result.errors?.length) {
		const errors: GraphQLError[] = result.errors.map((error) => ({
			message: error.message,
		}));
		return NextResponse.json({ errors }, { status: 400 });
	}

	return NextResponse.json({ data: result.data });
}
