import { installMyCall, getCallSteps } from "@/solutions/gfe75/20-function-prototype-call/solution";

beforeAll(() => {
	installMyCall();
});

describe("Function.prototype.myCall", () => {
	it("calls function with thisArg as this (no args)", () => {
		function multiplyAge(this: { age: number }, multiplier = 1) {
			return this.age * multiplier;
		}
		const mary = { age: 21 };
		const john = { age: 42 };
		expect(multiplyAge.myCall(mary)).toBe(21);
		expect(multiplyAge.myCall(john, 2)).toBe(84);
	});

	it("calls function with extra arguments", () => {
		function add(this: { x: number }, a: number, b: number) {
			return this.x + a + b;
		}
		const obj = { x: 10 };
		expect(add.myCall(obj, 1, 2)).toBe(13);
	});

	it("handles null/undefined thisArg (uses globalThis)", () => {
		function getGlobal(this: typeof globalThis) {
			return this;
		}
		const result = getGlobal.myCall(null);
		expect(result).toBe(globalThis);
	});

	it("handles primitive thisArg (boxed to object)", () => {
		function getType(this: object) {
			return typeof this;
		}
		expect(getType.myCall(42 as unknown as object)).toBe("object");
		expect(getType.myCall("hello" as unknown as object)).toBe("object");
	});

	it("returns value from called function", () => {
		function greet(this: { name: string }) {
			return `Hello, ${this.name}`;
		}
		expect(greet.myCall({ name: "World" })).toBe("Hello, World");
	});

	it("does not mutate thisArg after call", () => {
		const obj: Record<string | symbol, unknown> = {};
		function noop() {
			return 1;
		}
		noop.myCall(obj);
		expect(Object.getOwnPropertyNames(obj)).toHaveLength(0);
		expect(Object.getOwnPropertySymbols(obj)).toHaveLength(0);
	});
});

describe("getCallSteps", () => {
	it("produces steps whose final result matches myCall", () => {
		function multiplyAge(this: { age: number }, mult = 1) {
			return this.age * mult;
		}
		const mary = { age: 21 };
		const expected = multiplyAge.myCall(mary);
		const steps = getCallSteps(21, null);
		const lastStep = steps[steps.length - 1];
		expect(lastStep?.result).toBe(expected);
	});

	it("handles multiplier argument", () => {
		const steps = getCallSteps(42, 2);
		const lastStep = steps[steps.length - 1];
		expect(lastStep?.result).toBe(84);
	});
});
