import Link from "next/link";

import { GitHubIcon, GlobeIcon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PRIMARY_BUTTON_SM_CLASSES } from "@/components/ui/tailwind-primitives";
import { getTrackLabel, TRACKS } from "@/lib/constants";

const iconLinkClass =
	"rounded-md p-2 text-muted transition hover:bg-card-border hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function AppHeader() {
	return (
		<header className="border-b [background:var(--card-bg)] border-card-border">
			<div className="flex w-full flex-col gap-4 px-8 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-12 md:px-16 lg:px-20 xl:px-24">
				<div className="min-w-0 shrink-0">
					<p className="text-sm font-semibold text-link">Liam&apos;s Portfolio</p>
					<h1 className="text-base font-bold text-foreground sm:text-lg">GreatFrontEnd Practice Hub</h1>
				</div>
				<nav className="flex shrink-0 items-center gap-2">
					{TRACKS.map((track) => {
						const href = `/${track}`;
						return (
							<Link key={track} href={href} className={PRIMARY_BUTTON_SM_CLASSES}>
								{getTrackLabel(track)}
							</Link>
						);
					})}
					<a
						href="https://github.com/lratcliffe1/greatfrontend"
						target="_blank"
						rel="noopener noreferrer"
						className={iconLinkClass}
						aria-label="View source on GitHub"
					>
						<GitHubIcon className="size-5" />
					</a>
					<a
						href="https://www.greatfrontend.com"
						target="_blank"
						rel="noopener noreferrer"
						className={iconLinkClass}
						aria-label="Visit GreatFrontEnd"
					>
						<GlobeIcon className="size-5" />
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
