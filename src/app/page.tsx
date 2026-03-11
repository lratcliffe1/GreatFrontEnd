import Link from "next/link";

export default function Home() {
	return (
		<div className="rounded-lg border border-card-border bg-card-bg p-6">
			<h2 className="text-3xl font-bold text-foreground">Frontend interview portfolio</h2>
			<p className="mt-3 max-w-3xl text-muted">
				This project tracks and showcases my solutions across GFE75 and Blind75 using React, TypeScript, Redux, GraphQL, Tailwind, MUI,
				Jest, and Playwright.
			</p>
			<div className="mt-5 flex gap-3">
				<Link href="/gfe75" className="rounded-md bg-teal-700 px-4 py-2 font-semibold text-white">
					Open GFE 75
				</Link>
				<Link href="/blind75" className="rounded-md bg-slate-800 px-4 py-2 font-semibold text-white">
					Open Blind 75
				</Link>
			</div>
		</div>
	);
}
