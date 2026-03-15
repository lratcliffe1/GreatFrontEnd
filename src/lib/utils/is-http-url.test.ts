import { isHttpUrl } from "@/lib/utils/is-http-url";

describe("isHttpUrl", () => {
	it("returns true for http URLs", () => {
		expect(isHttpUrl("http://example.com")).toBe(true);
		expect(isHttpUrl("http://localhost:3000")).toBe(true);
	});

	it("returns true for https URLs", () => {
		expect(isHttpUrl("https://example.com")).toBe(true);
		expect(isHttpUrl("https://www.greatfrontend.com")).toBe(true);
	});

	it("returns false for non-URLs", () => {
		expect(isHttpUrl("")).toBe(false);
		expect(isHttpUrl("not a url")).toBe(false);
		expect(isHttpUrl("ftp://example.com")).toBe(false);
	});
});
