export type DebounceTraceEvent = {
	line: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9;
	message: string;
	timestamp: number;
};

export type DebounceTimelineEvent<TArgs extends unknown[] = unknown[]> =
	| { type: "invoked"; args: TArgs; timestamp: number }
	| { type: "cleared"; timestamp: number }
	| { type: "scheduled"; delayMs: number; timestamp: number }
	| { type: "executed"; args: TArgs; timestamp: number };

export function debounce<TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	delayMs: number,
	onTrace?: (event: DebounceTraceEvent) => void,
	onTimeline?: (event: DebounceTimelineEvent<TArgs>) => void,
) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: TArgs) => {
		const now = Date.now();
		onTrace?.({ line: 1, message: "Debounced wrapper invoked.", timestamp: now });
		onTimeline?.({ type: "invoked", args, timestamp: now });

		const hasActiveTimeout = timeoutId !== null;
		onTrace?.({
			line: 2,
			message: `timeoutId !== null => ${hasActiveTimeout}.`,
			timestamp: now,
		});
		if (hasActiveTimeout) {
			onTrace?.({ line: 3, message: "Entering clear-timeout branch.", timestamp: now });
			onTrace?.({ line: 4, message: "Clearing previous timeout.", timestamp: now });
			onTimeline?.({ type: "cleared", timestamp: now });
			clearTimeout(timeoutId!);
		}
		onTrace?.({ line: 6, message: "Assigning a new timeout.", timestamp: now });
		onTrace?.({ line: 7, message: `Scheduling callback in ${delayMs}ms.`, timestamp: now });
		onTimeline?.({ type: "scheduled", delayMs, timestamp: now });

		timeoutId = setTimeout(() => {
			const execNow = Date.now();
			onTrace?.({ line: 8, message: "Timer fired.", timestamp: execNow });
			onTrace?.({ line: 9, message: "Executing callback.", timestamp: execNow });
			onTimeline?.({ type: "executed", args, timestamp: execNow });
			callback(...args);
		}, delayMs);
	};
}
