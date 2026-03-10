"use client";

import { useEffect, useState } from "react";

import type { Question, Track } from "@/content/questions";
import { fetchQuestion, fetchQuestions } from "@/lib/graphql/client";
import { getGraphQlErrorMessage } from "@/features/questions/helpers";

export function useQuestions(track: Track) {
	const [data, setData] = useState<Question[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let active = true;

		fetchQuestions(track)
			.then((result) => {
				if (!active) return;
				setData(result);
				setError(null);
			})
			.catch((err: unknown) => {
				if (!active) return;
				const message = getGraphQlErrorMessage(err);
				setError(`Unable to load questions from GraphQL endpoint. ${message}`);
			})
			.finally(() => {
				if (!active) return;
				setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, [track]);

	return { data, error, isLoading };
}

export function useQuestion(track: Track, slug: string) {
	const [data, setData] = useState<Question | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let active = true;

		fetchQuestion(track, slug)
			.then((result) => {
				if (!active) return;
				setData(result);
				setError(null);
			})
			.catch((err: unknown) => {
				if (!active) return;
				const message = getGraphQlErrorMessage(err);
				setError(`Unable to load question details. ${message}`);
			})
			.finally(() => {
				if (!active) return;
				setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, [track, slug]);

	return { data, error, isLoading };
}
