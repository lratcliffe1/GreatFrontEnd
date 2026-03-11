import {
	getBalancedBracketSteps,
	isBalancedBrackets,
} from "@/solutions/blind-balanced-brackets/solution";

describe("isBalancedBrackets", () => {
	it("returns true for balanced input", () => {
		expect(isBalancedBrackets("([]){}")).toBe(true);
	});

	it("returns false for invalid ordering", () => {
		expect(isBalancedBrackets("([)]")).toBe(false);
	});

	it("returns false when input is empty", () => {
		expect(isBalancedBrackets("")).toBe(false);
	});

	it("returns false when input exceeds 1000 characters", () => {
		expect(isBalancedBrackets("(".repeat(1001))).toBe(false);
	});

	it("returns false for unsupported characters", () => {
		expect(isBalancedBrackets("([a])")).toBe(false);
	});
});

describe("getBalancedBracketSteps", () => {
	it("includes end step", () => {
		const steps = getBalancedBracketSteps("[]");
		expect(steps[steps.length - 1]?.token).toBe("end");
	});

	it("ends early for invalid length", () => {
		const steps = getBalancedBracketSteps("");
		expect(steps[steps.length - 1]?.validSoFar).toBe(false);
	});

	it("ends early for unsupported characters", () => {
		const steps = getBalancedBracketSteps("a");
		expect(steps[steps.length - 1]?.validSoFar).toBe(false);
	});
});
