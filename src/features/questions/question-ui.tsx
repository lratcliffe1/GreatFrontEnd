import { isHttpUrl } from "@/features/questions/helpers";

export const QUESTION_UI_CLASSES = {
	bodyText: "[color:var(--foreground)]",
	mutedText: "text-sm [color:var(--muted)]",
	panelHeading: "text-xl font-semibold [color:var(--foreground)]",
	primaryLink: "text-link underline",
	secondaryLink: "[color:var(--muted)] underline",
} as const;

type SourcePromptLinkProps = {
	sourceUrl: string;
	linkLabel: string;
	pendingLabel: string;
	linkClassName: string;
	pendingClassName: string;
	openInNewTab?: boolean;
};

export function SourcePromptLink({
	sourceUrl,
	linkLabel,
	pendingLabel,
	linkClassName,
	pendingClassName,
	openInNewTab = true,
}: SourcePromptLinkProps) {
	if (!isHttpUrl(sourceUrl)) {
		return <span className={pendingClassName}>{pendingLabel}</span>;
	}

	return (
		<a
			href={sourceUrl}
			target={openInNewTab ? "_blank" : undefined}
			rel={openInNewTab ? "noreferrer" : undefined}
			className={linkClassName}
		>
			{linkLabel}
		</a>
	);
}
