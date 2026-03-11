import { debounce } from "@/solutions/gfe75/debounce/solution";

describe("debounce", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("only calls callback once after delay", () => {
		const callback = jest.fn();
		const debounced = debounce(callback, 200);

		debounced("a");
		debounced("b");
		debounced("c");

		expect(callback).not.toHaveBeenCalled();
		jest.advanceTimersByTime(200);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenLastCalledWith("c");
	});
});
