export default function TrackLoading() {
	return (
		<div className="animate-pulse space-y-4">
			<div className="h-8 w-48 rounded bg-background" />
			<div className="h-4 w-32 rounded bg-background" />
			<div className="h-10 w-full rounded bg-background" />
			<div className="grid gap-4 sm:grid-cols-2">
				{[1, 2, 3, 4].map((i) => (
					<div key={i} className="h-40 rounded-lg bg-background" />
				))}
			</div>
		</div>
	);
}
