export type DebounceTraceEvent = {
	line: 13 | 15 | 16 | 17 | 19 | 20 | 21 | 22;
	message: string;
};

export function debounce<TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	delayMs: number,
	onTrace?: (event: DebounceTraceEvent) => void,
) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: TArgs) => {
		onTrace?.({ line: 13, message: "Debounced wrapper invoked." });
		const hasActiveTimeout = timeoutId !== null;
		onTrace?.({
			line: 15,
			message: `timeoutId !== null => ${hasActiveTimeout}.`,
		});
		if (hasActiveTimeout) {
			onTrace?.({ line: 16, message: "Entering clear-timeout branch." });
			onTrace?.({ line: 17, message: "Clearing previous timeout." });
			clearTimeout(timeoutId!);
		}
		onTrace?.({ line: 19, message: "Assigning a new timeout." });
		onTrace?.({ line: 20, message: `Scheduling callback in ${delayMs}ms.` });
		timeoutId = setTimeout(() => {
			onTrace?.({ line: 21, message: "Timer fired." });
			onTrace?.({ line: 22, message: "Executing callback." });
			callback(...args);
		}, delayMs);
	};
}
