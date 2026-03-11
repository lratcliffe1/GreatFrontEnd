import { getBalancedBracketInputError, getBalancedBracketSteps, isBalancedBrackets } from "@/solutions/blind75/balanced-brackets/solution";

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

describe("getBalancedBracketInputError", () => {
	it("reports invalid length", () => {
		expect(getBalancedBracketInputError("")).toMatch(/Enter between 1 and 1000/);
	});

	it("reports unsupported characters", () => {
		expect(getBalancedBracketInputError("([a])")).toMatch(/Use only bracket characters/);
	});
});

describe("getBalancedBracketSteps", () => {
	it("includes end step", () => {
		const steps = getBalancedBracketSteps("[]");
		expect(steps[steps.length - 1]?.token).toBe("end");
	});

	it("ends early for invalid ordering", () => {
		const steps = getBalancedBracketSteps("([)]");
		expect(steps[steps.length - 1]?.validSoFar).toBe(false);
	});
});
