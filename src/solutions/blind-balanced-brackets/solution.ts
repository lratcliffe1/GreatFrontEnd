const OPENING = new Set(["(", "{", "["]);

const MATCHES: Record<string, string> = {
	")": "(",
	"}": "{",
	"]": "[",
};

const OPEN_TO_CLOSE: Record<string, string> = {
	"(": ")",
	"{": "}",
	"[": "]",
};

export type BracketStep = {
	token: string;
	stack: string[];
	action: string;
	validSoFar: boolean;
	line: 27 | 28 | 29 | 37 | 40 | 41 | 42 | 44 | 45 | 52 | 55 | 61;
};

export function getBalancedBracketSteps(input: string): BracketStep[] {
	const steps: BracketStep[] = [];
	const stack: string[] = [];
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

	for (const token of input) {
		pushStep(27, token, `Iterating token "${token}".`, true);
		const isOpening = OPENING.has(token);
		pushStep(28, token, `OPENING.has("${token}") => ${isOpening}.`, true);

		if (isOpening) {
			stack.push(token);
			pushStep(29, token, `Push "${token}" to stack.`, true);
			pushStep(37, token, "Continue to next token.", true);
			continue;
		}

		const expected = MATCHES[token];
		const top = stack[stack.length - 1];
		const valid = top === expected;
		pushStep(
			40,
			token,
			`Expected opening for "${token}" is "${expected ?? "?"}".`,
			true,
		);
		pushStep(41, token, `Top of stack is "${top ?? "(none)"}".`, true);
		pushStep(42, token, `top === expected => ${valid}.`, valid);
		pushStep(44, token, `!valid => ${!valid}.`, valid);

		if (!valid) {
			pushStep(
				45,
				token,
				`Mismatch. Expected ${top ? OPEN_TO_CLOSE[top] : "opening bracket"}, got "${token}".`,
				false,
			);
			pushStep(
				52,
				token,
				"Early return due to invalid bracket ordering.",
				false,
			);
			return steps;
		}

		stack.pop();
		pushStep(55, token, `Pop stack for closing token "${token}".`, true);
	}

	pushStep(
		61,
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
