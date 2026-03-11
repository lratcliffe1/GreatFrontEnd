"use client";

import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { AppButton } from "@/components/ui/tailwind-primitives";

type ReactionKey = "like" | "haha" | "wow";

const REACTION_KEYS: ReactionKey[] = ["like", "haha", "wow"];
const REACTION_LABELS: Record<ReactionKey, string> = {
	like: "Like",
	haha: "Haha",
	wow: "Wow",
};

type FeedPost = {
	id: string;
	author: string;
	content: string;
	imageUrl?: string;
	createdAt: number;
	reactions: Record<ReactionKey, number>;
	reactionByMe: ReactionKey | null;
};

type FeedPage = {
	posts: FeedPost[];
	nextCursor: string | null;
};

const PAGE_SIZE = 4;

function createSeedPost(index: number): FeedPost {
	return {
		id: `post-${index + 1}`,
		author: index % 2 === 0 ? "Liam" : "Frontend Friend",
		content: `Sample post ${index + 1} in the mock feed. This demonstrates cursor pagination, feed composition, and optimistic reactions.`,
		imageUrl:
			index % 4 === 0
				? `https://picsum.photos/seed/news-feed-${index + 1}/720/420`
				: undefined,
		createdAt: Date.now() - index * 1000 * 60 * 12,
		reactions: {
			like: Math.floor(Math.random() * 40),
			haha: Math.floor(Math.random() * 20),
			wow: Math.floor(Math.random() * 10),
		},
		reactionByMe: null,
	};
}

let dbPosts: FeedPost[] = Array.from({ length: 30 }).map((_, index) =>
	createSeedPost(index),
);

function wait(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function applyReactionTransition(
	post: FeedPost,
	nextReaction: ReactionKey | null,
): FeedPost {
	const previousReaction = post.reactionByMe;
	const nextReactions = { ...post.reactions };

	if (previousReaction) {
		nextReactions[previousReaction] = Math.max(
			0,
			nextReactions[previousReaction] - 1,
		);
	}
	if (nextReaction) {
		nextReactions[nextReaction] += 1;
	}

	return {
		...post,
		reactions: nextReactions,
		reactionByMe: nextReaction,
	};
}

async function fetchFeedPage(cursor: string | null): Promise<FeedPage> {
	await wait(350);

	let start = 0;
	if (cursor) {
		const cursorIndex = dbPosts.findIndex((post) => post.id === cursor);
		start = cursorIndex >= 0 ? cursorIndex + 1 : dbPosts.length;
	}

	const posts = dbPosts.slice(start, start + PAGE_SIZE);
	const lastVisiblePost = posts[posts.length - 1] ?? null;
	const nextCursor =
		start + posts.length < dbPosts.length && lastVisiblePost
			? lastVisiblePost.id
			: null;
	return { posts, nextCursor };
}

async function createPost(
	content: string,
	imageUrl?: string,
): Promise<FeedPost> {
	await wait(250);
	const newPost: FeedPost = {
		id: `post-${Date.now()}`,
		author: "Liam",
		content,
		imageUrl,
		createdAt: Date.now(),
		reactions: { like: 0, haha: 0, wow: 0 },
		reactionByMe: null,
	};
	dbPosts = [newPost, ...dbPosts];
	return newPost;
}

async function persistReaction(
	postId: string,
	nextReaction: ReactionKey | null,
) {
	await wait(220);
	if (Math.random() < 0.15) {
		throw new Error("Reaction failed on server. Try again.");
	}

	dbPosts = dbPosts.map((post) => {
		if (post.id !== postId) return post;
		return applyReactionTransition(post, nextReaction);
	});
}

function formatRelativeTime(timestamp: number) {
	const seconds = Math.round((timestamp - Date.now()) / 1000);
	const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
	if (Math.abs(seconds) < 60) return rtf.format(seconds, "second");
	const minutes = Math.round(seconds / 60);
	if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
	const hours = Math.round(minutes / 60);
	if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
	return rtf.format(Math.round(hours / 24), "day");
}

function getTotalReactions(post: FeedPost) {
	return REACTION_KEYS.reduce((total, key) => total + post.reactions[key], 0);
}

export function NewsFeedDemo() {
	const [posts, setPosts] = useState<FeedPost[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [newPostContent, setNewPostContent] = useState("");
	const [newPostImageUrl, setNewPostImageUrl] = useState("");
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const loadingRef = useRef(false);

	const hasMore = useMemo(() => nextCursor !== null, [nextCursor]);

	const loadPage = useCallback(async (cursor: string | null) => {
		if (loadingRef.current) return;
		loadingRef.current = true;
		setLoading(true);
		try {
			const page = await fetchFeedPage(cursor);
			setPosts((previous) =>
				cursor
					? [
							...previous,
							...page.posts.filter(
								(nextPost) =>
									!previous.some(
										(previousPost) => previousPost.id === nextPost.id,
									),
							),
						]
					: page.posts,
			);
			setNextCursor(page.nextCursor);
			setError(null);
		} catch {
			setError("Failed to fetch feed.");
		} finally {
			loadingRef.current = false;
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void loadPage(null);
	}, [loadPage]);

	useEffect(() => {
		const node = sentinelRef.current;
		if (!node || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries.some((entry) => entry.isIntersecting) &&
					nextCursor &&
					!loadingRef.current
				) {
					void loadPage(nextCursor);
				}
			},
			{ rootMargin: "100% 0px" },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [hasMore, loadPage, nextCursor]);

	async function onCreatePost(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		const content = newPostContent.trim();
		const imageUrl = newPostImageUrl.trim();
		if (!content && !imageUrl) return;

		setSubmitting(true);
		try {
			const created = await createPost(content, imageUrl || undefined);
			setPosts((previous) => [created, ...previous]);
			setNewPostContent("");
			setNewPostImageUrl("");
			setError(null);
		} catch {
			setError("Failed to create post.");
		} finally {
			setSubmitting(false);
		}
	}

	async function reactToPost(postId: string, selectedReaction: ReactionKey) {
		const current = posts.find((post) => post.id === postId);
		if (!current) return;
		const previousReaction = current.reactionByMe;
		const nextReaction =
			previousReaction === selectedReaction ? null : selectedReaction;

		setPosts((previous) =>
			previous.map((post) =>
				post.id === postId ? applyReactionTransition(post, nextReaction) : post,
			),
		);

		try {
			await persistReaction(postId, nextReaction);
			setError(null);
		} catch (caught) {
			setPosts((previous) =>
				previous.map((post) =>
					post.id === postId
						? applyReactionTransition(post, previousReaction)
						: post,
				),
			);
			setError(caught instanceof Error ? caught.message : "Failed to react.");
		}
	}

	return (
		<div className="space-y-5">
			<form
				onSubmit={onCreatePost}
				className="space-y-2 rounded-md border border-card-border p-3 [background:var(--card-bg)]"
			>
				<label
					className="text-sm font-medium text-foreground"
					htmlFor="new-post"
				>
					Create post
				</label>
				<textarea
					id="new-post"
					value={newPostContent}
					onChange={(event) => setNewPostContent(event.target.value)}
					className="min-h-24 w-full rounded-md border border-card-border px-3 py-2 [background:var(--input-bg)] text-foreground"
					placeholder="Share something..."
				/>
				<input
					id="new-post-image"
					value={newPostImageUrl}
					onChange={(event) => setNewPostImageUrl(event.target.value)}
					className="w-full rounded-md border border-card-border px-3 py-2 text-sm [background:var(--input-bg)] text-foreground"
					placeholder="Optional image URL"
				/>
				<div className="flex flex-wrap items-center gap-2">
					<AppButton
						type="submit"
						disabled={
							submitting || (!newPostContent.trim() && !newPostImageUrl.trim())
						}
					>
						{submitting ? "Publishing..." : "Publish"}
					</AppButton>
					<p className="text-xs text-muted">
						Supports text-only and text+image posts.
					</p>
				</div>
			</form>

			{error ? (
				<p role="alert" className="text-sm text-red-700 dark:text-red-300">
					{error}
				</p>
			) : null}

			<div role="feed" className="space-y-3">
				{posts.map((post) => {
					const totalReactions = getTotalReactions(post);

					return (
						<article
							key={post.id}
							role="article"
							aria-labelledby={`post-author-${post.id}`}
							className="rounded-md border border-card-border p-3 [background:var(--card-bg)]"
						>
							<div className="mb-2 flex items-center justify-between text-sm text-muted">
								<span
									id={`post-author-${post.id}`}
									className="font-semibold text-foreground"
								>
									{post.author}
								</span>
								<span>{formatRelativeTime(post.createdAt)}</span>
							</div>
							{post.content ? (
								<p className="mb-3 whitespace-pre-line text-foreground">
									{post.content}
								</p>
							) : null}
							{post.imageUrl ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={post.imageUrl}
									alt="User uploaded post media"
									loading="lazy"
									className="mb-3 w-full rounded-md border border-card-border object-cover"
								/>
							) : null}
							<div className="flex flex-wrap items-center gap-2">
								{REACTION_KEYS.map((reactionKey) => {
									const active = post.reactionByMe === reactionKey;
									return (
										<AppButton
											key={reactionKey}
											type="button"
											size="xs"
											aria-pressed={active}
											onClick={() => reactToPost(post.id, reactionKey)}
											className={
												active
													? "ring-2 ring-teal-300/60 dark:ring-teal-400/60"
													: undefined
											}
										>
											{REACTION_LABELS[reactionKey]} •{" "}
											{post.reactions[reactionKey]}
										</AppButton>
									);
								})}
								<span className="text-xs text-muted">
									{totalReactions} total reactions
								</span>
							</div>
						</article>
					);
				})}
			</div>

			<div ref={sentinelRef} className="h-8" />
			{loading && <p className="text-sm text-muted">Loading more posts...</p>}
			{!hasMore && !loading && (
				<p className="text-sm text-muted">No more posts in the mock feed.</p>
			)}
		</div>
	);
}
