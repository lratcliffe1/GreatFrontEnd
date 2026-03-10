"use client";

import { useMemo, useRef, useState } from "react";

import {
	StepVisualizerLayout,
	type CodeLine,
} from "@/components/visualizer/step-visualizer-layout";
import {
	debounce,
	type DebounceTraceEvent,
} from "@/solutions/gfe-debounce/solution";

const CODE_LINES: CodeLine[] = [
	{ line: 13, code: "return (...args) => {" },
	{ line: 15, code: "  const hasActiveTimeout = timeoutId !== null;" },
	{ line: 16, code: "  if (hasActiveTimeout) {" },
	{ line: 17, code: "    clearTimeout(timeoutId);" },
	{ line: null, code: "  }" },
	{
		line: 19,
		code: "  onTrace?.({ line: 19, message: 'Assigning a new timeout.' });",
	},
	{ line: 20, code: "  timeoutId = setTimeout(() => {" },
	{ line: 21, code: "    onTrace?.({ line: 21, message: 'Timer fired.' });" },
	{ line: 22, code: "    callback(...args);" },
	{ line: null, code: "  }, delayMs);" },
	{ line: null, code: "};" },
];

type TraceLog = {
	id: number;
	at: string;
	line: number;
	message: string;
};

function toClockTime(timestamp: number) {
	return new Date(timestamp).toLocaleTimeString();
}

export function DebounceVisualizer() {
	const [delayMs, setDelayMs] = useState(500);
	const [traceLogs, setTraceLogs] = useState<TraceLog[]>([]);
	const [stepIndex, setStepIndex] = useState(0);
	const [executedPayloads, setExecutedPayloads] = useState<string[]>([]);
	const clickCounterRef = useRef(0);

	const currentStep = traceLogs[stepIndex] ?? null;
	const activeLine = currentStep?.line ?? null;

	const debounced = useMemo(() => {
		return debounce<[string]>(
			(payload) => {
				setExecutedPayloads((previous) => [...previous, payload]);
			},
			delayMs,
			(event: DebounceTraceEvent) => {
				setTraceLogs((previous) => {
					const next = [
						...previous,
						{
							id: Date.now() + previous.length,
							at: toClockTime(Date.now()),
							line: event.line,
							message: event.message,
						},
					];
					return next;
				});
			},
		);
	}, [delayMs]);

	function triggerDebouncedCall() {
		clickCounterRef.current += 1;
		debounced(`click-${clickCounterRef.current}`);
	}

	function runRapidScenario() {
		setTraceLogs([]);
		setStepIndex(0);
		setExecutedPayloads([]);
		clickCounterRef.current += 1;
		debounced(`scenario-${clickCounterRef.current}`);
		setTimeout(() => {
			clickCounterRef.current += 1;
			debounced(`scenario-${clickCounterRef.current}`);
		}, 120);
		setTimeout(() => {
			clickCounterRef.current += 1;
			debounced(`scenario-${clickCounterRef.current}`);
		}, 240);
	}

	return (
		<div className="space-y-5">
			<div className="flex flex-wrap items-center gap-3">
				<label
					className="text-sm font-medium text-slate-700"
					htmlFor="delay-ms"
				>
					Delay (ms)
				</label>
				<input
					id="delay-ms"
					type="number"
					min={100}
					step={100}
					value={delayMs}
					onChange={(event) => setDelayMs(Number(event.target.value) || 100)}
					className="w-28 rounded-md border border-slate-300 px-2 py-1"
				/>
				<button
					type="button"
					onClick={triggerDebouncedCall}
					className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
				>
					Trigger debounced handler
				</button>
				<button
					type="button"
					onClick={runRapidScenario}
					className="rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white"
				>
					Run rapid 3-click scenario
				</button>
			</div>

			<StepVisualizerLayout
				codeTitle="Debounce implementation (active line highlights on interaction)"
				codeLines={CODE_LINES}
				activeLine={activeLine}
				traceTitle="Trace events (step-by-step)"
				stepIndex={stepIndex}
				totalSteps={traceLogs.length}
				onPrev={() => setStepIndex((current) => Math.max(0, current - 1))}
				onNext={() =>
					setStepIndex((current) => Math.min(traceLogs.length - 1, current + 1))
				}
				canPrev={traceLogs.length > 0 && stepIndex > 0}
				canNext={traceLogs.length > 0 && stepIndex < traceLogs.length - 1}
			>
				{currentStep ? (
					<div className="rounded bg-white p-2 text-sm text-slate-700">
						<span className="mr-2 font-medium text-slate-500">
							{currentStep.at}
						</span>
						<span className="mr-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs">
							line {currentStep.line}
						</span>
						{currentStep.message}
					</div>
				) : (
					<p className="text-sm text-slate-500">
						No events yet. Trigger the handler or run the rapid scenario.
					</p>
				)}

				<div>
					<p className="text-sm font-semibold text-slate-900">
						Executed payloads
					</p>
					<p className="text-sm text-slate-700">
						{executedPayloads.length
							? executedPayloads.join(", ")
							: "None yet (debounce delay has not elapsed)."}
					</p>
				</div>
			</StepVisualizerLayout>
		</div>
	);
}
