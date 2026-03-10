import { expect, test } from "@playwright/test";

test("track tabs and question cards render", async ({ page }) => {
	await page.goto("/gfe75");
	await expect(page.getByRole("heading", { name: "GFE 75" })).toBeVisible();
	await expect(page.getByText("Debounce")).toBeVisible();

	await page
		.getByRole("main")
		.getByRole("link", { name: "Blind 75", exact: true })
		.click();
	await expect(page).toHaveURL(/\/blind75$/);
	await expect(page.getByText("Balanced Brackets")).toBeVisible();
});
