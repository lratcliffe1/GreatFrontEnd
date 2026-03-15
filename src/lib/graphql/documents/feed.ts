export const FEED_PAGE_QUERY = /* GraphQL */ `
	query GetFeedPage($cursor: String) {
		feedPage(cursor: $cursor) {
			posts {
				id
				author
				content
				imageUrl
				createdAt
				reactions {
					like
					haha
					wow
				}
				reactionByMe
			}
			nextCursor
		}
	}
`;

export const CREATE_POST_MUTATION = /* GraphQL */ `
	mutation CreatePost($content: String, $imageUrl: String) {
		createPost(content: $content, imageUrl: $imageUrl) {
			id
			author
			content
			imageUrl
			createdAt
			reactions {
				like
				haha
				wow
			}
			reactionByMe
		}
	}
`;

export const REACT_TO_POST_MUTATION = /* GraphQL */ `
	mutation ReactToPost($postId: String!, $reaction: String) {
		reactToPost(postId: $postId, reaction: $reaction) {
			id
			reactions {
				like
				haha
				wow
			}
			reactionByMe
		}
	}
`;
