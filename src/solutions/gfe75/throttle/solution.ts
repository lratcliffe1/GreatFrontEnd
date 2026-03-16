export type ThrottleTraceEvent = {
	line: 1 | 2 | 3 | 5 | 6 | 8;
	message: string;
	timestamp: number;
};

export type ThrottleTimelineEvent<TArgs extends unknown[] = unknown[]> =
	| { type: "invoked"; args: TArgs; timestamp: number }
	| { type: "executed"; args: TArgs; timestamp: number }
	| { type: "skipped"; args: TArgs; timestamp: number };

export function throttle<TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	waitMs: number,
	onTrace?: (event: ThrottleTraceEvent) => void,
	onTimeline?: (event: ThrottleTimelineEvent<TArgs>) => void,
) {
	let lastExecutedAt: number | null = null;

	return (...args: TArgs) => {
		const now = Date.now();
		onTrace?.({ line: 1, message: "Throttled wrapper invoked.", timestamp: now });
		onTimeline?.({ type: "invoked", args, timestamp: now });

		const elapsed = lastExecutedAt !== null ? now - lastExecutedAt : Infinity;
		const hasWaited = lastExecutedAt === null || elapsed >= waitMs;
		onTrace?.({
			line: 3,
			message: `hasWaited = lastExecutedAt===null || elapsed>=${waitMs} => ${hasWaited}.`,
			timestamp: now,
		});
		if (hasWaited) {
			onTrace?.({ line: 5, message: "Executing callback immediately.", timestamp: now });
			onTimeline?.({ type: "executed", args, timestamp: now });
			callback(...args);
			lastExecutedAt = now;
			onTrace?.({ line: 6, message: `lastExecutedAt = ${now}.`, timestamp: now });
		} else {
			onTrace?.({ line: 8, message: "Throttled: skipping (wait period not elapsed).", timestamp: now });
			onTimeline?.({ type: "skipped", args, timestamp: now });
		}
	};
}
