import Link from "next/link";

export default function NotFound() {
	return (
		<div className="rounded-md border border-card-border [background:var(--card-bg)] p-6">
			<h2 className="text-2xl font-bold text-foreground">Page not found</h2>
			<p className="mt-2 text-muted">
				Try navigating from one of the track pages instead.
			</p>
			<Link href="/" className="mt-4 inline-block text-link underline">
				Back home
			</Link>
		</div>
	);
}
