/**
 * Parse visualizer user inputs.
 *
 * - parseCommaSeparatedIntegers: Parse comma-separated lists with length/value constraints.
 * - parseSingleInteger: Parse a single integer with optional min/max bounds.
 */
export type CommaSeparatedIntegerConstraints = {
	minLength: number;
	maxLength: number;
	minValue?: number;
	maxValue?: number;
};

export type ParseResult<T> =
	| {
			data: T;
			error: null;
	  }
	| {
			data: null;
			error: string;
	  };

/**
 * Parse comma-separated integers with common validation.
 * Optionally accepts a custom validator for problem-specific rules.
 */
export function parseCommaSeparatedIntegers(
	rawInput: string,
	constraints: CommaSeparatedIntegerConstraints,
	validate?: (numbers: number[]) => string | null,
): ParseResult<number[]> {
	const trimmed = rawInput.trim();
	if (!trimmed) {
		return {
			data: null,
			error: `Enter between ${constraints.minLength} and ${constraints.maxLength} comma-separated integers.`,
		};
	}

	const parts = trimmed.split(",").map((part) => part.trim());
	if (parts.some((part) => part.length === 0)) {
		return {
			data: null,
			error: "Use comma-separated integers without empty entries.",
		};
	}

	const numbers = parts.map((part) => Number(part));
	if (numbers.some((value) => !Number.isInteger(value))) {
		return {
			data: null,
			error: "Use whole numbers only, for example: 5, 7, 1, 3",
		};
	}

	if (parts.length < constraints.minLength || parts.length > constraints.maxLength) {
		return {
			data: null,
			error: `Use between ${constraints.minLength} and ${constraints.maxLength} integers.`,
		};
	}

	if (constraints.minValue !== undefined || constraints.maxValue !== undefined) {
		const min = constraints.minValue ?? -Infinity;
		const max = constraints.maxValue ?? Infinity;
		const outOfRange = numbers.find((value) => value < min || value > max);
		if (outOfRange !== undefined) {
			return {
				data: null,
				error: `Each integer must stay within ${min} and ${max}.`,
			};
		}
	}

	const customError = validate?.(numbers);
	if (customError) {
		return { data: null, error: customError };
	}

	return { data: numbers, error: null };
}

export type ParseSingleIntegerOptions = {
	min?: number;
	max?: number;
	label?: string;
	emptyError?: string;
	rangeError?: string;
};

/** Options for parsing k (positive integer) in "top k" style problems. */
export const PARSE_K_OPTIONS: ParseSingleIntegerOptions = {
	min: 1,
	max: Number.MAX_SAFE_INTEGER,
	label: "k",
	emptyError: "Enter a value for k.",
	rangeError: "k must be a positive integer.",
};

/**
 * Parse a single integer with optional min/max bounds.
 * Use for target values, k, or any single-integer input.
 */
export function parseSingleInteger(raw: string, options: ParseSingleIntegerOptions = {}): ParseResult<number> {
	const { min = -10_000, max = 10_000, label = "value", emptyError = `Enter a ${options.label ?? "value"}.`, rangeError } = options;
	const trimmed = raw.trim();
	if (!trimmed) return { data: null, error: emptyError };
	const num = Number(trimmed);
	if (!Number.isInteger(num)) return { data: null, error: rangeError ?? `${label} must be an integer.` };
	if (num < min || num > max) return { data: null, error: rangeError ?? `${label} must be between ${min} and ${max}.` };
	return { data: num, error: null };
}
