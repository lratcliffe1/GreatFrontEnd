"use client";

import { Component, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	fallback?: ReactNode;
};

type State = {
	hasError: boolean;
	error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError && this.state.error) {
			if (this.props.fallback) {
				return this.props.fallback;
			}
			return (
				<div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-6">
					<h2 className="text-lg font-semibold text-red-800">
						Something went wrong
					</h2>
					<p className="text-sm text-red-700">{this.state.error.message}</p>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false, error: null })}
						className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
					>
						Try again
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}
