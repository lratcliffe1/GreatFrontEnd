export const END_OF_ARRAY_CONSTRAINTS = {
	minLength: 1,
	maxLength: 10_000,
	minValue: 0,
	maxValue: 100_000,
} as const;

export type EndOfArrayStep = {
	line: 2 | 4 | 5 | 6 | 7 | 9;
	index: number | null;
	maxReach: number;
	action: string;
	reached: boolean | null;
};

export function getEndOfArrayReachableSteps(numbers: number[]): EndOfArrayStep[] {
	const steps: EndOfArrayStep[] = [];
	const n = numbers.length;
	const lastIndex = n - 1;

	if (n === 0) return steps;

	const pushStep = (line: EndOfArrayStep["line"], index: number | null, maxReach: number, action: string, reached: boolean | null) => {
		steps.push({ line, index, maxReach, action, reached });
	};

	pushStep(2, null, 0, `Initialize maxReach = 0. Last index = ${lastIndex}.`, null);

	let maxReach = 0;

	for (let i = 0; i < n; i++) {
		const jump = numbers[i] ?? 0;

		pushStep(4, i, maxReach, `At index ${i}: numbers[${i}] = ${jump}.`, null);

		if (i > maxReach) {
			pushStep(5, i, maxReach, `i (${i}) > maxReach (${maxReach}) → cannot reach index ${i}. Return false.`, false);
			return steps;
		}

		const prevMaxReach = maxReach;
		maxReach = Math.max(maxReach, i + jump);
		pushStep(6, i, maxReach, `maxReach = max(${prevMaxReach}, ${i}+${jump}) = max(${prevMaxReach}, ${i + jump}) = ${maxReach}.`, null);

		if (maxReach >= lastIndex) {
			pushStep(7, i, maxReach, `maxReach (${maxReach}) >= lastIndex (${lastIndex}). Return true.`, true);
			return steps;
		}
	}

	pushStep(9, null, maxReach, `Reached end of loop. Return false.`, false);
	return steps;
}
