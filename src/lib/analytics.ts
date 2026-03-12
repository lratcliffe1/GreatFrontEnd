import type { BeforeSend } from "@vercel/analytics/next";

let lastTrackedPathname: string | null = null;

function toPathname(url: string): string {
	try {
		const parsed = new URL(url, "https://analytics.local");
		return parsed.pathname || "/";
	} catch {
		return "/";
	}
}

function normalizePathname(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

function isInternalPath(pathname: string): boolean {
	return pathname.startsWith("/_next") || pathname.startsWith("/_vercel") || pathname.startsWith("/api/");
}

export const analyticsBeforeSend: BeforeSend = (event) => {
	const pathname = normalizePathname(toPathname(event.url));

	if (isInternalPath(pathname)) {
		return null;
	}

	if (event.type === "pageview") {
		// Filters sync to query params via replaceState; ignore repeated views on the same pathname.
		if (pathname === lastTrackedPathname) {
			return null;
		}
		lastTrackedPathname = pathname;
	}

	return { ...event, url: pathname };
};
