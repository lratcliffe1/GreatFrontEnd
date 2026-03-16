/**
 * API smoke test: minimal check that the GraphQL API responds.
 * No mocks – hits real route + schema.
 * @jest-environment node
 */
import { POST } from "@/app/api/graphql/route";

describe("GraphQL API smoke", () => {
	it("responds to minimal valid query", async () => {
		const request = new Request("http://localhost/api/graphql", {
			method: "POST",
			body: JSON.stringify({
				query: "{ tasks { id label } }",
			}),
			headers: { "Content-Type": "application/json" },
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toHaveProperty("data");
		expect(data.data).toHaveProperty("tasks");
		expect(Array.isArray(data.data.tasks)).toBe(true);
	});
});
