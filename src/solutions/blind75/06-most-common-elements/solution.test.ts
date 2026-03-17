import { getMostCommonElementsSteps } from "@/solutions/blind75/06-most-common-elements/solution";

describe("getMostCommonElementsSteps", () => {
	it("returns final result [4, 5] for [4,4,4,6,6,5,5,5], k=2", () => {
		const steps = getMostCommonElementsSteps([4, 4, 4, 6, 6, 5, 5, 5], 2);
		const last = steps.at(-1);
		expect(last?.result).toHaveLength(2);
		expect(last?.result).toContain(4);
		expect(last?.result).toContain(5);
	});

	it("returns final result [7, 9, 8] for [7,7,7,8,8,9,9,9], k=3", () => {
		const steps = getMostCommonElementsSteps([7, 7, 7, 8, 8, 9, 9, 9], 3);
		const last = steps.at(-1);
		expect(last?.result).toHaveLength(3);
		expect(last?.result).toContain(7);
		expect(last?.result).toContain(8);
		expect(last?.result).toContain(9);
	});

	it("returns final result [10] for [10,10,10,10,10], k=1", () => {
		const steps = getMostCommonElementsSteps([10, 10, 10, 10, 10], 1);
		expect(steps.at(-1)?.result).toEqual([10]);
	});

	it("includes init step", () => {
		const steps = getMostCommonElementsSteps([1, 2, 2], 1);
		expect(steps.at(0)?.line).toBe(2);
		expect(steps.at(0)?.action).toContain("Initialize");
	});

	it("returns empty result for empty array", () => {
		const steps = getMostCommonElementsSteps([], 1);
		expect(steps.at(-1)?.result).toEqual([]);
	});
});
