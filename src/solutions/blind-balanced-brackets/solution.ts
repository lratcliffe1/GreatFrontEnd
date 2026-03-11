type OpeningBracket = "(" | "{" | "[";
type ClosingBracket = ")" | "}" | "]";

const OPENING = new Set<string>(["(", "{", "["]);

const CLOSE_TO_OPEN: Record<ClosingBracket, OpeningBracket> = {
	")": "(",
	"}": "{",
	"]": "[",
};

const OPEN_TO_CLOSE: Record<OpeningBracket, ClosingBracket> = {
	"(": ")",
	"{": "}",
	"[": "]",
};

const VALID_TOKENS = new Set<string>([
	...OPENING,
	...Object.keys(CLOSE_TO_OPEN),
]);

export type BracketStep = {
	token: string;
	stack: string[];
	action: string;
	validSoFar: boolean;
	line:
		| 10
		| 11
		| 12
		| 14
		| 15
		| 16
		| 17
		| 18
		| 20
		| 21
		| 22
		| 23
		| 24
		| 26
		| 30;
};

export function getBalancedBracketSteps(input: string): BracketStep[] {
	const steps: BracketStep[] = [];
	const stack: OpeningBracket[] = [];
	const pushStep = (
		line: BracketStep["line"],
		token: string,
		action: string,
		validSoFar: boolean,
	) => {
		steps.push({
			token,
			stack: [...stack],
			action,
			validSoFar,
			line,
		});
	};

	const withinLength = input.length >= 1 && input.length <= 1000;
	pushStep(10, "input", `Input length is ${input.length}.`, withinLength);
	pushStep(
		11,
		"input",
		`Length within [1, 1000] => ${withinLength}.`,
		withinLength,
	);
	if (!withinLength) {
		pushStep(12, "input", "Early return due to invalid input length.", false);
		return steps;
	}

	for (const token of input) {
		pushStep(14, token, `Iterating token "${token}".`, true);
		const isValidToken = VALID_TOKENS.has(token);
		pushStep(
			15,
			token,
			`Supported bracket token => ${isValidToken}.`,
			isValidToken,
		);
		if (!isValidToken) {
			pushStep(16, token, "Early return due to unsupported character.", false);
			return steps;
		}

		const isOpening = OPENING.has(token);
		pushStep(17, token, `OPENING.has("${token}") => ${isOpening}.`, true);

		if (isOpening) {
			stack.push(token as OpeningBracket);
			pushStep(18, token, `Push "${token}" to stack.`, true);
			continue;
		}

		const expected = CLOSE_TO_OPEN[token as ClosingBracket];
		const top = stack[stack.length - 1];
		const valid = top === expected;
		pushStep(
			20,
			token,
			`Expected opening for "${token}" is "${expected ?? "?"}".`,
			true,
		);
		pushStep(21, token, `Top of stack is "${top ?? "(none)"}".`, true);
		pushStep(22, token, `top === expected => ${valid}.`, valid);

		if (!valid) {
			pushStep(
				23,
				token,
				`Mismatch. Expected ${top ? OPEN_TO_CLOSE[top] : "opening bracket"}, got "${token}".`,
				false,
			);
			pushStep(
				24,
				token,
				"Early return due to invalid bracket ordering.",
				false,
			);
			return steps;
		}

		stack.pop();
		pushStep(26, token, `Pop stack for closing token "${token}".`, true);
	}

	pushStep(
		30,
		"end",
		stack.length === 0
			? "Return true: all brackets matched."
			: "Return false: unclosed openings remain.",
		stack.length === 0,
	);

	return steps;
}

export function isBalancedBrackets(input: string) {
	const steps = getBalancedBracketSteps(input);
	return steps[steps.length - 1]?.validSoFar ?? false;
}
