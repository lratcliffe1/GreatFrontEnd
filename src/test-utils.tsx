import { render, type RenderOptions } from "@testing-library/react";

import { type AppStore, makeStore } from "@/lib/store";
import { AppProviders } from "@/providers/app-providers";

type ExtendedRenderOptions = Omit<RenderOptions, "wrapper"> & {
	store?: AppStore;
};

function customRender(
	ui: React.ReactElement,
	options: ExtendedRenderOptions = {},
) {
	const { store = makeStore(), ...renderOptions } = options;

	function AllTheProviders({ children }: { children: React.ReactNode }) {
		return <AppProviders store={store}>{children}</AppProviders>;
	}

	return render(ui, {
		wrapper: AllTheProviders,
		...renderOptions,
	});
}

export * from "@testing-library/react";
export { customRender as render };
