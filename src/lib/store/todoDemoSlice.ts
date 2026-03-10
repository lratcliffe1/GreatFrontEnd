import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TodoItem = {
	id: number;
	label: string;
};

type TodoDemoState = {
	tasks: TodoItem[];
	nextTaskId: number;
};

const initialState: TodoDemoState = {
	tasks: [],
	nextTaskId: 1,
};

const todoDemoSlice = createSlice({
	name: "todoDemo",
	initialState,
	reducers: {
		addTask(state, action: PayloadAction<string>) {
			const trimmed = action.payload.trim();
			if (!trimmed) return;

			state.tasks.push({
				id: state.nextTaskId,
				label: trimmed,
			});
			state.nextTaskId += 1;
		},
		removeTask(state, action: PayloadAction<number>) {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		clearTasks(state) {
			state.tasks = [];
			state.nextTaskId = 1;
		},
	},
});

export const { addTask, removeTask, clearTasks } = todoDemoSlice.actions;

export default todoDemoSlice.reducer;
