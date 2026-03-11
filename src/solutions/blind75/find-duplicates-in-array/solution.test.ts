import {
	getDuplicateScanSteps,
	hasDuplicate,
} from "@/solutions/blind75/find-duplicates-in-array/solution";

describe("hasDuplicate", () => {
	it("returns false when all numbers are unique", () => {
		expect(hasDuplicate([5, 7, 1, 3])).toBe(false);
	});

	it("returns true when a duplicate exists", () => {
		expect(hasDuplicate([10, 7, 0, 0, 9])).toBe(true);
	});

	it("returns true when multiple values repeat", () => {
		expect(hasDuplicate([3, 2, 6, 5, 0, 3, 10, 3, 10, 5])).toBe(true);
	});

	it("returns false for empty input", () => {
		expect(hasDuplicate([])).toBe(false);
	});
});

describe("getDuplicateScanSteps", () => {
	it("ends with a duplicate step when a repeat is found", () => {
		const steps = getDuplicateScanSteps([4, 1, 4]);
		expect(steps.at(-1)?.outcome).toBe("duplicate");
	});

	it("ends with a complete step when all values are unique", () => {
		const steps = getDuplicateScanSteps([1, 2, 3]);
		expect(steps.at(-1)?.outcome).toBe("complete");
	});

	it("ends with a complete step for empty input", () => {
		const steps = getDuplicateScanSteps([]);
		expect(steps.at(-1)?.outcome).toBe("complete");
	});
});
