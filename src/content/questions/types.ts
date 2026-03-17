export enum Track {
	Gfe75 = "gfe75",
	Blind75 = "blind75",
}

export enum SolutionType {
	UiDemo = "UI Demo",
	AlgoVisualizer = "Algo Visualizer",
	TimelineVisualizer = "Timeline Visualizer",
	Writeup = "Write Up",
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

export enum Category {
	AlgorithmicCoding = "Algorithmic coding",
	JavaScriptFunctions = "JavaScript functions",
	Quiz = "Quiz",
	SystemDesign = "System design",
	UiCoding = "UI coding",
}

/** Tags for GFE 75 and Blind 75 questions. Used for filtering and display. */
export enum Tag {
	// GFE 75 - JavaScript
	Polyfill = "Polyfill", // Implementing native APIs (e.g. Array.prototype.reduce, Promise.all, Function.prototype.call, JSON.stringify)
	HigherOrderFunction = "Higher-order function", // Functions that take or return functions (debounce, throttle, curry, memoize, promisify)
	Async = "Async", // Promises, async/await, callbacks, event loop, concurrency
	DOM = "DOM", // DOM traversal, manipulation, getElementsBy*, HTML serialization
	Recursion = "Recursion", // Recursive algorithms and data structure traversal
	OOP = "OOP", // Classes, prototypes, event emitters, object-oriented patterns
	ObjectUtilities = "Object utilities", // Deep clone, deep equal, deep omit, squash, type utilities, data merging
	Closure = "Closure", // Closure concept and functions that capture lexical scope
	Form = "Form", // Form handling, validation, submission, input elements
	Layout = "Layout", // CSS layout (holy grail, flexbox, grid, positioning)
	Accessibility = "Accessibility", // a11y, ARIA, keyboard nav, screen readers
	Performance = "Performance", // Optimization, rendering, translate vs position, box-sizing
	// Blind 75 - Data structures & algorithms
	Array = "Array", // Array manipulation, prefix sums, subarray problems
	TwoPointers = "Two pointers", // Two pointers on sorted arrays, pair/triplet sum
	SlidingWindow = "Sliding window", // Substring problems, longest/shortest window
	HashMap = "Hash map", // Frequency map, complement lookup, key-value storage
	Stack = "Stack", // Stack-based solutions (balanced brackets, monotonic stack)
	Set = "Set", // Set for membership, deduplication
	Binary = "Binary", // Bit manipulation, bit counting, bit reversal
	BinarySearch = "Binary search", // Binary search on sorted arrays or rotated arrays
	BinarySearchTree = "Binary search tree", // BST properties, inorder traversal, LCA, kth smallest
	BinaryTree = "Binary tree", // General binary tree (not necessarily BST): traversal, depth, paths, serialize
	DepthFirstSearch = "Depth-first search", // DFS, backtracking, recursion on trees/graphs
	BreadthFirstSearch = "Breadth-first search", // BFS, level-order traversal, shortest path in unweighted graphs
	DynamicProgramming = "Dynamic programming", // Memoization, tabulation, optimal substructure, overlapping subproblems
	Graph = "Graph", // Graph traversal, connected components, clone, cycle detection
	Greedy = "Greedy", // Greedy choice, local optimum, jump game, stock trading
	Heap = "Heap", // Min/max heap, priority queue, k-way merge, median finder
	Intervals = "Intervals", // Interval merging, scheduling, meeting rooms
	LinkedList = "Linked list", // Linked list operations: reverse, merge, cycle, two pointers
	Matrix = "Matrix", // 2D grid problems: islands, paths, rotation, spiral
	Sorting = "Sorting", // Sorting, frequency sort, k most frequent
	String = "String", // String algorithms: anagrams, palindromes, substrings, LCS
	TopologicalSort = "Topological sort", // Topological sort, dependency ordering, course schedule
	Tree = "Tree", // General tree structure (includes binary tree)
	Trie = "Trie", // Trie/prefix tree for autocomplete, word search, prefix matching
	// GFE 75 - Quiz & system design
	Html = "HTML", // HTML semantics, script loading, document structure
	Css = "CSS", // CSS concepts: box model, display, position, BFC, z-index
	JavaScript = "JavaScript", // JS fundamentals: hoisting, let/var/const, modules, event loop
	WebAPIs = "Web APIs", // Storage APIs, events, fetch, browser APIs
	Internationalization = "Internationalization", // i18n, RTL, locale, multilingual sites
	Browser = "Browser", // Browser internals, rendering, selector matching
	Networking = "Networking", // Real-time, WebSockets, HTTP, API design
	SEO = "SEO", // Search engine optimization, meta tags, SSR
	UiComponent = "UI component", // Reusable UI building blocks: tabs, accordion, modal, carousel
	// GFE 75 - Implementation / tech stack
	API = "API", // REST/HTTP integration, form submission, fetch
	GraphQL = "GraphQL", // GraphQL queries, mutations, resolvers
	Redux = "Redux", // Redux Toolkit, RTK Query, state management
	WebStorage = "Web Storage", // localStorage, sessionStorage, cookies demo
}

export type Question = {
	id: string;
	questionNumber: number;
	path: string;
	title: string;
	track: Track;
	category: Category;
	difficulty: Difficulty;
	sourceUrl: string;
	solutionTypes: SolutionType[];
	tags?: Tag[];
	status: QuestionStatus;
	summary: string;
	cardSummary: string;
	approach: string;
	complexity: string;
};
