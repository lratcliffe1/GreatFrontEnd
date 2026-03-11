import { render, screen } from "@/test-utils";
import { QuestionDetailPage } from "@/features/questions/question-detail-page";
import type { Question } from "@/content/questions";

const mockQuestion: Question = {
	id: "gfe-debounce",
	questionNumber: 1,
	slug: "debounce",
	title: "Debounce",
	track: "gfe75",
	category: "JavaScript functions",
	difficulty: "Medium",
	sourceUrl: "https://www.greatfrontend.com/interviews/debounce",
	solutionType: "algo-visualizer",
	status: "done",
	summary: "Delay function execution until calls settle.",
	approach: "Use a closure over a timer id.",
	complexity: "Time: O(1) per call, Space: O(1).",
	tags: ["timers", "closures"],
};

describe("QuestionDetailPage", () => {
	it("renders question details", () => {
		render(<QuestionDetailPage question={mockQuestion} />);

		expect(
			screen.getByRole("heading", { name: /Debounce/ }),
		).toBeInTheDocument();
		expect(screen.getByText("JavaScript functions")).toBeInTheDocument();
		expect(
			screen.getByText("Delay function execution until calls settle."),
		).toBeInTheDocument();
		expect(
			screen.getByText("Use a closure over a timer id."),
		).toBeInTheDocument();
		expect(
			screen.getByText("Time: O(1) per call, Space: O(1)."),
		).toBeInTheDocument();
	});

	it("renders section headings", () => {
		render(<QuestionDetailPage question={mockQuestion} />);

		expect(screen.getByText("Problem summary")).toBeInTheDocument();
		expect(screen.getByText("Approach")).toBeInTheDocument();
		expect(screen.getByText("Runnable solution")).toBeInTheDocument();
		expect(screen.getByText("Complexity / tradeoffs")).toBeInTheDocument();
	});

	it("renders writeup solution type", () => {
		const writeupQuestion: Question = {
			...mockQuestion,
			id: "gfe-autocomplete",
			solutionType: "writeup",
		};

		render(<QuestionDetailPage question={writeupQuestion} />);

		expect(
			screen.getByText(/This writeup follows the guidance/),
		).toBeInTheDocument();
	});

	it("renders code-and-tests fallback", () => {
		const codeQuestion: Question = {
			...mockQuestion,
			id: "gfe-other",
			solutionType: "code-and-tests",
		};

		render(<QuestionDetailPage question={codeQuestion} />);

		expect(
			screen.getByText(/Code-first solution is implemented with unit tests/),
		).toBeInTheDocument();
	});
});
