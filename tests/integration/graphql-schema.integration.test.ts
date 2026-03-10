import { executeGraphQLQuery } from "@/lib/graphql/schema";

describe("GraphQL schema integration", () => {
	it("returns question data for a valid query", async () => {
		const result = await executeGraphQLQuery(`
      {
        question(track: "gfe75", slug: "debounce") {
          id
          title
          track
          slug
        }
      }
    `);

		const payload = result as {
			data?: {
				question?: {
					id: string;
					title: string;
					track: string;
					slug: string;
				} | null;
			};
			errors?: Array<{ message: string }>;
		};

		expect(result.errors).toBeUndefined();
		expect(payload.errors).toBeUndefined();
		expect(payload.data?.question).toMatchObject({
			id: "gfe-debounce",
			title: "Debounce",
			track: "gfe75",
			slug: "debounce",
		});
	});

	it("returns errors for an invalid query", async () => {
		const result = await executeGraphQLQuery(`
      {
        missingField
      }
    `);

		const payload = result as {
			errors?: Array<{ message: string }>;
		};

		expect(payload.errors?.[0]?.message).toContain(
			'Cannot query field "missingField" on type "Query".',
		);
	});
});
