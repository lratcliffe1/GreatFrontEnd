"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { Question } from "@/content/questions";
import { QUESTION_UI_CLASSES } from "@/features/questions/question-ui";
import { SOLUTION_RENDERER_LOADERS } from "@/solutions/renderer-loaders";

type SolutionComponent = ComponentType;
function SolutionLoadingState() {
	return (
		<div className={`rounded-md bg-card-bg p-3 text-sm ${QUESTION_UI_CLASSES.bodyText}`}>
			<p>Loading solution component...</p>
		</div>
	);
}

const DYNAMIC_RENDERER_CACHE = new Map<string, SolutionComponent>();

function isRunnableSolutionType(solutionType: Question["solutionType"]) {
	return solutionType === "algo_visualizer" || solutionType === "ui_demo";
}

export function getSolutionRenderer(question: Question): SolutionComponent | null {
	if (!isRunnableSolutionType(question.solutionType)) {
		return null;
	}

	if (question.status !== "done") {
		return null;
	}

	const rendererKey = `${question.track}/${question.path}`;
	const loader =
		rendererKey in SOLUTION_RENDERER_LOADERS ? SOLUTION_RENDERER_LOADERS[rendererKey as keyof typeof SOLUTION_RENDERER_LOADERS] : undefined;
	if (!loader) {
		return null;
	}

	const cachedRenderer = DYNAMIC_RENDERER_CACHE.get(rendererKey);
	if (cachedRenderer) {
		return cachedRenderer;
	}

	const renderer = dynamic(loader, {
		loading: SolutionLoadingState,
	});
	DYNAMIC_RENDERER_CACHE.set(rendererKey, renderer);

	return renderer;
}

/** True when connection is fast enough for prefetching; false for slow/metered. Unknown = allow. */
function shouldPrefetch(): boolean {
	if (typeof navigator === "undefined" || !("connection" in navigator)) return true;
	const conn = navigator.connection as { effectiveType?: string; saveData?: boolean } | undefined;
	if (!conn) return true;
	if (conn.saveData) return false;
	const slow = ["slow-2g", "2g"];
	return !conn.effectiveType || !slow.includes(conn.effectiveType);
}

/** Prefetch the solution renderer chunk on hover so it loads faster when the user clicks. Skips on slow/metered connections. */
export function prefetchSolutionRenderer(question: Question): void {
	if (!shouldPrefetch()) return;
	if (!isRunnableSolutionType(question.solutionType) || question.status !== "done") return;
	const rendererKey = `${question.track}/${question.path}`;
	const loader =
		rendererKey in SOLUTION_RENDERER_LOADERS ? SOLUTION_RENDERER_LOADERS[rendererKey as keyof typeof SOLUTION_RENDERER_LOADERS] : undefined;
	if (loader) loader();
}
