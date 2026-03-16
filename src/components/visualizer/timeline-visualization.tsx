"use client";

import { useContainerWidth } from "@/components/visualizer/use-container-width";

type TimelineEvent =
	| { type: "invoked"; label: string; timestamp: number }
	| { type: "cleared"; timestamp: number }
	| { type: "scheduled"; delayMs: number; timestamp: number }
	| { type: "executed"; label: string; timestamp: number }
	| { type: "skipped"; label: string; timestamp: number };

type CondensedEvent = {
	timestamp: number;
	label: string;
	primaryType: "invoked" | "scheduled" | "executed" | "skipped";
};

type TimelineVisualizationProps = {
	events: TimelineEvent[];
	highlightTimestamp?: number;
};

function getEventDotColor(type: CondensedEvent["primaryType"]): string {
	switch (type) {
		case "invoked":
			return "bg-slate-400";
		case "scheduled":
			return "bg-blue-500";
		case "executed":
			return "bg-emerald-500";
		case "skipped":
			return "bg-slate-600";
	}
}

/** Group events by timestamp and merge into a single marker per trigger */
function condenseEvents(events: TimelineEvent[]): CondensedEvent[] {
	if (events.length === 0) return [];

	const byTimestamp = new Map<number, TimelineEvent[]>();
	for (const e of events) {
		const list = byTimestamp.get(e.timestamp) ?? [];
		list.push(e);
		byTimestamp.set(e.timestamp, list);
	}

	const result: CondensedEvent[] = [];
	for (const [ts, group] of byTimestamp.entries()) {
		const hasExecuted = group.some((e) => e.type === "executed");
		const hasSkipped = group.some((e) => e.type === "skipped");
		const hasScheduled = group.some((e) => e.type === "scheduled");
		const invoked = group.find((e) => e.type === "invoked") as { type: "invoked"; label: string } | undefined;
		const executed = group.find((e) => e.type === "executed") as { type: "executed"; label: string } | undefined;
		const skipped = group.find((e) => e.type === "skipped") as { type: "skipped"; label: string } | undefined;

		const payload = executed?.label ?? skipped?.label ?? invoked?.label ?? "";

		let label: string;
		let primaryType: CondensedEvent["primaryType"];

		if (hasExecuted) {
			primaryType = "executed";
			label = payload;
		} else if (hasSkipped) {
			primaryType = "skipped";
			label = payload;
		} else if (hasScheduled) {
			primaryType = "scheduled";
			const scheduled = group.find((e) => e.type === "scheduled") as { type: "scheduled"; delayMs: number } | undefined;
			const delay = scheduled?.delayMs ?? 0;
			label = payload ? `${payload}` : `${delay}ms`;
		} else {
			primaryType = "invoked";
			label = payload || "invoked";
		}

		result.push({ timestamp: ts, label, primaryType });
	}

	return result.sort((a, b) => a.timestamp - b.timestamp);
}

const EDGE_MARGIN_PERCENT = 4;
/** Approximate min width (px) needed per label to avoid overlap */
const MIN_LABEL_WIDTH_PX = 90;

/** Returns min spacing fraction based on container width. Narrow viewports need larger fraction. */
function getMinSpacingForLabel(containerWidth: number): number {
	if (containerWidth <= 0) return 0.2;
	const fraction = MIN_LABEL_WIDTH_PX / containerWidth;
	return Math.min(0.5, Math.max(0.06, fraction));
}

/** Returns true if marker at index i is too close to neighbors to show label */
function shouldHideLabel(condensed: CondensedEvent[], i: number, maxMs: number, minSpacing: number): boolean {
	if (condensed.length <= 1) return false;
	const startTime = condensed[0]!.timestamp;
	const pos = (condensed[i]!.timestamp - startTime) / maxMs;
	let minDist = 1;
	for (let j = 0; j < condensed.length; j++) {
		if (j === i) continue;
		const otherPos = (condensed[j]!.timestamp - startTime) / maxMs;
		minDist = Math.min(minDist, Math.abs(pos - otherPos));
	}
	return minDist < minSpacing;
}

const LEGEND_ITEMS: { type: CondensedEvent["primaryType"]; label: string }[] = [
	{ type: "scheduled", label: "Scheduled" },
	{ type: "executed", label: "Executed" },
	{ type: "skipped", label: "Skipped" },
];

export function TimelineVisualization({ events, highlightTimestamp }: TimelineVisualizationProps) {
	const condensed = condenseEvents(events);
	const startTime = condensed[0]?.timestamp ?? 0;
	const lastEvent = condensed[condensed.length - 1];
	const maxMs = condensed.length > 1 && lastEvent ? Math.max(lastEvent.timestamp - startTime, 1) : 1;

	const [trackRef, trackWidth] = useContainerWidth();
	const minSpacing = getMinSpacingForLabel(trackWidth);

	return (
		<div className="rounded-lg bg-slate-800/30 px-6 py-5">
			<div className="mb-4 flex flex-wrap items-center gap-4 gap-y-1">
				{LEGEND_ITEMS.map(({ type, label }) => (
					<div key={type} className="flex items-center gap-1.5">
						<div className={`h-2 w-2 shrink-0 rounded-full ring-2 ring-slate-700 ${getEventDotColor(type)}`} />
						<span className="text-[11px] text-slate-400">{label}</span>
					</div>
				))}
			</div>
			<div ref={trackRef} className="relative min-h-22 w-full px-4">
				{/* Track line */}
				<div className="absolute h-px bg-slate-600/60" style={{ left: "1rem", right: "1rem", top: "1.75rem" }} />

				{/* Event markers - one per timestamp */}
				{condensed.map((event, i) => {
					const ms = event.timestamp - startTime;
					const positionFraction = maxMs > 0 ? ms / maxMs : 0;
					const leftPercent = EDGE_MARGIN_PERCENT + positionFraction * (100 - 2 * EDGE_MARGIN_PERCENT);
					const isHighlighted = highlightTimestamp !== undefined && event.timestamp === highlightTimestamp;
					const hideLabel = shouldHideLabel(condensed, i, maxMs, minSpacing);

					return (
						<div
							key={i}
							className={`absolute flex -translate-x-1/2 flex-col items-center ${isHighlighted ? "rounded-lg border-2 border-blue-500 px-2 py-1.5" : ""}`}
							style={{
								left: `${leftPercent}%`,
								top: 0,
							}}
							title={`${event.label} · ${event.primaryType} at +${ms}ms`}
						>
							<div
								className={`h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-slate-700 ${getEventDotColor(event.primaryType)}`}
								style={{ marginTop: "1.5rem" }}
							/>
							{!hideLabel && (
								<div className="mt-2 flex flex-col items-center gap-0.5">
									<span className="max-w-32 truncate text-center text-xs font-medium text-slate-200">{event.label}</span>
									<span className="text-[10px] tabular-nums text-slate-500">+{ms}ms</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
