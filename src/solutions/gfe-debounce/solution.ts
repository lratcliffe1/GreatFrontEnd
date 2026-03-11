export type DebounceTraceEvent = {
	line: 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9;
	message: string;
};

export function debounce<TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	delayMs: number,
	onTrace?: (event: DebounceTraceEvent) => void,
) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: TArgs) => {
		onTrace?.({ line: 1, message: "Debounced wrapper invoked." });
		const hasActiveTimeout = timeoutId !== null;
		onTrace?.({
			line: 2,
			message: `timeoutId !== null => ${hasActiveTimeout}.`,
		});
		if (hasActiveTimeout) {
			onTrace?.({ line: 3, message: "Entering clear-timeout branch." });
			onTrace?.({ line: 4, message: "Clearing previous timeout." });
			clearTimeout(timeoutId!);
		}
		onTrace?.({ line: 6, message: "Assigning a new timeout." });
		onTrace?.({ line: 7, message: `Scheduling callback in ${delayMs}ms.` });
		timeoutId = setTimeout(() => {
			onTrace?.({ line: 8, message: "Timer fired." });
			onTrace?.({ line: 9, message: "Executing callback." });
			callback(...args);
		}, delayMs);
	};
}
