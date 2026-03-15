import { QuestionStatus, SolutionType, Track } from "@/content/questions";
import { getSolutionRenderer, prefetchSolutionRenderer } from "@/features/questions/solution-registry";
import { createMockQuestion } from "@/fixtures/questions";

describe("getSolutionRenderer", () => {
	it("returns null for code_and_tests solution type", () => {
		const question = createMockQuestion({ solutionType: SolutionType.CodeAndTests, status: QuestionStatus.Done });
		expect(getSolutionRenderer(question)).toBeNull();
	});

	it("returns null for writeup solution type", () => {
		const question = createMockQuestion({ solutionType: SolutionType.Writeup, status: QuestionStatus.Done });
		expect(getSolutionRenderer(question)).toBeNull();
	});

	it("returns null when status is not done", () => {
		const question = createMockQuestion({ solutionType: SolutionType.AlgoVisualizer, status: QuestionStatus.Todo });
		expect(getSolutionRenderer(question)).toBeNull();
	});

	it("returns null when no loader exists for track/path", () => {
		const question = createMockQuestion({
			track: Track.Gfe75,
			path: "non-existent-question",
			solutionType: SolutionType.AlgoVisualizer,
			status: QuestionStatus.Done,
		});
		expect(getSolutionRenderer(question)).toBeNull();
	});

	it("returns a component when loader exists for gfe75/debounce", () => {
		const question = createMockQuestion({
			track: Track.Gfe75,
			path: "debounce",
			solutionType: SolutionType.AlgoVisualizer,
			status: QuestionStatus.Done,
		});
		const renderer = getSolutionRenderer(question);
		expect(renderer).not.toBeNull();
		expect(renderer).toBeDefined();
	});
});

describe("prefetchSolutionRenderer", () => {
	it("does not throw for runnable question with loader", () => {
		const question = createMockQuestion({
			track: Track.Gfe75,
			path: "debounce",
			solutionType: SolutionType.AlgoVisualizer,
			status: QuestionStatus.Done,
		});
		expect(() => prefetchSolutionRenderer(question)).not.toThrow();
	});

	it("does not throw for non-runnable question", () => {
		const question = createMockQuestion({ solutionType: SolutionType.CodeAndTests, status: QuestionStatus.Done });
		expect(() => prefetchSolutionRenderer(question)).not.toThrow();
	});

	it("does not throw when status is not done", () => {
		const question = createMockQuestion({
			track: Track.Gfe75,
			path: "debounce",
			solutionType: SolutionType.AlgoVisualizer,
			status: QuestionStatus.Todo,
		});
		expect(() => prefetchSolutionRenderer(question)).not.toThrow();
	});
});
