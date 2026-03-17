import { getSmallestInRotatedSteps } from "@/solutions/blind75/smallest-element-in-rotated-sorted-array/solution";

describe("getSmallestInRotatedSteps", () => {
	it("returns 1 for [1,2,3,4]", () => {
		const steps = getSmallestInRotatedSteps([1, 2, 3, 4]);
		expect(steps.at(-1)?.result).toBe(1);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns 1 for [3,4,1,2]", () => {
		const steps = getSmallestInRotatedSteps([3, 4, 1, 2]);
		expect(steps.at(-1)?.result).toBe(1);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns -5 for [6,7,8,-5,-4,2]", () => {
		const steps = getSmallestInRotatedSteps([6, 7, 8, -5, -4, 2]);
		expect(steps.at(-1)?.result).toBe(-5);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns single element for [4]", () => {
		const steps = getSmallestInRotatedSteps([4]);
		expect(steps.at(-1)?.result).toBe(4);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns min for unrotated array [2,3,4,5]", () => {
		const steps = getSmallestInRotatedSteps([2, 3, 4, 5]);
		expect(steps.at(-1)?.result).toBe(2);
	});

	it("returns min for fully rotated [5,1,2,3,4]", () => {
		const steps = getSmallestInRotatedSteps([5, 1, 2, 3, 4]);
		expect(steps.at(-1)?.result).toBe(1);
	});

	it("starts with init phase and mid is null", () => {
		const steps = getSmallestInRotatedSteps([3, 4, 1, 2]);
		expect(steps[0]?.phase).toBe("init");
		expect(steps[0]?.lo).toBe(0);
		expect(steps[0]?.hi).toBe(3);
		expect(steps[0]?.mid).toBeNull();
	});

	it("ends with found phase and result is the minimum value", () => {
		const steps = getSmallestInRotatedSteps([6, 7, 8, -5, -4, 2]);
		expect(steps.at(-1)?.phase).toBe("found");
		expect(steps.at(-1)?.result).toBe(-5);
	});

	it("includes compare steps with nums[mid] vs nums[hi] logic", () => {
		const steps = getSmallestInRotatedSteps([3, 4, 1, 2]);
		const compareSteps = steps.filter((s) => s.phase === "compare");
		expect(compareSteps.length).toBeGreaterThan(0);
		expect(compareSteps.some((s) => s.action.includes("nums[mid]"))).toBe(true);
	});
});
