import { renderHook } from "@testing-library/react";
import { useQuestion, useQuestions } from "@/features/questions/use-questions";
import { useQuestionQuery, useQuestionsQuery } from "@/lib/graphql/api";

const mockUseQuestionsQuery = jest.fn();
const mockUseQuestionQuery = jest.fn();

jest.mock("@/lib/graphql/api", () => ({
	...jest.requireActual("@/lib/graphql/api"),
	useQuestionsQuery: (...args: unknown[]) => mockUseQuestionsQuery(...args),
	useQuestionQuery: (...args: unknown[]) => mockUseQuestionQuery(...args),
}));

describe("useQuestions", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns query data", () => {
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
				solutionType: "algo_visualizer" as const,
				status: "done" as const,
				summary: "Summary",
				cardSummary: "Summary",
				approach: "Approach",
				complexity: "O(1)",
				tags: [],
			},
		];
		mockUseQuestionsQuery.mockReturnValue({
			data: mockData,
			error: undefined,
			isLoading: false,
		} as unknown as ReturnType<typeof useQuestionsQuery>);

		const { result } = renderHook(() => useQuestions("gfe75"));

		expect(result.current.data).toEqual(mockData);
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it("handles query error", () => {
		mockUseQuestionsQuery.mockReturnValue({
			data: undefined,
			error: { message: "Network error" },
			isLoading: false,
		} as unknown as ReturnType<typeof useQuestionsQuery>);

		const { result } = renderHook(() => useQuestions("gfe75"));

		expect(result.current.data).toEqual([]);
		expect(result.current.error).toContain("Network error");
		expect(result.current.isLoading).toBe(false);
	});
});

describe("useQuestion", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns a question when present", () => {
		const mockQuestion = {
			id: "q1",
			questionNumber: 1,
			slug: "debounce",
			title: "Debounce",
			track: "gfe75" as const,
			category: "JS",
			difficulty: "Medium" as const,
			sourceUrl: "https://example.com",
			solutionType: "algo_visualizer" as const,
			status: "done" as const,
			summary: "Summary",
			cardSummary: "Summary",
			approach: "Approach",
			complexity: "O(1)",
			tags: [],
		};
		mockUseQuestionQuery.mockReturnValue({
			data: mockQuestion,
			error: undefined,
			isLoading: false,
		} as unknown as ReturnType<typeof useQuestionQuery>);

		const { result } = renderHook(() => useQuestion("gfe75", "debounce"));
		expect(result.current.data).toEqual(mockQuestion);
		expect(result.current.error).toBeNull();
		expect(result.current.isLoading).toBe(false);
	});

	it("handles query error", () => {
		mockUseQuestionQuery.mockReturnValue({
			data: undefined,
			error: { message: "Question query failed" },
			isLoading: false,
		} as unknown as ReturnType<typeof useQuestionQuery>);

		const { result } = renderHook(() => useQuestion("gfe75", "debounce"));
		expect(result.current.data).toBeNull();
		expect(result.current.error).toContain("Question query failed");
		expect(result.current.isLoading).toBe(false);
	});
});
