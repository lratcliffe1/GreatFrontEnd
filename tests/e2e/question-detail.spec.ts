import { expect, test } from "@playwright/test";

test("question detail page loads and shows content", async ({ page }) => {
	await page.goto("/gfe75");
	await page.getByRole("link", { name: "Open solution" }).first().click();

	await expect(page).toHaveURL(/\/gfe75\/debounce$/);
	await expect(page.getByRole("heading", { name: /Debounce/ })).toBeVisible();
	await expect(
		page.getByText(
			"Debouncing controls how often a function is allowed to execute over time.",
		),
	).toBeVisible();
	await expect(page.getByText("Problem summary")).toBeVisible();
});

test("back to list link navigates to track", async ({ page }) => {
	await page.goto("/gfe75/debounce");
	await page.getByRole("link", { name: "Back to list" }).click();

	await expect(page).toHaveURL(/\/gfe75$/);
	await expect(page.getByRole("heading", { name: "GFE 75" })).toBeVisible();
});
