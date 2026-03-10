import Link from "next/link";

export function AppHeader() {
	return (
		<header className="border-b [background:var(--card-bg)] border-card-border">
			<div className="flex w-full flex-col gap-4 px-10 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-14 md:px-20 lg:px-24 xl:px-32">
				<div className="min-w-0 shrink-0">
					<p className="text-sm font-semibold text-link">
						Liam&apos;s Portfolio
					</p>
					<h1 className="text-base font-bold text-foreground sm:text-lg">
						GreatFrontEnd Practice Hub
					</h1>
				</div>
				<nav className="flex shrink-0 items-center gap-2">
					<Link
						href="/gfe75"
						className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:[background:var(--surface)]"
					>
						GFE 75
					</Link>
					<Link
						href="/blind75"
						className="rounded-md px-3 py-2 text-sm font-medium text-muted hover:[background:var(--surface)]"
					>
						Blind 75
					</Link>
				</nav>
			</div>
		</header>
	);
}
