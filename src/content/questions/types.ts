export enum Track {
	Gfe75 = "gfe75",
	Blind75 = "blind75",
}

export enum SolutionType {
	UiDemo = "ui_demo",
	AlgoVisualizer = "algo_visualizer",
	CodeAndTests = "code_and_tests",
	Writeup = "writeup",
}

export enum QuestionStatus {
	Todo = "todo",
	InProgress = "in_progress",
	Done = "done",
}

export enum Difficulty {
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
}

export type Question = {
	id: string;
	questionNumber: number;
	path: string;
	title: string;
	track: Track;
	category: string;
	difficulty: Difficulty;
	sourceUrl: string;
	solutionType: SolutionType;
	status: QuestionStatus;
	summary: string;
	cardSummary: string;
	approach: string;
	complexity: string;
	tags: string[];
};
