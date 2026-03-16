export const PRODUCT_EXCLUDING_CURRENT_CONSTRAINTS = {
	minLength: 2,
	maxLength: 1000,
	minValue: -10,
	maxValue: 10,
} as const;

export type ProductExcludingCurrentStep = {
	line: 2 | 3 | 5 | 6 | 8 | 10 | 11 | 13;
	pass: "left" | "right" | "done";
	index: number | null;
	value: number | null;
	left: number;
	right: number;
	result: number[];
	action: string;
};

export function getProductExcludingCurrentSteps(numbers: number[]): ProductExcludingCurrentStep[] {
	const steps: ProductExcludingCurrentStep[] = [];
	const n = numbers.length;
	const result: number[] = new Array(n).fill(0);
	let left = 1;
	let right = 1;

	const pushStep = (
		line: ProductExcludingCurrentStep["line"],
		pass: ProductExcludingCurrentStep["pass"],
		index: number | null,
		value: number | null,
		action: string,
	) => {
		steps.push({
			line,
			pass,
			index,
			value,
			left,
			right,
			result: [...result],
			action,
		});
	};

	pushStep(2, "left", null, null, `Initialize result array of length ${n}.`);
	pushStep(3, "left", null, null, "Initialize left = 1 (product of elements to the left of index 0).");

	for (let i = 0; i < n; i++) {
		const val = numbers[i] as number;
		pushStep(5, "left", i, val, `result[${i}] = left = ${left}.`);
		result[i] = left;
		left *= val;
		pushStep(6, "left", i, val, `left *= numbers[${i}] = ${val}. New left = ${left}.`);
	}

	pushStep(8, "right", null, null, "Initialize right = 1 (product of elements to the right of last index).");

	for (let i = n - 1; i >= 0; i--) {
		const val = numbers[i] as number;
		const before = result[i] as number;
		pushStep(10, "right", i, val, `result[${i}] *= right => ${before} × ${right} = ${before * right}.`);
		result[i] = (result[i] as number) * right;
		right *= val;
		pushStep(11, "right", i, val, `right *= numbers[${i}] = ${val}. New right = ${right}.`);
	}

	const final = result.map((v) => (Object.is(v, -0) ? 0 : v));
	steps.push({
		line: 13,
		pass: "done",
		index: null,
		value: null,
		left,
		right,
		result: final,
		action: `Return [${final.join(", ")}].`,
	});

	return steps;
}
