import { renderHook, waitFor } from "@testing-library/react";
import { useQuestions } from "@/features/questions/use-questions";
import { fetchQuestions } from "@/lib/graphql/client";

jest.mock("@/lib/graphql/client");

const mockFetchQuestions = fetchQuestions as jest.MockedFunction<
	typeof fetchQuestions
>;

describe("useQuestions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("fetches questions and returns data", async () => {
		const mockData = [
			{
				id: "q1",
				questionNumber: 1,
				slug: "debounce",
				title: "Debounce",
				track: "gfe75" as const,
				category: "JS",
				difficulty: "Medium" as const,
				sourceUrl: "https://example.com",
				solutionType: "algo-visualizer" as const,
				status: "done" as const,
				summary: "Summary",
				cardSummary: "Summary",
				approach: "Approach",
				complexity: "O(1)",
				tags: [],
			},
		];
		mockFetchQuestions.mockResolvedValue(mockData);

		const { result } = renderHook(() => useQuestions("gfe75"));

		expect(result.current.isLoading).toBe(true);

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.data).toEqual(mockData);
		expect(result.current.error).toBeNull();
		expect(mockFetchQuestions).toHaveBeenCalledWith("gfe75");
	});

	it("handles fetch error", async () => {
		mockFetchQuestions.mockRejectedValue(new Error("Network error"));

		const { result } = renderHook(() => useQuestions("gfe75"));

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.data).toEqual([]);
		expect(result.current.error).toContain("Network error");
	});
});
