import { MUTED_TEXT_CLASS } from "@/components/ui/tailwind-primitives";
import { isHttpUrl } from "@/features/questions/helpers";

export const QUESTION_UI_CLASSES = {
	bodyText: "[color:var(--foreground)]",
	mutedText: MUTED_TEXT_CLASS,
	panelHeading: "text-xl font-semibold [color:var(--foreground)]",
	primaryLink:
		"text-link underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
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
		<a href={sourceUrl} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noreferrer" : undefined} className={linkClassName}>
			{linkLabel}
		</a>
	);
}
