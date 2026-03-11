import type { HTMLAttributes, ReactNode } from "react";

type BaseProps = {
	children: ReactNode;
	className?: string;
};

const PRIMITIVE_CLASSES = {
	elevatedCard:
		"rounded-lg border p-4 shadow-sm [border-color:var(--card-border)] [background:var(--card-bg)]",
	surfacePanel:
		"rounded-md border p-3 [border-color:var(--card-border)] [background:var(--card-bg)]",
	codePanel:
		"rounded-md border border-slate-700 bg-slate-950 p-3 font-mono text-sm text-slate-100",
	tracePanel:
		"space-y-3 rounded-md border p-3 [border-color:var(--card-border)] [background:var(--surface)]",
	metaPill:
		"rounded-full px-2 py-1 text-xs font-medium [background:var(--surface)] [color:var(--muted)]",
	stepControlButton:
		"rounded-md border border-card-border px-4 py-2 text-sm font-medium [background:var(--card-bg)] [color:var(--foreground)] transition hover:[background:var(--surface)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:[background:var(--card-bg)]",
	mutedText: "text-sm [color:var(--muted)]",
} as const;

function withClass(base: string, extra?: string) {
	return extra ? `${base} ${extra}` : base;
}

export function ElevatedCard({
	children,
	className,
	...props
}: BaseProps & HTMLAttributes<HTMLElement>) {
	return (
		<article
			className={withClass(PRIMITIVE_CLASSES.elevatedCard, className)}
			{...props}
		>
			{children}
		</article>
	);
}

export function SurfacePanel({
	children,
	className,
	...props
}: BaseProps & HTMLAttributes<HTMLElement>) {
	return (
		<section
			className={withClass(PRIMITIVE_CLASSES.surfacePanel, className)}
			{...props}
		>
			{children}
		</section>
	);
}

export function CodePanel({
	children,
	className,
	...props
}: BaseProps & HTMLAttributes<HTMLElement>) {
	return (
		<section
			className={withClass(PRIMITIVE_CLASSES.codePanel, className)}
			{...props}
		>
			{children}
		</section>
	);
}

export function TracePanel({
	children,
	className,
	...props
}: BaseProps & HTMLAttributes<HTMLElement>) {
	return (
		<section
			className={withClass(PRIMITIVE_CLASSES.tracePanel, className)}
			{...props}
		>
			{children}
		</section>
	);
}

export function MetaPill({ children }: { children: ReactNode }) {
	return <span className={PRIMITIVE_CLASSES.metaPill}>{children}</span>;
}

const DIFFICULTY_CLASSES = {
	Easy: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
	Medium: "bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
	Hard: "bg-rose-50 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
} as const;

export function DifficultyPill({
	difficulty,
}: {
	difficulty: "Easy" | "Medium" | "Hard";
}) {
	return (
		<span
			className={`rounded-full px-2 py-1 text-xs font-medium ${DIFFICULTY_CLASSES[difficulty]}`}
		>
			{difficulty}
		</span>
	);
}

const STATUS_CLASSES = {
	done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
	todo: "bg-sky-50 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400",
	"in-progress":
		"bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
} as const;

export function StatusBadge({
	status,
}: {
	status: "done" | "todo" | "in-progress";
}) {
	const label =
		status === "todo"
			? "To do"
			: status === "in-progress"
				? "In progress"
				: "Done";
	return (
		<span
			className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`}
		>
			{label}
		</span>
	);
}

export function StepControlButton({
	children,
	disabled,
	onClick,
}: {
	children: ReactNode;
	disabled?: boolean;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={PRIMITIVE_CLASSES.stepControlButton}
		>
			{children}
		</button>
	);
}

export function MutedText({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p className={withClass(PRIMITIVE_CLASSES.mutedText, className)}>
			{children}
		</p>
	);
}
