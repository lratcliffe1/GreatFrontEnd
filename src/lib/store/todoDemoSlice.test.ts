import todoDemoReducer, { addTask, clearTasks, removeTask } from "@/lib/store/todoDemoSlice";

describe("todoDemoSlice", () => {
	it("adds trimmed tasks and increments ids", () => {
		const afterFirst = todoDemoReducer(undefined, addTask("  first task  "));
		const afterSecond = todoDemoReducer(afterFirst, addTask("second task"));

		expect(afterSecond.tasks).toEqual([
			{ id: 1, label: "first task" },
			{ id: 2, label: "second task" },
		]);
		expect(afterSecond.nextTaskId).toBe(3);
	});

	it("ignores empty task labels", () => {
		const state = todoDemoReducer(undefined, addTask("   "));

		expect(state.tasks).toEqual([]);
		expect(state.nextTaskId).toBe(1);
	});

	it("removes a task by id", () => {
		const seeded = todoDemoReducer(todoDemoReducer(undefined, addTask("first")), addTask("second"));
		const state = todoDemoReducer(seeded, removeTask(1));

		expect(state.tasks).toEqual([{ id: 2, label: "second" }]);
	});

	it("clears all tasks and resets id counter", () => {
		const seeded = todoDemoReducer(todoDemoReducer(undefined, addTask("first")), addTask("second"));
		const state = todoDemoReducer(seeded, clearTasks());

		expect(state.tasks).toEqual([]);
		expect(state.nextTaskId).toBe(1);
	});
});
