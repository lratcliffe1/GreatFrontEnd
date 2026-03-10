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
});

describe("getBalancedBracketSteps", () => {
	it("includes end step", () => {
		const steps = getBalancedBracketSteps("[]");
		expect(steps[steps.length - 1]?.token).toBe("end");
	});
});
