/**
 * Function.prototype.myCall - implements Function.prototype.call.
 * Calls the function with a given this value and arguments provided individually.
 */
declare global {
	interface Function {
		myCall<T, A extends unknown[], R>(this: (this: T, ...args: A) => R, thisArg: T | null | undefined, ...args: A): R;
	}
}

const CALL_KEY = Symbol("myCall");

export function installMyCall(): void {
	if (Function.prototype.myCall !== undefined) return;

	Function.prototype.myCall = function myCall<T, A extends unknown[], R>(
		this: (this: T, ...args: A) => R,
		thisArg: T | null | undefined,
		...args: A
	): R {
		const obj = thisArg == null ? globalThis : Object(thisArg);
		(obj as Record<symbol, unknown>)[CALL_KEY] = this;
		const result = ((obj as Record<symbol, (this: T, ...args: A) => R>)[CALL_KEY] as (...a: A) => R)(...args);
		delete (obj as Record<symbol, unknown>)[CALL_KEY];
		return result;
	};
}

// --- Visualizer ---

export type CallStep = {
	line: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 10 | 11 | 15 | 16 | 17;
	thisArgLabel: string;
	argsLabel: string;
	result: number | null;
	action: string;
};

function step(line: CallStep["line"], thisArgLabel: string, argsLabel: string, result: number | null, action: string): CallStep {
	return { line, thisArgLabel, argsLabel, result, action };
}

export function getCallSteps(thisArgAge: number, multiplierArg: number | null): CallStep[] {
	installMyCall();

	const steps: CallStep[] = [];
	const thisArgLabel = `{ age: ${thisArgAge} }`;
	const argsLabel = multiplierArg !== null ? `[${multiplierArg}]` : "[]";
	const mult = multiplierArg !== null ? multiplierArg : 1;
	const result = thisArgAge * mult;

	steps.push(step(1, "", "", null, "Add myCall to Function.prototype so any function can call itself with a custom this."));
	steps.push(step(15, thisArgLabel, argsLabel, null, `Create thisArg. This object will become this inside multiplyAge.`));
	steps.push(
		step(
			16,
			thisArgLabel,
			argsLabel,
			null,
			multiplierArg !== null
				? `We want multiplyAge to run with this = thisArg and receive ${mult} as multiplier.`
				: `We want multiplyAge to run with this = thisArg; no args means multiplier defaults to 1.`,
		),
	);
	steps.push(
		step(
			2,
			thisArgLabel,
			argsLabel,
			null,
			`Normalize thisArg: if null/undefined use globalThis, else Object(thisArg). We need an object to attach the function to.`,
		),
	);
	steps.push(
		step(
			3,
			thisArgLabel,
			argsLabel,
			null,
			"Create a unique Symbol as the property key. Symbols never collide with existing properties, so we won't overwrite anything on obj.",
		),
	);
	steps.push(
		step(4, thisArgLabel, argsLabel, null, "Attach the function to obj as obj[key] = this. This lets us invoke it as a method so this binds to obj."),
	);
	steps.push(
		step(
			5,
			thisArgLabel,
			argsLabel,
			null,
			"Invoke obj[key](...args). Because we call it as obj.method(), JavaScript sets this = obj inside the function.",
		),
	);
	steps.push(step(10, thisArgLabel, argsLabel, null, "Control enters multiplyAge. this is obj (our thisArg), so this.age is the age we passed in."));
	steps.push(step(11, thisArgLabel, argsLabel, result, `Compute this.age * multiplier → ${thisArgAge} × ${mult} = ${result} and return it.`));
	steps.push(step(6, thisArgLabel, argsLabel, result, "Remove the temporary property from obj so we don't mutate the caller's object."));
	steps.push(step(7, thisArgLabel, argsLabel, result, `Return the result (${result}) to multiplyAgeCall.`));
	steps.push(step(17, thisArgLabel, argsLabel, result, `Return result (${result}) to the caller.`));

	return steps;
}
