import { expect, test } from "@playwright/test";

test("invalid track shows not-found page", async ({ page }) => {
	await page.goto("/invalid-track");
	await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
	await expect(page.getByText("Try navigating from one of the track pages instead.")).toBeVisible();
});

test("invalid question slug shows not-found page", async ({ page }) => {
	await page.goto("/gfe75/non-existent-question");
	await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
	await expect(page.getByText("Try navigating from one of the track pages instead.")).toBeVisible();
});
