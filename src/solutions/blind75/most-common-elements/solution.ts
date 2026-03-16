export const MOST_COMMON_ELEMENTS_CONSTRAINTS = {
	minLength: 1,
	maxLength: 1000,
	minValue: -10_000,
	maxValue: 10_000,
} as const;

export type MostCommonStep = {
	line: 2 | 4 | 6 | 7 | 8;
	index: number | null;
	value: number | null;
	freq: Map<number, number>;
	sorted: [number, number][] | null;
	action: string;
	result: number[] | null;
};

export function getMostCommonElementsSteps(numbers: number[], k: number): MostCommonStep[] {
	const steps: MostCommonStep[] = [];
	const freq = new Map<number, number>();

	const pushStep = (
		line: MostCommonStep["line"],
		index: number | null,
		value: number | null,
		action: string,
		result: number[] | null = null,
		sorted: [number, number][] | null = null,
	) => {
		steps.push({
			line,
			index,
			value,
			freq: new Map(freq),
			sorted,
			action,
			result,
		});
	};

	pushStep(2, null, null, "Initialize empty frequency map.", null, null);

	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i] as number;
		freq.set(n, (freq.get(n) ?? 0) + 1);
		const newCount = freq.get(n) ?? 0;

		pushStep(4, i, n, `Process numbers[${i}] = ${n}. Increment count: freq[${n}] = ${newCount}.`, null, null);
	}

	const freqStr = [...freq.entries()]
		.sort((a, b) => a[0] - b[0])
		.map(([n, c]) => `${n}:${c}`)
		.join(", ");
	pushStep(6, null, null, `Counting complete. Frequency map: {${freqStr}}`, null, null);

	const sorted = [...freq.entries()].sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : a[0] - b[0]));
	pushStep(7, null, null, `Sort entries by frequency (descending).`, null, sorted);

	const result = sorted.slice(0, k).map(([n]) => n);
	pushStep(8, null, null, `Take top k = ${k} elements.`, result, sorted);
	pushStep(8, null, null, `Return [${result.join(", ")}].`, result, sorted);

	return steps;
}
