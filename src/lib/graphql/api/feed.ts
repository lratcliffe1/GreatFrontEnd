"use client";

import { CREATE_POST_MUTATION, FEED_PAGE_QUERY, REACT_TO_POST_MUTATION } from "@/lib/graphql/documents";

import { graphqlApi } from "@/lib/graphql/api/base";

export type ReactionKey = "like" | "haha" | "wow";
export type FeedPost = {
	id: string;
	author: string;
	content: string;
	imageUrl?: string;
	createdAt: number;
	reactions: Record<ReactionKey, number>;
	reactionByMe: ReactionKey | null;
};
export type FeedPage = { posts: FeedPost[]; nextCursor: string | null };

export const feedApi = graphqlApi.injectEndpoints({
	endpoints: (build) => ({
		feedPage: build.query<FeedPage, { cursor?: string | null }>({
			query: ({ cursor }) => ({
				document: FEED_PAGE_QUERY,
				variables: { cursor: cursor ?? null },
			}),
			transformResponse: (res: unknown) => (res as { feedPage: FeedPage }).feedPage,
			providesTags: (result, _err, { cursor }) => (result ? [{ type: "Feed", id: cursor ?? "initial" }] : ["Feed"]),
		}),
		createPost: build.mutation<FeedPost, { content?: string; imageUrl?: string }>({
			query: ({ content, imageUrl }) => ({
				document: CREATE_POST_MUTATION,
				variables: { content: content ?? null, imageUrl: imageUrl ?? null },
			}),
			transformResponse: (res: unknown) => (res as { createPost: FeedPost }).createPost,
			invalidatesTags: ["Feed"],
		}),
		reactToPost: build.mutation<FeedPost, { postId: string; reaction: string | null }>({
			query: ({ postId, reaction }) => ({
				document: REACT_TO_POST_MUTATION,
				variables: { postId, reaction },
			}),
			transformResponse: (res: unknown) => (res as { reactToPost: FeedPost }).reactToPost,
			invalidatesTags: ["Feed"],
		}),
	}),
	overrideExisting: false,
});

export const { useFeedPageQuery, useLazyFeedPageQuery, useCreatePostMutation, useReactToPostMutation } = feedApi;
