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
	line: 8 | 9 | 10 | 11 | 13 | 14 | 15 | 16 | 17 | 18 | 20 | 22;
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
		pushStep(8, token, `Iterating token "${token}".`, true);
		const isOpening = OPENING.has(token);
		pushStep(9, token, `OPENING.has("${token}") => ${isOpening}.`, true);

		if (isOpening) {
			stack.push(token);
			pushStep(10, token, `Push "${token}" to stack.`, true);
			pushStep(11, token, "Continue to next token.", true);
			continue;
		}

		const expected = MATCHES[token];
		const top = stack[stack.length - 1];
		const valid = top === expected;
		pushStep(
			13,
			token,
			`Expected opening for "${token}" is "${expected ?? "?"}".`,
			true,
		);
		pushStep(14, token, `Top of stack is "${top ?? "(none)"}".`, true);
		pushStep(15, token, `top === expected => ${valid}.`, valid);
		pushStep(16, token, `!valid => ${!valid}.`, valid);

		if (!valid) {
			pushStep(
				17,
				token,
				`Mismatch. Expected ${top ? OPEN_TO_CLOSE[top] : "opening bracket"}, got "${token}".`,
				false,
			);
			pushStep(
				18,
				token,
				"Early return due to invalid bracket ordering.",
				false,
			);
			return steps;
		}

		stack.pop();
		pushStep(20, token, `Pop stack for closing token "${token}".`, true);
	}

	pushStep(
		22,
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
