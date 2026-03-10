import type { ReactNode } from "react";
import {
	CodePanel,
	StepControlButton,
	TracePanel,
} from "@/components/ui/tailwind-primitives";

export type CodeLine = {
	line: number | null;
	code: string;
};

type StepVisualizerLayoutProps = {
	codeTitle: string;
	codeLines: CodeLine[];
	activeLine: number | null;
	traceTitle: string;
	stepIndex: number;
	totalSteps: number;
	onPrev: () => void;
	onNext: () => void;
	canPrev: boolean;
	canNext: boolean;
	summary?: ReactNode;
	children: ReactNode;
};

export function StepVisualizerLayout({
	codeTitle,
	codeLines,
	activeLine,
	traceTitle,
	stepIndex,
	totalSteps,
	onPrev,
	onNext,
	canPrev,
	canNext,
	summary,
	children,
}: StepVisualizerLayoutProps) {
	return (
		<div className="grid gap-4 md:grid-cols-[3fr_2fr]">
			<CodePanel>
				<p className="mb-2 text-xs text-slate-400">{codeTitle}</p>
				{codeLines.map((entry, index) => {
					const isActive = entry.line !== null && activeLine === entry.line;
					return (
						<div
							key={`${entry.line ?? "none"}-${index}`}
							className={`rounded px-2 py-1 whitespace-pre-wrap wrap-break-word ${
								isActive ? "bg-teal-800 text-white" : "text-slate-200"
							}`}
						>
							<span className="mr-3 inline-block w-8 text-slate-500">
								{entry.line ?? ""}
							</span>
							<code>{entry.code}</code>
						</div>
					);
				})}
			</CodePanel>

			<TracePanel>
				<h4 className="font-semibold text-slate-900">{traceTitle}</h4>
				{summary}
				<div className="flex items-center gap-2">
					<StepControlButton onClick={onPrev} disabled={!canPrev}>
						Prev
					</StepControlButton>
					<StepControlButton onClick={onNext} disabled={!canNext}>
						Next
					</StepControlButton>
					<span className="text-sm text-slate-600">
						Step {totalSteps === 0 ? 0 : stepIndex + 1}/{totalSteps}
					</span>
				</div>
				{children}
			</TracePanel>
		</div>
	);
}
