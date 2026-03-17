import { isHttpUrl } from "@/lib/utils/is-http-url";

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
