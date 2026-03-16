import type { NextConfig } from "next";

const allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS?.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const staticCacheHeaders = [
	{
		key: "Cache-Control",
		value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
	},
];

const nextConfig: NextConfig = {
	...(allowedDevOrigins?.length ? { allowedDevOrigins } : {}),
	async headers() {
		return [
			{ source: "/", headers: staticCacheHeaders },
			{ source: "/gfe75", headers: staticCacheHeaders },
			{ source: "/gfe75/:path*", headers: staticCacheHeaders },
			{ source: "/blind75", headers: staticCacheHeaders },
			{ source: "/blind75/:path*", headers: staticCacheHeaders },
		];
	},
};

export default nextConfig;
