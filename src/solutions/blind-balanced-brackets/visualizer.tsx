"use client";

import { useMemo, useState } from "react";

import { EditableFieldPrompt } from "@/components/ui/tailwind-primitives";
import {
	StepVisualizerLayout,
	type CodeLine,
} from "@/components/visualizer/step-visualizer-layout";
import { getBalancedBracketSteps } from "@/solutions/blind-balanced-brackets/solution";

const CODE_LINES: CodeLine[] = [
	{ line: 1, code: 'const OPENING = new Set(["(", "{", "["]);' },
	{ line: 2, code: "const CLOSE_TO_OPEN = { ')': '(', '}': '{', ']': '[' };" },
	{ line: 3, code: "const OPEN_TO_CLOSE = { '(': ')', '{': '}', '[': ']' };" },
	{
		line: 4,
		code: "const VALID_TOKENS = new Set([...OPENING, ...Object.keys(CLOSE_TO_OPEN)]);",
	},
	{ line: 5, code: "" },
	{
		line: 6,
		code: "export function getBalancedBracketSteps(input: string) {",
	},
	{ line: 7, code: "  const steps: BracketStep[] = [];" },
	{ line: 8, code: "  const stack: string[] = [];" },
	{ line: 9, code: "" },
	{
		line: 10,
		code: "  const withinLength = input.length >= 1 && input.length <= 1000;",
	},
	{ line: 11, code: "  if (!withinLength) return false;" },
	{ line: 13, code: "" },
	{ line: 14, code: "  for (const token of input) {" },
	{ line: 15, code: "    const isValidToken = VALID_TOKENS.has(token);" },
	{ line: 16, code: "    if (!isValidToken) return false;" },
	{ line: 17, code: "    const isOpening = OPENING.has(token);" },
	{ line: 18, code: "    if (isOpening) { stack.push(token); continue; }" },
	{ line: 19, code: "" },
	{ line: 20, code: "    const expected = CLOSE_TO_OPEN[token];" },
	{ line: 21, code: "    const top = stack[stack.length - 1];" },
	{ line: 22, code: "    const valid = top === expected;" },
	{ line: 23, code: "    if (!valid) {" },
	{
		line: 24,
		code: '      const expectedClose = top ? OPEN_TO_CLOSE[top] : "opening bracket"; return false;',
	},
	{ line: 25, code: "    }" },
	{ line: 26, code: "    stack.pop();" },
	{ line: 27, code: "  }" },
	{ line: 28, code: "" },
	{ line: 30, code: "  return stack.length === 0;" },
	{ line: 31, code: "}" },
];

export function BalancedBracketsVisualizer() {
	const [input, setInput] = useState("([]){}");
	const [stepIndex, setStepIndex] = useState(0);

	const steps = useMemo(() => getBalancedBracketSteps(input), [input]);
	const step =
		steps[Math.min(stepIndex, Math.max(steps.length - 1, 0))] ?? null;
	const activeLine = step?.line ?? null;

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<EditableFieldPrompt
					htmlFor="bracket-input"
					label="Bracket input"
					hint="Type any bracket sequence here to see the algorithm step through your input."
				/>
				<input
					id="bracket-input"
					className="w-full rounded-md border border-card-border bg-background px-3 py-2 text-foreground"
					value={input}
					placeholder="Try: ([]){}, ([)], or ((("
					onChange={(event) => {
						setInput(event.target.value);
						setStepIndex(0);
					}}
				/>
			</div>

			<StepVisualizerLayout
				codeTitle="Balanced Brackets implementation"
				codeLines={CODE_LINES}
				activeLine={activeLine}
				traceTitle="Execution trace (step-by-step)"
				stepIndex={stepIndex}
				totalSteps={steps.length}
				onPrev={() => setStepIndex((current) => Math.max(current - 1, 0))}
				onNext={() =>
					setStepIndex((current) => Math.min(current + 1, steps.length - 1))
				}
				canPrev={steps.length > 0 && stepIndex > 0}
				canNext={steps.length > 0 && stepIndex < steps.length - 1}
			>
				{step ? (
					<div className="rounded border border-card-border bg-card-bg p-3">
						<p className="text-sm text-foreground">
							Current token: {step.token}
						</p>
						<p className="text-sm text-foreground">Action: {step.action}</p>
						<p className="text-sm text-foreground">
							Stack: {step.stack.length ? step.stack.join(" ") : "(empty)"}
						</p>
						<p
							className={`text-sm font-semibold ${
								step.validSoFar
									? "text-green-700 dark:text-green-400"
									: "text-red-700 dark:text-red-400"
							}`}
						>
							{step.validSoFar ? "Valid so far" : "Invalid"}
						</p>
					</div>
				) : (
					<p className="text-muted">No steps yet for this input.</p>
				)}
			</StepVisualizerLayout>
		</div>
	);
}
