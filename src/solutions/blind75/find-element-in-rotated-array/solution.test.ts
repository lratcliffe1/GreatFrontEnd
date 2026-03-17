import { getRotatedSearchSteps } from "@/solutions/blind75/find-element-in-rotated-array/solution";

describe("getRotatedSearchSteps", () => {
	it("returns result 2 for [0,1,2,3,4] and target 2", () => {
		const steps = getRotatedSearchSteps([0, 1, 2, 3, 4], 2);
		expect(steps.at(-1)?.result).toBe(2);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns result 3 for [2,3,4,0,1] and target 0", () => {
		const steps = getRotatedSearchSteps([2, 3, 4, 0, 1], 0);
		expect(steps.at(-1)?.result).toBe(3);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns -1 for [4] and target 2", () => {
		const steps = getRotatedSearchSteps([4], 2);
		expect(steps.at(-1)?.result).toBe(-1);
		expect(steps.at(-1)?.phase).toBe("notFound");
	});

	it("returns 0 for single-element array when target matches", () => {
		const steps = getRotatedSearchSteps([4], 4);
		expect(steps.at(-1)?.result).toBe(0);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("returns -1 when target not in array", () => {
		const steps = getRotatedSearchSteps([2, 3, 4, 0, 1], 5);
		expect(steps.at(-1)?.result).toBe(-1);
		expect(steps.at(-1)?.phase).toBe("notFound");
	});

	it("finds element in unrotated array", () => {
		const steps = getRotatedSearchSteps([1, 2, 3, 4, 5], 3);
		expect(steps.at(-1)?.result).toBe(2);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("finds element at rotation pivot", () => {
		const steps = getRotatedSearchSteps([4, 5, 6, 7, 0, 1, 2], 0);
		expect(steps.at(-1)?.result).toBe(4);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("finds element in fully rotated array (one rotation)", () => {
		const steps = getRotatedSearchSteps([1, 2, 3, 4, 5], 5);
		expect(steps.at(-1)?.result).toBe(4);
		expect(steps.at(-1)?.phase).toBe("found");
	});

	it("starts with init phase and mid is null", () => {
		const steps = getRotatedSearchSteps([2, 3, 4, 0, 1], 0);
		expect(steps[0]?.phase).toBe("init");
		expect(steps[0]?.lo).toBe(0);
		expect(steps[0]?.hi).toBe(4);
		expect(steps[0]?.mid).toBeNull();
	});

	it("includes compare steps with lo, hi, mid", () => {
		const steps = getRotatedSearchSteps([2, 3, 4, 0, 1], 0);
		const compareSteps = steps.filter((s) => s.phase === "compare");
		expect(compareSteps.length).toBeGreaterThan(0);
		expect(compareSteps.every((s) => s.mid != null && s.midVal != null)).toBe(true);
	});
});
