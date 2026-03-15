import Link from "next/link";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="font-medium text-link underline decoration-transparent underline-offset-2 hover:text-link-hover hover:decoration-current"
		>
			{children}
		</Link>
	);
}

export function PortfolioHero() {
	return (
		<section className="rounded-lg border border-card-border bg-card-bg p-6">
			<h2 className="text-3xl font-bold text-foreground">Frontend interview portfolio</h2>

			<p className="mt-3 text-muted leading-7">
				This portfolio showcases my solutions to <ExternalLink href="https://www.greatfrontend.com/interviews/gfe75">GFE 75</ExternalLink> and{" "}
				<ExternalLink href="https://www.greatfrontend.com/interviews/blind75">Blind 75</ExternalLink>, along with notes, tests, and interactive
				visualizers built with Next.js, React, TypeScript, Redux, GraphQL, Tailwind, Jest, and Playwright. The original prompts come from{" "}
				<ExternalLink href="https://www.greatfrontend.com">GreatFrontEnd</ExternalLink>, and the full source code is available on{" "}
				<ExternalLink href="https://github.com/lratcliffe1/greatfrontend">GitHub</ExternalLink>.
			</p>

			<div className="mt-5 space-y-2 text-sm text-muted">
				<p>
					<span className="font-medium text-foreground">GFE 75:</span> Frontend-focused interview questions covering JavaScript, UI coding, system
					design, and quizzes.
				</p>
				<p>
					<span className="font-medium text-foreground">Blind 75:</span> A classic set of data structures and algorithms interview problems.
				</p>
			</div>
		</section>
	);
}
