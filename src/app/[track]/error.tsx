"use client";

import { RouteErrorFallback } from "@/components/error/route-error-fallback";

export default function TrackError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return <RouteErrorFallback error={error} reset={reset} />;
}
