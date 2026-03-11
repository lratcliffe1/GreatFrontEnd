import { expect, test } from "@playwright/test";

test("filters questions by search", async ({ page }) => {
	await page.goto("/gfe75");

	// Wait for questions to load before filtering
	await expect(page.getByText(/Debounce/).first()).toBeVisible();

	const searchInput = page.getByLabel("Search questions");
	await searchInput.fill("Debounce");

	// Assert filtered list: exactly one question card visible, and it's Debounce
	const main = page.getByRole("main");
	const questionTitles = main.getByRole("heading", { level: 3 });
	await expect(questionTitles).toHaveCount(1);
	await expect(questionTitles).toContainText("Debounce");
});

test("filters questions by category", async ({ page }) => {
	await page.goto("/gfe75");

	await page.getByLabel("Category").click();
	await page.getByRole("option", { name: "Quiz" }).click();

	await expect(
		page.getByText("Cookie vs sessionStorage vs localStorage"),
	).toBeVisible();
});

test("filters questions by status", async ({ page }) => {
	await page.goto("/gfe75");

	await page.getByLabel("Status").click();
	await page.getByRole("option", { name: "Done" }).click();

	await expect(page.getByText(/Debounce/)).toBeVisible();
	await expect(
		page.getByRole("heading", { name: /Array\.prototype\.reduce/ }),
	).not.toBeVisible();
});

test("keeps filters below the progress summary before the wide breakpoint", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1270, height: 900 });
	await page.goto("/gfe75");

	await expect(page.getByText(/Debounce/).first()).toBeVisible();

	const progress = page.getByText(/\d+\/\d+ complete/);
	const categorySelect = page.getByLabel("Category");
	const statusSelect = page.getByLabel("Status");
	const searchInput = page.getByLabel("Search questions");

	await expect(progress).toBeVisible();
	await expect(categorySelect).toBeVisible();
	await expect(statusSelect).toBeVisible();
	await expect(searchInput).toBeVisible();

	const progressBox = await progress.boundingBox();
	const categoryBox = await categorySelect.boundingBox();
	const statusBox = await statusSelect.boundingBox();
	const searchBox = await searchInput.boundingBox();

	expect(progressBox).not.toBeNull();
	expect(categoryBox).not.toBeNull();
	expect(statusBox).not.toBeNull();
	expect(searchBox).not.toBeNull();

	const progressBottom = progressBox!.y + progressBox!.height;
	const firstFilterTop = Math.min(
		categoryBox!.y,
		statusBox!.y,
		searchBox!.y,
	);

	expect(firstFilterTop).toBeGreaterThan(progressBottom + 4);
});
