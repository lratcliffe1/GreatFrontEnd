import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	retries: 1,
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "on-first-retry",
	},
	webServer: {
		command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3000",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: true,
	},
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "firefox", use: { ...devices["Desktop Firefox"] } },
		{ name: "webkit", use: { ...devices["Desktop Safari"] } },
	],
});
