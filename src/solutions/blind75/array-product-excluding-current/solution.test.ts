import { getProductExcludingCurrentSteps } from "@/solutions/blind75/array-product-excluding-current/solution";

function getFinalResult(numbers: number[]) {
	const steps = getProductExcludingCurrentSteps(numbers);
	return steps.at(-1)?.result;
}

describe("getProductExcludingCurrentSteps", () => {
	it("returns [6,3,2] for [1,2,3]", () => {
		expect(getFinalResult([1, 2, 3])).toEqual([6, 3, 2]);
	});

	it("returns [0,6,0] for [2,0,3]", () => {
		expect(getFinalResult([2, 0, 3])).toEqual([0, 6, 0]);
	});

	it("returns [0,0,0,0] for [0,0,-1,1]", () => {
		expect(getFinalResult([0, 0, -1, 1])).toEqual([0, 0, 0, 0]);
	});

	it("handles two elements", () => {
		expect(getFinalResult([3, 4])).toEqual([4, 3]);
	});

	it("handles negative numbers", () => {
		expect(getFinalResult([-1, 2, -3])).toEqual([-6, 3, -2]);
	});

	it("final step has pass done", () => {
		const steps = getProductExcludingCurrentSteps([1, 2, 3]);
		expect(steps.at(-1)?.pass).toBe("done");
	});
});
