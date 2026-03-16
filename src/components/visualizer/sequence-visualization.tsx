type SequenceVisualizationProps = {
	items: Array<{ label: string }>;
	activeIndex?: number | null;
	label?: string;
};

/**
 * Renders a sequence of items as cells with index and label.
 * Use for trace events, executed payloads, or any ordered list.
 */
export function SequenceVisualization({ items, activeIndex = null, label = "Sequence (index → event)" }: SequenceVisualizationProps) {
	if (items.length === 0) return null;

	return (
		<div>
			{label && <p className="mb-1 text-xs font-medium text-slate-400">{label}</p>}
			<div className="flex flex-wrap gap-1">
				{items.map((item, i) => {
					const isActive = i === activeIndex;

					return (
						<div
							key={i}
							className={`
								flex min-w-20 flex-col items-center rounded border-2 px-2 py-1 text-center text-sm
								${isActive ? "border-teal-500 bg-teal-900/60 text-white" : "border-slate-500 bg-slate-700/40 text-slate-200"}
							`}
						>
							<span className="text-xs text-slate-400">{i}</span>
							<span className="max-w-28 truncate text-xs font-medium" title={item.label}>
								{item.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
