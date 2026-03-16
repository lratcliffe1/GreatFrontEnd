type ArrayVisualizationProps = {
	values: number[];
	activeIndex?: number | null;
	rangeEnd?: number;
	targetIndex?: number;
	label?: string;
};

/**
 * Renders an array as cells with index and value.
 * Optional highlighting: active cell, range [0..rangeEnd], target cell.
 */
export function ArrayVisualization({
	values,
	activeIndex = null,
	rangeEnd,
	targetIndex,
	label = "Array (index → value)",
}: ArrayVisualizationProps) {
	return (
		<div>
			{label && <p className="mb-1 text-xs font-medium text-slate-400">{label}</p>}
			<div className="flex flex-wrap gap-1">
				{values.map((value, i) => {
					const isActive = i === activeIndex;
					const inRange = rangeEnd !== undefined && i <= rangeEnd;
					const isTarget = targetIndex !== undefined && i === targetIndex;

					return (
						<div
							key={i}
							className={`
								flex min-w-10 flex-col items-center rounded border-2 px-2 py-1 text-center text-sm
								${isActive ? "border-teal-500 bg-teal-900/60 text-white" : ""}
								${!isActive && rangeEnd !== undefined && inRange ? "border-slate-500 bg-slate-700/40 text-slate-200" : ""}
								${!isActive && rangeEnd !== undefined && !inRange ? "border-slate-600 bg-slate-800/30 text-slate-500" : ""}
								${!isActive && rangeEnd === undefined ? "border-slate-500 bg-slate-700/40 text-slate-200" : ""}
								${isTarget ? "ring-1 ring-amber-400/60" : ""}
							`}
						>
							<span className="text-xs text-slate-400">{i}</span>
							<span className="font-mono font-medium">{value}</span>
							{isTarget && <span className="text-[10px] text-amber-400">goal</span>}
						</div>
					);
				})}
			</div>
		</div>
	);
}
