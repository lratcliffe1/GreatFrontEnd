import { parseCommaSeparatedIntegers, parseSingleInteger, PARSE_K_OPTIONS } from "@/lib/utils/parse-visualizer-user-inputs";

const CONSTRAINTS = { minLength: 1, maxLength: 5, minValue: 0, maxValue: 10 };

describe("parseCommaSeparatedIntegers", () => {
	it("parses valid input", () => {
		const result = parseCommaSeparatedIntegers("1, 2, 3", CONSTRAINTS);
		expect(result.data).toEqual([1, 2, 3]);
		expect(result.error).toBeNull();
	});

	it("returns error for empty input", () => {
		const result = parseCommaSeparatedIntegers("", CONSTRAINTS);
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/Enter between/);
	});

	it("returns error for empty entries", () => {
		const result = parseCommaSeparatedIntegers("1,,3", CONSTRAINTS);
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/without empty entries/);
	});

	it("returns error for non-integers", () => {
		const result = parseCommaSeparatedIntegers("1, a, 3", CONSTRAINTS);
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/whole numbers/);
	});

	it("returns error for out-of-range values", () => {
		const result = parseCommaSeparatedIntegers("1, 99, 3", CONSTRAINTS);
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/within/);
	});

	it("uses custom validator when provided", () => {
		const result = parseCommaSeparatedIntegers("1, 2", { minLength: 1, maxLength: 5 }, () => "Custom error");
		expect(result.data).toBeNull();
		expect(result.error).toBe("Custom error");
	});
});

describe("parseSingleInteger", () => {
	it("parses valid integer with default range", () => {
		expect(parseSingleInteger("42")).toEqual({ data: 42, error: null });
		expect(parseSingleInteger("-100")).toEqual({ data: -100, error: null });
	});

	it("parses with custom label and range", () => {
		expect(parseSingleInteger("4", { min: -10_000, max: 10_000, label: "target" })).toEqual({ data: 4, error: null });
	});

	it("returns error for empty input", () => {
		const result = parseSingleInteger("", { label: "target" });
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/Enter a target/);
	});

	it("returns error for non-integer", () => {
		const result = parseSingleInteger("2.5", { label: "target" });
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/must be an integer/);
	});

	it("returns error for out-of-range", () => {
		const result = parseSingleInteger("15000", { min: -10_000, max: 10_000, label: "target" });
		expect(result.data).toBeNull();
		expect(result.error).toMatch(/between -10000 and 10000/);
	});

	it("parses k-style positive integer with PARSE_K_OPTIONS", () => {
		expect(parseSingleInteger("2", PARSE_K_OPTIONS)).toEqual({ data: 2, error: null });
		expect(parseSingleInteger("1", PARSE_K_OPTIONS)).toEqual({ data: 1, error: null });
	});

	it("returns k-style errors for invalid input", () => {
		expect(parseSingleInteger("", PARSE_K_OPTIONS).error).toMatch(/Enter a value/);
		expect(parseSingleInteger("0", PARSE_K_OPTIONS).error).toMatch(/positive integer/);
		expect(parseSingleInteger("-1", PARSE_K_OPTIONS).error).toMatch(/positive integer/);
		expect(parseSingleInteger("2.5", PARSE_K_OPTIONS).error).toMatch(/positive integer/);
	});
});
