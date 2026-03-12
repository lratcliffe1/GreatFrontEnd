"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { analyticsBeforeSend } from "@/lib/analytics";

export function AnalyticsProvider() {
	return (
		<>
			<Analytics beforeSend={analyticsBeforeSend} />
			<SpeedInsights />
		</>
	);
}
