import { render, type RenderOptions } from "@testing-library/react";

import { AppProviders } from "@/providers/app-providers";

function AllTheProviders({ children }: { children: React.ReactNode }) {
	return <AppProviders>{children}</AppProviders>;
}

function customRender(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	return render(ui, {
		wrapper: AllTheProviders,
		...options,
	});
}

export * from "@testing-library/react";
export { customRender as render };
