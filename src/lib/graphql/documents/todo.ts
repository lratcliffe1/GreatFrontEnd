export const TASKS_QUERY = /* GraphQL */ `
	query GetTasks {
		tasks {
			id
			label
		}
	}
`;

export const ADD_TASK_MUTATION = /* GraphQL */ `
	mutation AddTask($label: String!) {
		addTask(label: $label) {
			id
			label
		}
	}
`;

export const REMOVE_TASK_MUTATION = /* GraphQL */ `
	mutation RemoveTask($id: Int!) {
		removeTask(id: $id)
	}
`;

export const CLEAR_TASKS_MUTATION = /* GraphQL */ `
	mutation ClearTasks {
		clearTasks
	}
`;
