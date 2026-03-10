"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addTask, removeTask } from "@/lib/store/todoDemoSlice";

export function TodoDemo() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.todoDemo.tasks);
	const [input, setInput] = useState("");

	function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		const trimmed = input.trim();
		if (!trimmed) return;

		dispatch(addTask(trimmed));
		setInput("");
	}

	function deleteTask(taskId: number) {
		dispatch(removeTask(taskId));
	}

	return (
		<div className="space-y-4">
			<form className="flex gap-2" onSubmit={onSubmit}>
				<input
					aria-label="Task name"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Add a task"
					className="flex-1 rounded-md border border-slate-300 px-3 py-2"
				/>
				<button
					type="submit"
					className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
				>
					Submit
				</button>
			</form>

			<ul className="space-y-2">
				{tasks.map((task) => (
					<li
						key={task.id}
						className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
					>
						<span>{task.label}</span>
						<button
							type="button"
							onClick={() => deleteTask(task.id)}
							className="rounded bg-red-50 px-2 py-1 text-sm font-medium text-red-700"
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
