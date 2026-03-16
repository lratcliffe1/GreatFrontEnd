import { getEndOfArrayReachableSteps } from "@/solutions/blind75/end-of-array-reachable/solution";

describe("getEndOfArrayReachableSteps", () => {
	it("returns steps with reached true for [4,1,0,0,2,3]", () => {
		const steps = getEndOfArrayReachableSteps([4, 1, 0, 0, 2, 0, 3]);
		expect(steps.some((s) => s.reached === true)).toBe(true);
	});

	it("returns steps with reached false for [1,0,0,0]", () => {
		const steps = getEndOfArrayReachableSteps([1, 0, 0, 0]);
		expect(steps.some((s) => s.reached === false)).toBe(true);
	});

	it("returns empty steps for empty array", () => {
		expect(getEndOfArrayReachableSteps([])).toHaveLength(0);
	});
});
