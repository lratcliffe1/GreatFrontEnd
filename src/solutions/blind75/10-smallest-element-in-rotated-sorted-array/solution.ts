export const SMALLEST_ROTATED_CONSTRAINTS = {
	minLength: 1,
	maxLength: 1000,
	minValue: -10_000,
	maxValue: 10_000,
} as const;

export type SmallestRotatedStepPhase = "init" | "compare" | "found";

export type SmallestRotatedStep = {
	phase: SmallestRotatedStepPhase;
	lo: number;
	hi: number;
	mid: number | null;
	midVal: number | null;
	hiVal: number | null;
	action: string;
	result: number | null;
	line: 2 | 4 | 6 | 7 | 9 | 10 | 12;
};

/**
 * Returns step-by-step trace for finding the minimum in a rotated sorted array.
 * Compare nums[mid] with nums[hi]: if nums[mid] < nums[hi], min is in [lo..mid]; else in [mid+1..hi].
 * Time: O(log n), Space: O(1).
 */
export function getSmallestInRotatedSteps(numbers: number[]): SmallestRotatedStep[] {
	const steps: SmallestRotatedStep[] = [];
	let lo = 0;
	let hi = numbers.length - 1;

	const pushStep = (
		line: SmallestRotatedStep["line"],
		phase: SmallestRotatedStepPhase,
		action: string,
		result: number | null,
		midVal: number | null = null,
		hiVal: number | null = null,
		midOverride?: number | null,
	) => {
		const mid = midOverride !== undefined ? midOverride : lo < hi ? Math.floor((lo + hi) / 2) : null;
		steps.push({
			phase,
			lo,
			hi,
			mid,
			midVal: midVal ?? (mid != null ? (numbers[mid] as number) : null),
			hiVal: hiVal ?? (hi >= 0 ? (numbers[hi] as number) : null),
			action,
			result,
			line,
		});
	};

	pushStep(2, "init", "Set lo and hi values", null, null, null, null);

	while (lo < hi) {
		const mid = Math.floor((lo + hi) / 2);
		const midVal = numbers[mid] as number;
		const hiVal = numbers[hi] as number;

		pushStep(4, "compare", "Calculate mid index", null, midVal, hiVal);

		if (midVal < hiVal) {
			pushStep(6, "compare", `nums[mid] (${midVal}) < nums[hi] (${hiVal}), therefore Right [${midVal}..${hiVal}] sorted.`, null);
			pushStep(7, "compare", `Min in left half. Search that side. hi = mid = ${mid}.`, null);
			hi = mid;
		} else {
			pushStep(9, "compare", `nums[mid] (${midVal}) > nums[hi] (${hiVal}), therefore Left [${numbers[lo]}..${midVal}] sorted.`, null);
			pushStep(10, "compare", `Min in right half. Search other side. lo = mid + 1 = ${mid + 1}.`, null);
			lo = mid + 1;
		}
	}

	const minVal = numbers[lo] as number;
	pushStep(12, "found", `numbers[lo] (${minVal}) is minimum. Return ${minVal}.`, minVal, minVal, minVal, lo);
	return steps;
}
