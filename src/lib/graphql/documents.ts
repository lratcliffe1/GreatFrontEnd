const QUESTION_FIELDS = /* GraphQL */ `
	id
	questionNumber
	path
	title
	track
	category
	difficulty
	sourceUrl
	solutionType
	status
	summary
	cardSummary
	approach
	complexity
	tags
`;

export const QUESTIONS_QUERY = /* GraphQL */ `
	query GetQuestions($track: Track!) {
		questions(track: $track) {
			${QUESTION_FIELDS}
		}
	}
`;

export const QUESTION_QUERY = /* GraphQL */ `
	query GetQuestion($track: Track!, $path: String!) {
		question(track: $track, path: $path) {
			${QUESTION_FIELDS}
		}
	}
`;
