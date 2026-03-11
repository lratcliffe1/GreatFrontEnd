import {
	formatQuestionStatus,
	getGraphQlErrorMessage,
	isHttpUrl,
} from "@/features/questions/helpers";

describe("helpers", () => {
	describe("isHttpUrl", () => {
		it("returns true for http URLs", () => {
			expect(isHttpUrl("http://example.com")).toBe(true);
			expect(isHttpUrl("http://localhost:3000")).toBe(true);
		});

		it("returns true for https URLs", () => {
			expect(isHttpUrl("https://example.com")).toBe(true);
			expect(isHttpUrl("https://www.greatfrontend.com")).toBe(true);
		});

		it("returns false for non-URLs", () => {
			expect(isHttpUrl("")).toBe(false);
			expect(isHttpUrl("not a url")).toBe(false);
			expect(isHttpUrl("ftp://example.com")).toBe(false);
		});
	});

	describe("formatQuestionStatus", () => {
		it("formats status values correctly", () => {
			expect(formatQuestionStatus("todo")).toBe("To do");
			expect(formatQuestionStatus("in_progress")).toBe("In progress");
			expect(formatQuestionStatus("done")).toBe("Done");
			expect(formatQuestionStatus("all")).toBe("All");
		});
	});

	describe("getGraphQlErrorMessage", () => {
		it("returns error message for Error instances", () => {
			expect(getGraphQlErrorMessage(new Error("Network error"))).toBe(
				"Network error",
			);
		});

		it("returns fallback for non-Error values", () => {
			expect(getGraphQlErrorMessage("string")).toBe("Unknown GraphQL error.");
			expect(getGraphQlErrorMessage(null)).toBe("Unknown GraphQL error.");
		});
	});
});
