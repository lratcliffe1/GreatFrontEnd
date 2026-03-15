export function isHttpUrl(value: string) {
	return /^https?:\/\//.test(value);
}
