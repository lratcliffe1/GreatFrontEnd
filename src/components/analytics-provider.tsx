"use client";

import { Analytics } from "@vercel/analytics/next";
import { analyticsBeforeSend } from "@/lib/analytics";

export function AnalyticsProvider() {
	return <Analytics beforeSend={analyticsBeforeSend} />;
}
