"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AppButton, MutedText } from "@/components/ui/tailwind-primitives";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addTask, clearTasks, removeTask } from "@/lib/store/todoDemoSlice";

export function TodoDemo() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.todoDemo.tasks);
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const trimmedInput = input.trim();
	const hasTasks = tasks.length > 0;
	const taskCountLabel =
		tasks.length === 1 ? "1 task" : `${tasks.length} tasks`;

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const trimmed = input.trim();
		if (!trimmed) return;

		dispatch(addTask(trimmed));
		setInput("");
		inputRef.current?.focus();
	}

	function onInputChange(event: ChangeEvent<HTMLInputElement>) {
		setInput(event.target.value);
	}

	function deleteTask(taskId: number) {
		dispatch(removeTask(taskId));
	}

	function removeAllTasks() {
		dispatch(clearTasks());
		inputRef.current?.focus();
	}

	return (
		<div className="space-y-4">
			<form className="flex gap-2" onSubmit={onSubmit}>
				<input
					id="task-name"
					ref={inputRef}
					autoFocus
					aria-label="Task name"
					value={input}
					onChange={onInputChange}
					placeholder="Add a task"
					maxLength={120}
					className="flex-1 rounded-md border border-slate-300 px-3 py-2"
				/>
				<AppButton type="submit" disabled={trimmedInput.length === 0}>
					Add
				</AppButton>
			</form>

			<div className="flex items-center justify-between gap-2">
				<MutedText aria-live="polite">
					{hasTasks
						? `${taskCountLabel} in your list`
						: "No tasks yet. Add your first task."}
				</MutedText>

				<AppButton
					type="button"
					variant="dangerSubtle"
					size="sm"
					className="font-medium"
					onClick={removeAllTasks}
					disabled={tasks.length == 0}
				>
					Clear all
				</AppButton>
			</div>

			{hasTasks ? (
				<ul className="space-y-2">
					{tasks.map((task) => (
						<li
							key={task.id}
							className="flex items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2"
						>
							<span className="wrap-break-word">{task.label}</span>
							<AppButton
								type="button"
								variant="dangerSubtle"
								size="sm"
								className="font-medium"
								aria-label={`Delete task ${task.label}`}
								onClick={() => deleteTask(task.id)}
							>
								Delete
							</AppButton>
						</li>
					))}
				</ul>
			) : (
				<div className="rounded-md border border-dashed border-slate-300 px-3 py-3 text-center">
					<MutedText>Add a few tasks to plan your next steps.</MutedText>
				</div>
			)}
		</div>
	);
}
