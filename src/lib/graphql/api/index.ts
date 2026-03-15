"use client";

import { graphqlApi } from "@/lib/graphql/api/base";
import { useAddTaskMutation, useClearTasksMutation, useRemoveTaskMutation, useTasksQuery } from "@/lib/graphql/api/todo";
import { useCreatePostMutation, useFeedPageQuery, useLazyFeedPageQuery, useReactToPostMutation } from "@/lib/graphql/api/feed";

export { graphqlApi };

export type { TodoTask } from "@/lib/graphql/api/todo";
export type { FeedPost, FeedPage, ReactionKey } from "@/lib/graphql/api/feed";

export {
	useTasksQuery,
	useAddTaskMutation,
	useRemoveTaskMutation,
	useClearTasksMutation,
	useFeedPageQuery,
	useLazyFeedPageQuery,
	useCreatePostMutation,
	useReactToPostMutation,
};
