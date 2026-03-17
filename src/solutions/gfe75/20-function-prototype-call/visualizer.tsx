"use client";

import { startTransition, useMemo, useState } from "react";

import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import { AppButton } from "@/components/ui/tailwind-primitives";
import {
	StepVisualizerLayout,
	TraceEmptyState,
	TracePanelContent,
	TraceLine,
	StepVisualizerPage,
	type CodeLine,
} from "@/components/visualizer/step-visualizer-layout";
import { useTraceFlash } from "@/components/visualizer/use-trace-flash";
import { useStepNavigation } from "@/components/visualizer/use-step-navigation";
import { parseSingleInteger } from "@/lib/utils/parse-visualizer-user-inputs";
import { getCallSteps } from "@/solutions/gfe75/20-function-prototype-call/solution";

const AGE_CONSTRAINTS = { min: 1, max: 100 };
const MULTIPLIER_CONSTRAINTS = { min: 1, max: 10 };

const CODE_LINES: CodeLine[] = [
	{ line: 1, code: "Function.prototype.myCall = function(thisArg, ...args) {" },
	{ line: 2, code: "  const obj = thisArg == null ? globalThis : Object(thisArg);" },
	{ line: 3, code: "  const key = Symbol('call');" },
	{ line: 4, code: "  obj[key] = this;" },
	{ line: 5, code: "  const result = obj[key](...args);" },
	{ line: 6, code: "  delete obj[key];" },
	{ line: 7, code: "  return result;" },
	{ line: 8, code: "};" },
	{ line: 9, code: "" },
	{ line: 10, code: "function multiplyAge(multiplier = 1) {" },
	{ line: 11, code: "  return this.age * multiplier;" },
	{ line: 12, code: "}" },
	{ line: 13, code: "" },
	{ line: 14, code: "export function multiplyAgeCall(age, multiplier) {" },
	{ line: 15, code: "  const thisArg = { age };" },
	{ line: 16, code: "  const result = multiplyAge.myCall(thisArg, multiplier);" },
	{ line: 17, code: "  return result;" },
	{ line: 18, code: "}" },
];

const INITIAL_AGE = "21";
const INITIAL_MULTIPLIER = "";

export function FunctionPrototypeCallVisualizer() {
	const [ageInput, setAgeInput] = useState(INITIAL_AGE);
	const [multiplierInput, setMultiplierInput] = useState(INITIAL_MULTIPLIER);
	const [stepIndex, setStepIndex] = useState(0);
	const { flash, tracePanelClassName } = useTraceFlash();

	const [appliedAge, setAppliedAge] = useState(() => {
		const r = parseSingleInteger(INITIAL_AGE, AGE_CONSTRAINTS);
		return r.data ?? 21;
	});
	const [appliedMultiplier, setAppliedMultiplier] = useState<number | null>(() => null);

	const debouncedAge = useDebouncedValue(ageInput, 300);
	const debouncedMultiplier = useDebouncedValue(multiplierInput, 300);

	const parsedAge = useMemo(() => parseSingleInteger(debouncedAge.trim(), { ...AGE_CONSTRAINTS, label: "age" }), [debouncedAge]);
	const parsedMultiplier = useMemo(() => {
		const t = debouncedMultiplier.trim();
		if (t === "") return { data: null as number | null, error: null as string | null };
		return parseSingleInteger(t, { ...MULTIPLIER_CONSTRAINTS, label: "multiplier" });
	}, [debouncedMultiplier]);

	const steps = useMemo(() => getCallSteps(appliedAge, appliedMultiplier), [appliedAge, appliedMultiplier]);

	const { step, onPrev, onNext, canPrev, canNext } = useStepNavigation(steps, stepIndex, setStepIndex);
	const activeLine = step?.line ?? null;

	const ageError = parsedAge.error;
	const multiplierError = parsedMultiplier.error;
	const canApply = !ageError && !multiplierError;

	function handleApply() {
		const ageResult = parseSingleInteger(ageInput, AGE_CONSTRAINTS);
		const multResult =
			multiplierInput.trim() === ""
				? { data: null as number | null, error: null as string | null }
				: parseSingleInteger(multiplierInput, MULTIPLIER_CONSTRAINTS);
		if (ageResult.error || ageResult.data === null) return;
		if (multResult.error) return;
		startTransition(() => {
			setAppliedAge(ageResult.data);
			setAppliedMultiplier(multResult.data);
			setStepIndex(0);
			flash();
		});
	}

	return (
		<StepVisualizerPage>
			<div className="space-y-3">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
					<div className="flex-1 min-w-0 space-y-1 sm:min-w-24">
						<label htmlFor="call-age-input" className="block text-sm font-medium text-foreground">
							age
						</label>
						<input
							id="call-age-input"
							type="text"
							className="w-full rounded-md border border-card-border bg-background px-3 py-2 text-foreground"
							placeholder="21"
							value={ageInput}
							onChange={(e) => setAgeInput(e.target.value)}
						/>
						{ageError && <p className="text-sm text-amber-600 dark:text-amber-400">{ageError}</p>}
					</div>
					<div className="flex-1 min-w-0 space-y-1 sm:min-w-24">
						<label htmlFor="call-multiplier-input" className="block text-sm font-medium text-foreground">
							multiplier
						</label>
						<input
							id="call-multiplier-input"
							type="text"
							placeholder="empty = 1"
							value={multiplierInput}
							onChange={(e) => setMultiplierInput(e.target.value)}
							className="w-full rounded-md border border-card-border bg-background px-2 py-2 text-foreground"
						/>
						{multiplierError && <p className="text-sm text-amber-600 dark:text-amber-400">{multiplierError}</p>}
					</div>
					<AppButton type="button" onClick={handleApply} disabled={!canApply}>
						Apply
					</AppButton>
				</div>
				<p className="text-xs text-slate-400">multiplyAgeCall(age, multiplier). Leave multiplier empty for default 1.</p>
			</div>

			<StepVisualizerLayout
				codeTitle="Calling multiplyAge.myCall"
				codeLines={CODE_LINES}
				activeLine={activeLine}
				tracePanelClassName={tracePanelClassName}
				stepIndex={stepIndex}
				totalSteps={steps.length}
				onPrev={onPrev}
				onNext={onNext}
				canPrev={canPrev}
				canNext={canNext}
			>
				{step ? (
					<TracePanelContent>
						<TraceLine>{step.action}</TraceLine>
						{step.result !== null && <TraceLine variant="emphasized">Result: {step.result}</TraceLine>}
					</TracePanelContent>
				) : (
					<TraceEmptyState />
				)}
			</StepVisualizerLayout>
		</StepVisualizerPage>
	);
}
