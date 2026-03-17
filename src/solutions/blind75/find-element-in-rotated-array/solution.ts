export const ROTATED_ARRAY_CONSTRAINTS = {
	minLength: 1,
	maxLength: 1000,
	minValue: -10_000,
	maxValue: 10_000,
} as const;

export type RotatedSearchStepPhase = "init" | "compare" | "found" | "notFound";

export type RotatedSearchStep = {
	phase: RotatedSearchStepPhase;
	lo: number;
	hi: number;
	mid: number | null;
	midVal: number | null;
	action: string;
	result: number | null;
	line: 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 14;
};

/**
 * Returns step-by-step trace for binary search in a sorted and rotated array.
 * At each step, one half [lo..mid] or [mid..hi] is sorted; search there if target is in range.
 * Time: O(log n), Space: O(1).
 */
export function getRotatedSearchSteps(numbers: number[], target: number): RotatedSearchStep[] {
	const steps: RotatedSearchStep[] = [];
	let lo = 0;
	let hi = numbers.length - 1;

	const pushStep = (
		line: RotatedSearchStep["line"],
		phase: RotatedSearchStepPhase,
		action: string,
		result: number | null,
		midVal: number | null = null,
		midOverride?: number | null,
	) => {
		const mid = midOverride !== undefined ? midOverride : lo <= hi ? Math.floor((lo + hi) / 2) : null;
		steps.push({
			phase,
			lo,
			hi,
			mid,
			midVal: midVal ?? (mid != null ? (numbers[mid] as number) : null),
			action,
			result,
			line,
		});
	};

	pushStep(2, "init", "Set lo and hi values", null, null, null);

	while (lo <= hi) {
		const mid = Math.floor((lo + hi) / 2);
		const midVal = numbers[mid] as number;

		pushStep(4, "compare", "Calculate mid index", null, midVal);

		if (midVal === target) {
			pushStep(5, "found", `numbers[mid] (${midVal}) === target (${target}). Return ${mid}.`, mid);
			return steps;
		}

		const leftSorted = (numbers[lo] as number) <= midVal;
		if (leftSorted) {
			const targetInLeft = target >= (numbers[lo] as number) && target < midVal;
			pushStep(6, "compare", `nums[lo] <= nums[mid], therefore Left [${numbers[lo]}..${midVal}] sorted.`, null);
			if (targetInLeft) {
				pushStep(7, "compare", `Target ${target} in sorted side. Search that side. hi = mid - 1 = ${mid - 1}.`, null);
				hi = mid - 1;
			} else {
				pushStep(8, "compare", `Target ${target} not in sorted side. Search other side. lo = mid + 1 = ${mid + 1}.`, null);
				lo = mid + 1;
			}
		} else {
			const targetInRight = target > midVal && target <= (numbers[hi] as number);
			pushStep(9, "compare", `nums[lo] > nums[mid], therefore Right [${midVal}..${numbers[hi]}] sorted.`, null);
			if (targetInRight) {
				pushStep(10, "compare", `Target ${target} in sorted side. Search that side. lo = mid + 1 = ${mid + 1}.`, null);
				lo = mid + 1;
			} else {
				pushStep(11, "compare", `Target ${target} not in sorted side. Search other side. hi = mid - 1 = ${mid - 1}.`, null);
				hi = mid - 1;
			}
		}
	}

	pushStep(14, "notFound", `lo > hi. Target ${target} not in array. Return -1.`, -1);
	return steps;
}
