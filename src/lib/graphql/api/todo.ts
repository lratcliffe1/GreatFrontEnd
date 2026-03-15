"use client";

import { ADD_TASK_MUTATION, CLEAR_TASKS_MUTATION, REMOVE_TASK_MUTATION, TASKS_QUERY } from "@/lib/graphql/documents";

import { graphqlApi } from "@/lib/graphql/api/base";

export type TodoTask = { id: number; label: string };

export const todoApi = graphqlApi.injectEndpoints({
	endpoints: (build) => ({
		tasks: build.query<TodoTask[], void>({
			query: () => ({ document: TASKS_QUERY }),
			transformResponse: (res: unknown) => (res as { tasks: TodoTask[] }).tasks,
			providesTags: ["Tasks"],
		}),
		addTask: build.mutation<TodoTask, { label: string }>({
			query: ({ label }) => ({
				document: ADD_TASK_MUTATION,
				variables: { label },
			}),
			transformResponse: (res: unknown) => (res as { addTask: TodoTask }).addTask,
			invalidatesTags: ["Tasks"],
		}),
		removeTask: build.mutation<boolean, { id: number }>({
			query: ({ id }) => ({
				document: REMOVE_TASK_MUTATION,
				variables: { id },
			}),
			invalidatesTags: ["Tasks"],
		}),
		clearTasks: build.mutation<boolean, void>({
			query: () => ({ document: CLEAR_TASKS_MUTATION }),
			invalidatesTags: ["Tasks"],
		}),
	}),
	overrideExisting: false,
});

export const { useTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useClearTasksMutation } = todoApi;
