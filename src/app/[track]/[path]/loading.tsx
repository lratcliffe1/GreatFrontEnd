export default function QuestionLoading() {
	return (
		<div className="animate-pulse space-y-6">
			<div className="h-4 w-24 rounded bg-background" />
			<div className="h-10 w-3/4 rounded bg-background" />
			<div className="h-4 w-full rounded bg-background" />
			<div className="space-y-2">
				<div className="h-4 w-32 rounded bg-background" />
				<div className="h-20 w-full rounded bg-background" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-24 rounded bg-background" />
				<div className="h-32 w-full rounded bg-background" />
			</div>
		</div>
	);
}
